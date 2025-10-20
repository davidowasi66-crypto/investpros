import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HandDrawnContainer from '@/components/ui/HandDrawnContainer';
import HandDrawnButton from '@/components/ui/HandDrawnButton';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-50 to-purple-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Get in <span className="text-blue-600">Touch</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Have questions about investing? Need support? Our team is here to help you succeed.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <HandDrawnContainer className="p-8 bg-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                      required
                    />
                  </div>
                  
                  <HandDrawnButton type="submit" variant="primary" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </HandDrawnButton>
                </form>
              </HandDrawnContainer>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">Contact Information</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Reach out to us through any of these channels. We're always ready to help.
                  </p>
                </div>

                <div className="space-y-6">
                  <HandDrawnContainer className="p-6 bg-white">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Mail className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Email Support</h3>
                        <p className="text-gray-600 mb-2">Get help via email</p>
                        <p className="text-blue-600 font-medium">support@investpro.com</p>
                      </div>
                    </div>
                  </HandDrawnContainer>

                  <HandDrawnContainer className="p-6 bg-white">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <Phone className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Phone Support</h3>
                        <p className="text-gray-600 mb-2">Call us directly</p>
                        <p className="text-green-600 font-medium">+1 (555) 123-4567</p>
                      </div>
                    </div>
                  </HandDrawnContainer>

                  <HandDrawnContainer className="p-6 bg-white">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <MessageCircle className="h-6 w-6 text-purple-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Live Chat</h3>
                        <p className="text-gray-600 mb-2">Instant messaging support</p>
                        <p className="text-purple-600 font-medium">Available 24/7</p>
                      </div>
                    </div>
                  </HandDrawnContainer>

                  <HandDrawnContainer className="p-6 bg-white">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Clock className="h-6 w-6 text-orange-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Business Hours</h3>
                        <p className="text-gray-600 mb-2">Our support hours</p>
                        <p className="text-orange-600 font-medium">24/7 - We never sleep!</p>
                      </div>
                    </div>
                  </HandDrawnContainer>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Quick answers to common questions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  q: "How quickly can I start investing?",
                  a: "You can start investing immediately after account verification, which typically takes 2-24 hours."
                },
                {
                  q: "What is the minimum investment amount?",
                  a: "Our minimum investment starts at just $100, making it accessible for all investors."
                },
                {
                  q: "How often are returns paid?",
                  a: "Returns are paid according to your chosen plan - daily, weekly, or monthly."
                },
                {
                  q: "Is my investment secure?",
                  a: "Yes, we use bank-level security and keep funds in segregated accounts for maximum protection."
                },
                {
                  q: "Can I withdraw my funds anytime?",
                  a: "Yes, you can request withdrawals anytime. Processing typically takes 24-48 hours."
                },
                {
                  q: "Do you charge withdrawal fees?",
                  a: "We have minimal withdrawal fees that vary by payment method and amount."
                }
              ].map((faq, index) => (
                <HandDrawnContainer key={index} className="p-6 bg-white">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </HandDrawnContainer>
              ))}
            </div>
          </div>
        </section>

        {/* Office Location */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Visit Our Office</h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Located in the heart of the financial district, our office is open for client meetings by appointment.
                </p>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Headquarters</h3>
                    <p className="text-gray-600">
                      Arch. Makariou III Avenue<br />
                      Limassol 3025<br />
                      Cyprus
                    </p>
                  </div>
                </div>
              </div>

              <HandDrawnContainer className="p-8 bg-gray-100">
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <MapPin className="h-16 w-16 text-gray-400" />
                </div>
                <p className="text-center text-gray-600 mt-4">Interactive map coming soon</p>
              </HandDrawnContainer>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;