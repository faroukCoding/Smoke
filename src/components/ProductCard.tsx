import React from 'react';
import { MenuItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { Flame, Plus, Check, Sparkles, Scale, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  item: MenuItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const { language, t } = useLanguage();
  const { setCustomizingProduct, addToCart } = useCart();

  const isAr = language === 'ar';
  const name = isAr ? item.nameAr : item.nameFr;
  const subtitle = isAr ? item.subtitleAr : item.subtitleFr;
  const description = isAr ? item.descriptionAr : item.descriptionFr;
  const tags = isAr ? item.tagsAr : item.tagsFr;

  // Handle direct click or customization
  const handleAction = () => {
    setCustomizingProduct(item);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      id={`product-card-${item.id}`}
      className="group relative flex flex-col rounded-2xl bg-[#141418] border border-zinc-800/90 hover:border-amber-500/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-orange-950/20 overflow-hidden"
    >
      {/* Image container */}
      <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-zinc-900">
        <img
          src={item.image}
          alt={name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-90 contrast-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {item.isPopular && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[11px] font-extrabold shadow-md uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              {isAr ? 'الأكثر طلباً' : 'Bestseller'}
            </span>
          )}

          {item.weightLabelFr && (
            <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-zinc-200 text-[11px] font-bold">
              <Scale className="w-3 h-3 text-amber-400" />
              {isAr ? item.weightLabelAr || item.weightLabelFr : item.weightLabelFr}
            </span>
          )}
        </div>

        {/* Price Floating Overlay on Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          {item.priceType === 'fixed' && item.price && (
            <div className="px-3 py-1.5 rounded-xl bg-zinc-950/90 backdrop-blur-md border border-amber-500/40 text-amber-400 font-extrabold text-base shadow-lg">
              {item.price.toLocaleString('fr-FR')} <span className="text-xs text-zinc-300">DA</span>
            </div>
          )}

          {item.priceType === 'per_kg' && (
            <div className="flex flex-col gap-1 px-3 py-1.5 rounded-xl bg-zinc-950/95 backdrop-blur-md border border-amber-500/40 shadow-lg">
              <span className="text-[10px] text-zinc-400 font-semibold leading-none">
                {isAr ? 'سفري / في المطعم' : 'À emporter / Sur place'}
              </span>
              <span className="text-sm font-extrabold text-amber-400">
                8 000 — 8 900 <span className="text-xs text-zinc-300">DA/KG</span>
              </span>
            </div>
          )}

          {item.priceType === 'to_confirm' && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-950/90 backdrop-blur-md border border-zinc-700/80 text-zinc-300 font-bold text-xs shadow-lg">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>{isAr ? 'السعر عند التأكيد' : 'Prix à confirmer'}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-5">
        {/* Title */}
        <div className="mb-2">
          <h3 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
            {name}
          </h3>
          {subtitle && (
            <p className="text-xs font-semibold text-amber-500/90 mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3 mb-4 flex-1">
          {description}
        </p>

        {/* Accompagnement Inclus Pill */}
        {item.includesAccompaniments && (
          <div className="mb-4 py-2 px-3 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-[11px] text-zinc-300 font-medium leading-tight">
              {isAr ? 'أرز، بطاطا، خضر سوتي وصلصة مشمولة' : 'Riz, Pomme de terre, Légumes & Sauces inclus'}
            </span>
          </div>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-zinc-800/80 text-zinc-300 border border-zinc-700/40"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Button */}
        <button
          id={`btn-add-product-${item.id}`}
          onClick={handleAction}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-sm shadow-md shadow-orange-950/40 active:scale-[0.98] transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{t.menuSection.configure}</span>
        </button>
      </div>
    </motion.div>
  );
};
