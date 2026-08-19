import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { OrderFormState } from '../types';
import { openWhatsAppOrder, generateWhatsAppOrderMessage } from '../utils/whatsapp';
import { X, Send, Copy, Check, User, Phone, MapPin, FileText, ShoppingBag, Truck, Store, Utensils, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const USER_STORAGE_KEY = 'smokeme_user_info_v1';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    confirmedSubtotal,
    itemsToConfirmCount,
    clearCart,
  } = useCart();
  const { language, t } = useLanguage();
  const { showToast } = useToast();

  const [formData, setFormData] = useState<OrderFormState>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          fullName: parsed.fullName || '',
          phoneNumber: parsed.phoneNumber || '',
          diningType: parsed.diningType || 'livraison',
          deliveryAddress: parsed.deliveryAddress || '',
          specialNote: '',
        };
      }
    } catch {
      // ignore
    }
    return {
      fullName: '',
      phoneNumber: '',
      diningType: 'livraison',
      deliveryAddress: '',
      specialNote: '',
    };
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [copied, setCopied] = useState<boolean>(false);

  if (!isCheckoutOpen) return null;

  const isAr = language === 'ar';

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t.checkout.errors.nameRequired;
    }

    if (!formData.phoneNumber.trim() || formData.phoneNumber.replace(/\D/g, '').length < 8) {
      newErrors.phoneNumber = t.checkout.errors.phoneRequired;
    }

    if (formData.diningType === 'livraison' && !formData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = t.checkout.errors.addressRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOrder = () => {
    if (!validateForm()) {
      showToast('Vérification requise', 'Veuillez remplir les informations obligatoires.', 'error');
      return;
    }

    // Save contact info for future use
    try {
      localStorage.setItem(
        USER_STORAGE_KEY,
        JSON.stringify({
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          diningType: formData.diningType,
          deliveryAddress: formData.deliveryAddress,
        })
      );
    } catch {
      // ignore
    }

    showToast(t.toasts.whatsappLaunched, 'Transfert de votre commande vers WhatsApp...', 'info');

    // Trigger WhatsApp deep link
    openWhatsAppOrder(cart, formData, confirmedSubtotal, itemsToConfirmCount, language);

    // Close modal and keep cart or let user clear
    setIsCheckoutOpen(false);
  };

  const handleCopySummary = () => {
    const message = generateWhatsAppOrderMessage(cart, formData, confirmedSubtotal, itemsToConfirmCount, language);
    navigator.clipboard.writeText(message);
    setCopied(true);
    showToast(t.checkout.copiedSuccess, undefined, 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      <div
        id="checkout-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
        onClick={() => setIsCheckoutOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          id="checkout-modal-container"
          className="relative w-full max-w-xl bg-[#141418] border border-zinc-700/90 rounded-3xl shadow-2xl overflow-hidden my-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-zinc-800 bg-[#16161c] flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {isAr ? 'خطوة واحدة للإرسال' : 'Commande directe WhatsApp'}
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-black text-white mt-0.5">
                {t.checkout.title}
              </h2>
            </div>

            <button
              id="btn-close-checkout-modal"
              onClick={() => setIsCheckoutOpen(false)}
              className="p-2.5 rounded-full bg-zinc-800/80 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-5 sm:p-7 space-y-5 max-h-[65vh] overflow-y-auto">
            {/* Order Brief Summary Bar */}
            <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-zinc-200">
                  {cart.length} {isAr ? 'أنواع أطباق' : 'spécialités sélectionnées'}
                </span>
              </div>
              <span className="text-sm font-black text-amber-400">
                {confirmedSubtotal.toLocaleString('fr-FR')} DA
                {itemsToConfirmCount > 0 && <span className="text-[10px] text-zinc-400 font-normal"> (+ à confirmer)</span>}
              </span>
            </div>

            {/* Dining Type Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-zinc-300">
                {t.checkout.orderType}
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, diningType: 'livraison' })}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    formData.diningType === 'livraison'
                      ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-md'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span className="text-xs font-bold">{isAr ? 'توصيل' : 'Livraison'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, diningType: 'a_emporter' })}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    formData.diningType === 'a_emporter'
                      ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-md'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <Store className="w-4 h-4" />
                  <span className="text-xs font-bold">{isAr ? 'سفري' : 'À emporter'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, diningType: 'sur_place' })}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    formData.diningType === 'sur_place'
                      ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-md'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <Utensils className="w-4 h-4" />
                  <span className="text-xs font-bold">{isAr ? 'في المطعم' : 'Sur place'}</span>
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-300">
                {t.checkout.fullName}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3.5" />
                <input
                  type="text"
                  id="checkout-input-name"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: '' });
                  }}
                  placeholder={t.checkout.fullNamePlaceholder}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900 border text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors rtl:pl-4 rtl:pr-10 ${
                    errors.fullName ? 'border-red-500' : 'border-zinc-800'
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-300">
                {t.checkout.phone}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3.5" />
                <input
                  type="tel"
                  id="checkout-input-phone"
                  value={formData.phoneNumber}
                  onChange={(e) => {
                    setFormData({ ...formData, phoneNumber: e.target.value });
                    if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: '' });
                  }}
                  placeholder={t.checkout.phonePlaceholder}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900 border text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors rtl:pl-4 rtl:pr-10 ${
                    errors.phoneNumber ? 'border-red-500' : 'border-zinc-800'
                  }`}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            {/* Address (conditional for livraison) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-300">
                {t.checkout.address}
                {formData.diningType !== 'livraison' && (
                  <span className="text-zinc-500 text-[11px] font-normal"> (optionnel)</span>
                )}
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5 rtl:left-auto rtl:right-3.5" />
                <textarea
                  id="checkout-input-address"
                  value={formData.deliveryAddress}
                  onChange={(e) => {
                    setFormData({ ...formData, deliveryAddress: e.target.value });
                    if (errors.deliveryAddress) setErrors({ ...errors, deliveryAddress: '' });
                  }}
                  placeholder={t.checkout.addressPlaceholder}
                  rows={2}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors resize-none rtl:pl-4 rtl:pr-10 ${
                    errors.deliveryAddress ? 'border-red-500' : 'border-zinc-800'
                  }`}
                />
              </div>
              {errors.deliveryAddress && (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.deliveryAddress}
                </p>
              )}
            </div>

            {/* Special Note */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-300">
                {t.checkout.note}
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5 rtl:left-auto rtl:right-3.5" />
                <textarea
                  id="checkout-input-note"
                  value={formData.specialNote}
                  onChange={(e) => setFormData({ ...formData, specialNote: e.target.value })}
                  placeholder={t.checkout.notePlaceholder}
                  rows={2}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors resize-none rtl:pl-4 rtl:pr-10"
                />
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-5 sm:p-6 bg-[#111115] border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleCopySummary}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{t.checkout.copyOrder}</span>
            </button>

            <button
              id="btn-confirm-whatsapp-order"
              type="button"
              onClick={handleSendOrder}
              className="w-full sm:flex-1 flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-950/50 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{t.checkout.sendWhatsApp}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
