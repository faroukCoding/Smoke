import React from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, MessageSquare, Flame, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalCount,
    confirmedSubtotal,
    itemsToConfirmCount,
    setIsCheckoutOpen,
  } = useCart();
  const { language, t } = useLanguage();

  if (!isCartOpen) return null;

  const isAr = language === 'ar';

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          id="cart-drawer-backdrop"
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        />

        {/* Sliding Panel */}
        <div className="fixed inset-y-0 right-0 rtl:right-auto rtl:left-0 max-w-full flex pl-10 rtl:pl-0 rtl:pr-10">
          <motion.div
            initial={{ x: isAr ? -400 : 400 }}
            animate={{ x: 0 }}
            exit={{ x: isAr ? -400 : 400 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            id="cart-drawer-panel"
            className="w-screen max-w-md bg-[#121216] border-l rtl:border-l-0 rtl:border-r border-zinc-800 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-zinc-800/80 flex items-center justify-between bg-[#15151a]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-600/20 border border-orange-500/40 flex items-center justify-center text-amber-500">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                    <span>{t.cart.title}</span>
                    {totalCount > 0 && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                        {totalCount} {t.cart.itemsCount}
                      </span>
                    )}
                  </h2>
                  <p className="text-[11px] text-zinc-400">Smoke Me — Agneau Fumé</p>
                </div>
              </div>

              <button
                id="btn-close-cart"
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Fermer le panier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
                    <ShoppingBag className="w-9 h-9" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-zinc-200 mb-1">
                      {t.cart.emptyTitle}
                    </h3>
                    <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
                      {t.cart.emptyDesc}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      const el = document.getElementById('menu-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs font-bold shadow-md hover:scale-105 transition-all cursor-pointer"
                  >
                    {t.cart.exploreMenu}
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-semibold text-zinc-400">
                      {totalCount} {isAr ? 'وجبات في السلة' : 'articles ajoutés'}
                    </span>
                    <button
                      onClick={clearCart}
                      className="text-xs font-semibold text-red-400/90 hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{t.cart.clearCart}</span>
                    </button>
                  </div>

                  {cart.map((item) => {
                    const itemName = isAr ? item.nameAr : item.nameFr;
                    const itemTotal = item.unitPrice !== null ? item.unitPrice * item.quantity : null;

                    return (
                      <div
                        key={item.cartItemId}
                        className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800/90 hover:border-zinc-700 transition-all flex flex-col gap-3"
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={item.image}
                            alt={itemName}
                            className="w-16 h-16 rounded-xl object-cover border border-zinc-800 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-white truncate">{itemName}</h4>

                            {item.diningOption && (
                              <span className="inline-block mt-0.5 text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-400">
                                {item.diningOption === 'sur_place'
                                  ? t.menuSection.surPlace
                                  : t.menuSection.aEmporter}
                              </span>
                            )}

                            {/* Selected Extras */}
                            {item.selectedExtras && item.selectedExtras.length > 0 && (
                              <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">
                                <span className="text-zinc-500">{t.cart.extras} </span>
                                {item.selectedExtras
                                  .map((e) => (isAr ? e.nameAr : e.nameFr))
                                  .join(', ')}
                              </p>
                            )}

                            {/* Special instructions note */}
                            {item.specialInstructions && (
                              <p className="text-[10px] text-amber-300/80 italic mt-0.5 truncate">
                                "{item.specialInstructions}"
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Price & Quantity Adjuster */}
                        <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
                          <div className="text-start">
                            {itemTotal !== null ? (
                              <p className="text-sm font-black text-amber-400">
                                {itemTotal.toLocaleString('fr-FR')}{' '}
                                <span className="text-[10px] text-zinc-300">DA</span>
                              </p>
                            ) : (
                              <span className="text-xs font-semibold text-zinc-400">
                                {t.menuSection.priceToConfirm}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 bg-zinc-950 px-2 py-1 rounded-xl border border-zinc-800">
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                              className="w-6 h-6 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center justify-center transition-colors cursor-pointer"
                              aria-label="Diminuer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-zinc-100 min-w-[16px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                              className="w-6 h-6 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center justify-center transition-colors cursor-pointer"
                              aria-label="Augmenter"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            {/* Footer / Summary / Checkout Button */}
            {cart.length > 0 && (
              <div className="p-5 bg-[#141418] border-t border-zinc-800 space-y-4">
                {/* Total breakdown */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>{t.cart.subtotal}</span>
                    <span className="font-bold text-zinc-200">
                      {confirmedSubtotal.toLocaleString('fr-FR')} DA
                    </span>
                  </div>

                  {itemsToConfirmCount > 0 && (
                    <div className="flex items-center justify-between text-xs text-amber-400/90 font-medium">
                      <span>+ {itemsToConfirmCount} {t.cart.itemsToConfirm}</span>
                      <span>(sur devis)</span>
                    </div>
                  )}

                  <div className="h-px bg-zinc-800 my-1" />

                  <div className="flex items-center justify-between text-base font-extrabold text-white">
                    <span>{t.cart.confirmedTotal}</span>
                    <span className="text-xl text-amber-400 font-black">
                      {confirmedSubtotal.toLocaleString('fr-FR')} <span className="text-xs text-zinc-300">DA</span>
                    </span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  id="btn-cart-checkout"
                  onClick={handleProceedToCheckout}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-950/40 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 fill-white/20" />
                  <span>{t.cart.checkoutBtn}</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
