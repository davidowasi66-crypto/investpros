
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminContentManager from "./pages/AdminContentManager";
import InvestmentPlans from "./pages/InvestmentPlans";
import About from "./pages/About";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Invest from "./pages/Invest";
import Referral from "./pages/Referral";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <Admin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin-dashboard" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/content" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminContentManager />
                </ProtectedRoute>
              } 
            />
            <Route path="/plans" element={<InvestmentPlans />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
            <Route 
              path="/deposit" 
              element={
                <ProtectedRoute>
                  <Deposit />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/withdraw" 
              element={
                <ProtectedRoute>
                  <Withdraw />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/invest" 
              element={
                <ProtectedRoute>
                  <Invest />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/referral" 
              element={
                <ProtectedRoute>
                  <Referral />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
