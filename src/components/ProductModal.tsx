import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { AVAILABLE_EXTRAS } from '../data/menu';
import { ExtraItem } from '../types';
import { X, Plus, Minus, Check, Flame, Info, UtensilsCrossed } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProductModal: React.FC = () => {
  const { customizingProduct, setCustomizingProduct, addToCart } = useCart();
  const { language, t } = useLanguage();

  const [quantity, setQuantity] = useState<number>(1);
  const [diningOption, setDiningOption] = useState<'sur_place' | 'a_emporter'>('a_emporter');
  const [selectedExtras, setSelectedExtras] = useState<ExtraItem[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  // Reset modal state when product changes
  useEffect(() => {
    if (customizingProduct) {
      setQuantity(1);
      setDiningOption('a_emporter');
      setSpecialInstructions('');
      // Pre-select default included extras
      const defaults = AVAILABLE_EXTRAS.filter((e) => e.includedByDefault);
      setSelectedExtras(defaults);
    }
  }, [customizingProduct]);

  if (!customizingProduct) return null;

  const isAr = language === 'ar';
  const name = isAr ? customizingProduct.nameAr : customizingProduct.nameFr;
  const description = isAr ? customizingProduct.descriptionAr : customizingProduct.descriptionFr;

  // Calculate unit price based on options
  const calculateUnitPrice = (): number | null => {
    if (customizingProduct.priceType === 'fixed') {
      return customizingProduct.price || 1800;
    }
    if (customizingProduct.priceType === 'per_kg') {
      return diningOption === 'sur_place'
        ? customizingProduct.priceSurPlace || 8900
        : customizingProduct.priceAEmporter || 8000;
    }
    return null; // to_confirm
  };

  const unitPrice = calculateUnitPrice();
  const extraPriceSum = selectedExtras.reduce((acc, e) => acc + (e.price || 0), 0);
  const totalItemPrice = unitPrice !== null ? (unitPrice + extraPriceSum) * quantity : null;

  const toggleExtra = (extra: ExtraItem) => {
    setSelectedExtras((prev) => {
      const exists = prev.some((e) => e.id === extra.id);
      if (exists) {
        return prev.filter((e) => e.id !== extra.id);
      } else {
        return [...prev, extra];
      }
    });
  };

  const handleConfirmAddToCart = () => {
    addToCart({
      productId: customizingProduct.id,
      nameFr: customizingProduct.nameFr,
      nameAr: customizingProduct.nameAr,
      image: customizingProduct.image,
      priceType: customizingProduct.priceType,
      unitPrice: unitPrice !== null ? unitPrice + extraPriceSum : null,
      diningOption: customizingProduct.priceType === 'per_kg' ? diningOption : undefined,
      selectedExtras,
      specialInstructions,
      quantity,
    });
    setCustomizingProduct(null);
  };

  return (
    <AnimatePresence>
      <div
        id="product-customizer-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
        onClick={() => setCustomizingProduct(null)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          id="product-customizer-modal"
          className="relative w-full max-w-xl bg-[#141418] border border-zinc-700/80 rounded-3xl shadow-2xl overflow-hidden my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            id="btn-close-product-modal"
            onClick={() => setCustomizingProduct(null)}
            className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header Image */}
          <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-zinc-900">
            <img
              src={customizingProduct.image}
              alt={name}
              className="w-full h-full object-cover object-center filter brightness-90 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-black/40" />

            <div className="absolute bottom-4 left-5 right-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-bold mb-2">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'ar' ? customizingProduct.nameAr : customizingProduct.nameFr}</span>
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                {name}
              </h2>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-7 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Description */}
            <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800/80">
              {description}
            </p>

            {/* If 1 KG product: choose Sur Place vs À Emporter */}
            {customizingProduct.priceType === 'per_kg' && (
              <div className="space-y-3">
                <label className="block text-sm font-bold text-zinc-200">
                  {t.modal.diningType} *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDiningOption('a_emporter')}
                    className={`flex items-center justify-between p-4 rounded-2xl border text-start transition-all cursor-pointer ${
                      diningOption === 'a_emporter'
                        ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg shadow-orange-950/30'
                        : 'bg-zinc-900/70 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold text-zinc-100">{t.menuSection.aEmporter}</p>
                      <p className="text-xs text-amber-400 font-extrabold mt-0.5">8 000 DA / KG</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        diningOption === 'a_emporter'
                          ? 'border-amber-500 bg-amber-500 text-black'
                          : 'border-zinc-600'
                      }`}
                    >
                      {diningOption === 'a_emporter' && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDiningOption('sur_place')}
                    className={`flex items-center justify-between p-4 rounded-2xl border text-start transition-all cursor-pointer ${
                      diningOption === 'sur_place'
                        ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg shadow-orange-950/30'
                        : 'bg-zinc-900/70 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold text-zinc-100">{t.menuSection.surPlace}</p>
                      <p className="text-xs text-amber-400 font-extrabold mt-0.5">8 900 DA / KG</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        diningOption === 'sur_place'
                          ? 'border-amber-500 bg-amber-500 text-black'
                          : 'border-zinc-600'
                      }`}
                    >
                      {diningOption === 'sur_place' && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Notice for to_confirm items */}
            {customizingProduct.priceType === 'to_confirm' && (
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs leading-relaxed">
                <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-300 mb-0.5">{t.menuSection.priceToConfirm}</p>
                  <p className="text-zinc-300">{t.modal.toConfirmNotice}</p>
                </div>
              </div>
            )}

            {/* Extras & Accompaniments Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-zinc-200">
                  {t.modal.accompaniments}
                </label>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-700/40">
                  {isAr ? 'مشمولة مجاناً' : 'Inclus 0 DA'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {AVAILABLE_EXTRAS.map((extra) => {
                  const isSelected = selectedExtras.some((e) => e.id === extra.id);
                  const extraName = isAr ? extra.nameAr : extra.nameFr;

                  return (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => toggleExtra(extra)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-start transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-800/90 border-amber-500/60 text-zinc-100'
                          : 'bg-zinc-900/50 border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <span className="text-xs font-medium">{extraName}</span>
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                          isSelected
                            ? 'border-amber-500 bg-amber-500 text-black'
                            : 'border-zinc-700'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Special Instructions Note */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-zinc-300">
                {t.modal.specialNotes}
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder={t.modal.specialNotesPlaceholder}
                rows={2}
                className="w-full px-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Modal Footer: Quantity & Add Button */}
          <div className="p-5 sm:p-6 bg-[#101014] border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Quantity control */}
            <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-4">
              <span className="text-xs font-bold text-zinc-400">{t.modal.quantity} :</span>
              <div className="flex items-center gap-3 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center justify-center transition-colors cursor-pointer"
                  disabled={quantity <= 1}
                  aria-label="Diminuer la quantité"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-extrabold text-base text-zinc-100 min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Augmenter la quantité"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Total price + Submit button */}
            <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
              <div className="text-end">
                <p className="text-[10px] text-zinc-400 font-semibold">{t.modal.totalItem}</p>
                <p className="text-lg font-black text-amber-400">
                  {totalItemPrice !== null ? (
                    <>
                      {totalItemPrice.toLocaleString('fr-FR')}{' '}
                      <span className="text-xs text-zinc-300">DA</span>
                    </>
                  ) : (
                    <span className="text-sm text-zinc-300">{t.menuSection.priceToConfirm}</span>
                  )}
                </p>
              </div>

              <button
                id="btn-confirm-add-to-cart"
                type="button"
                onClick={handleConfirmAddToCart}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-extrabold text-sm shadow-xl shadow-orange-950/40 active:scale-[0.98] transition-all cursor-pointer"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>{t.modal.addBtn}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
