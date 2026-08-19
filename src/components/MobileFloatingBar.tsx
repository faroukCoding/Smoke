import React from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { ShoppingBag, MessageSquare, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const MobileFloatingBar: React.FC = () => {
  const { totalCount, confirmedSubtotal, setIsCartOpen, isCartOpen, isCheckoutOpen } = useCart();
  const { language, t } = useLanguage();

  if (totalCount === 0 || isCartOpen || isCheckoutOpen) return null;

  const isAr = language === 'ar';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        id="mobile-floating-cart-bar"
        className="fixed bottom-4 left-4 right-4 z-30 md:hidden"
      >
        <button
          onClick={() => setIsCartOpen(true)}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white shadow-2xl shadow-orange-950/60 active:scale-[0.98] transition-transform cursor-pointer border border-amber-400/30"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-black/30 flex items-center justify-center font-black text-xs">
              {totalCount}
            </div>
            <div className="text-start">
              <p className="text-xs font-bold leading-none">{t.nav.cart}</p>
              <p className="text-[11px] text-amber-200 mt-0.5">
                {confirmedSubtotal > 0
                  ? `${confirmedSubtotal.toLocaleString('fr-FR')} DA`
                  : t.menuSection.priceToConfirm}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-extrabold bg-black/25 px-3 py-1.5 rounded-xl">
            <span>{t.cart.checkoutBtn.split(' ')[0]}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </div>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
