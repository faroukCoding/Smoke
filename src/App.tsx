import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { MobileFloatingBar } from './components/MobileFloatingBar';
import { ToastContainer } from './components/Toast';

export default function App() {
  return (
    <LanguageProvider>
      <ToastProvider>
        <CartProvider>
          <div className="min-h-screen bg-[#0b0b0d] text-zinc-100 flex flex-col selection:bg-amber-500 selection:text-black">
            {/* Top Navigation */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-1">
              <Hero />
              <MenuSection />
              <AboutSection />
              <GallerySection />
              <ContactSection />
            </main>

            {/* Footer */}
            <Footer />

            {/* Modals & Drawers */}
            <ProductModal />
            <CartDrawer />
            <CheckoutModal />
            <MobileFloatingBar />

            {/* Toast Notifications */}
            <ToastContainer />
          </div>
        </CartProvider>
      </ToastProvider>
    </LanguageProvider>
  );
}
