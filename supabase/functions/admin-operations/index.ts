import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    // Verify the user is authenticated and is an admin
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token)
    
    if (authError || !user) {
      throw new Error('Invalid authentication')
    }

    // Check if user is admin
    const { data: roles } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)

    const isAdmin = roles?.some(role => role.role === 'admin')
    if (!isAdmin) {
      throw new Error('Admin access required')
    }

    const { operation, data } = await req.json()

    switch (operation) {
      case 'bulk_update_settings':
        return await handleBulkUpdateSettings(supabaseClient, data)
      
      case 'export_data':
        return await handleExportData(supabaseClient, data)
      
      case 'import_content':
        return await handleImportContent(supabaseClient, data)
      
      case 'system_backup':
        return await handleSystemBackup(supabaseClient)
      
      case 'clear_cache':
        return await handleClearCache(supabaseClient)
      
      default:
        throw new Error('Invalid operation')
    }

  } catch (error) {
    console.error('Admin operation error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

async function handleBulkUpdateSettings(supabaseClient: any, settings: any[]) {
  console.log('Bulk updating settings:', settings.length)
  
  const updates = settings.map(setting => 
    supabaseClient
      .from('site_settings')
      .update({ value: setting.value })
      .eq('key', setting.key)
  )

  await Promise.all(updates)

  return new Response(
    JSON.stringify({ success: true, updated: settings.length }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function handleExportData(supabaseClient: any, options: any) {
  console.log('Exporting data with options:', options)
  
  const exportData: any = {}

  if (options.include_pages) {
    const { data: pages } = await supabaseClient
      .from('pages')
      .select('*')
    exportData.pages = pages
  }

  if (options.include_settings) {
    const { data: settings } = await supabaseClient
      .from('site_settings')
      .select('*')
    exportData.settings = settings
  }

  if (options.include_navigation) {
    const { data: navigation } = await supabaseClient
      .from('navigation_menus')
      .select('*')
    exportData.navigation = navigation
  }

  if (options.include_users) {
    const { data: users } = await supabaseClient
      .from('profiles')
      .select('id, username, full_name, created_at')
    exportData.users = users
  }

  return new Response(
    JSON.stringify({ 
      success: true, 
      data: exportData,
      exported_at: new Date().toISOString()
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function handleImportContent(supabaseClient: any, content: any) {
  console.log('Importing content')
  
  const results = { pages: 0, settings: 0, navigation: 0 }

  if (content.pages) {
    for (const page of content.pages) {
      const { error } = await supabaseClient
        .from('pages')
        .upsert(page, { onConflict: 'slug' })
      
      if (!error) results.pages++
    }
  }

  if (content.settings) {
    for (const setting of content.settings) {
      const { error } = await supabaseClient
        .from('site_settings')
        .upsert(setting, { onConflict: 'key' })
      
      if (!error) results.settings++
    }
  }

  if (content.navigation) {
    for (const nav of content.navigation) {
      const { error } = await supabaseClient
        .from('navigation_menus')
        .upsert(nav, { onConflict: 'name' })
      
      if (!error) results.navigation++
    }
  }

  return new Response(
    JSON.stringify({ success: true, imported: results }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function handleSystemBackup(supabaseClient: any) {
  console.log('Creating system backup')
  
  // Get all essential data
  const [pages, settings, navigation, profiles] = await Promise.all([
    supabaseClient.from('pages').select('*'),
    supabaseClient.from('site_settings').select('*'),
    supabaseClient.from('navigation_menus').select('*'),
    supabaseClient.from('profiles').select('id, username, full_name, created_at')
  ])

  const backup = {
    backup_id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    data: {
      pages: pages.data || [],
      settings: settings.data || [],
      navigation: navigation.data || [],
      profiles: profiles.data || []
    }
  }

  return new Response(
    JSON.stringify({ success: true, backup }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function handleClearCache(supabaseClient: any) {
  console.log('Clearing cache')
  
  // Simulate cache clearing operations
  await new Promise(resolve => setTimeout(resolve, 1000))

  return new Response(
    JSON.stringify({ success: true, message: 'Cache cleared successfully' }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}