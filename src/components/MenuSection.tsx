import React, { useState } from 'react';
import { MENU_ITEMS } from '../data/menu';
import { ProductCard } from './ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { Flame, Sparkles, CheckCircle2, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type CategoryFilter = 'all' | 'speciality' | 'kilo' | 'cuts';

export const MenuSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = MENU_ITEMS.filter((item) => {
    // Category match
    const categoryMatches = activeCategory === 'all' || item.category === activeCategory;

    // Search query match
    if (!searchQuery.trim()) return categoryMatches;
    const query = searchQuery.toLowerCase().trim();
    const matchesName =
      item.nameFr.toLowerCase().includes(query) ||
      item.nameAr.toLowerCase().includes(query) ||
      item.descriptionFr.toLowerCase().includes(query) ||
      item.descriptionAr.toLowerCase().includes(query);

    return categoryMatches && matchesName;
  });

  return (
    <section id="menu-section" className="relative py-20 bg-[#0d0d10] text-zinc-100">
      {/* Background glow elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-950/40 border border-orange-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500/30" />
            <span>{t.menuSection.badge}</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
            {t.menuSection.title}
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            {t.menuSection.subtitle}
          </p>

          {/* Included Sides Highlight Card */}
          <div className="mt-6 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-950/30 via-zinc-900 to-amber-950/30 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{t.menuSection.includedNote}</span>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto p-1.5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
            <button
              id="filter-tab-all"
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {t.menuSection.all}
            </button>

            <button
              id="filter-tab-speciality"
              onClick={() => setActiveCategory('speciality')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === 'speciality'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {t.menuSection.speciality}
            </button>

            <button
              id="filter-tab-kilo"
              onClick={() => setActiveCategory('kilo')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === 'kilo'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {t.menuSection.kilo}
            </button>

            <button
              id="filter-tab-cuts"
              onClick={() => setActiveCategory('cuts')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === 'cuts'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {t.menuSection.cuts}
            </button>
          </div>

          {/* Search input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3.5" />
            <input
              type="text"
              id="input-menu-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'ar' ? 'بحث في الأطباق...' : 'Rechercher un plat...'}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors rtl:pl-4 rtl:pr-10"
            />
          </div>
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="popLayout">
          {filteredItems.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredItems.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </motion.div>
          ) : (
            <div className="py-16 text-center bg-zinc-900/40 rounded-3xl border border-zinc-800">
              <p className="text-zinc-400 text-sm">
                {language === 'ar'
                  ? 'لا توجد أطباق تطابق بحثك حالياً.'
                  : 'Aucun plat ne correspond à votre recherche.'}
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
