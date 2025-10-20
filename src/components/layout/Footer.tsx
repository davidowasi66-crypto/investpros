
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-handwritten text-xl font-bold mb-4 gradient-text">InvestPro</h3>
            <p className="text-muted-foreground text-sm">Secure, high-yield investment platform trusted by thousands.</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/plans" className="text-muted-foreground hover:text-primary transition-colors">Investment Plans</Link></li>
              <li><Link to="/features" className="text-muted-foreground hover:text-primary transition-colors">Features</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Location</h4>
            <p className="text-muted-foreground text-sm">
              Arch. Makariou III Avenue<br />
              Limassol 3025<br />
              Cyprus
            </p>
          </div>
        </div>
        
        <div className="border-t border-dashed border-border pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} InvestPro. All rights reserved. SSL Secured & Encrypted.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
