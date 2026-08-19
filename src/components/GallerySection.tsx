import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Flame, Camera, Eye } from 'lucide-react';
import { motion } from 'motion/react';

export const GallerySection: React.FC = () => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const galleryImages = [
    {
      title: isAr ? 'أطباق اللحم المدخن الفاخرة' : "Plats d'agneau fumé sur planche",
      subtitle: isAr ? 'لحم طري ومفحم يقدم مع الليمون والبصل' : 'Viande ultra-fondante aux agrumes & oignons grillés',
      url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: isAr ? 'أطباق المرافقات المتكاملة' : 'Assortiment complet accompagnements',
      subtitle: isAr ? 'أرز بسمتي، بطاطا، خضر سوتي وسلطة' : 'Riz, frites, légumes sautés et salades',
      url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: isAr ? 'أسياخ وشواء طازج على الجمر' : 'Brochettes fraîches minute',
      subtitle: isAr ? 'تحضير فوري ولحوم طازجة' : 'Préparation artisanale sur braises',
      url: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: isAr ? 'ريش وأضلاع غنمي مكرملة' : "Côtelettes & ribs d'agneau",
      subtitle: isAr ? 'نكهة الدخان الخشبي الأصيل' : 'Saveur fumée profonde au bois naturel',
      url: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section id="gallery-section" className="relative py-20 bg-[#0d0d10] text-zinc-100 border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Camera className="w-4 h-4 text-amber-400" />
            <span>{isAr ? 'معرض الأطباق' : 'Galerie & Réalisations'}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            {isAr ? 'أطباقنا من قلب المطعم' : 'Nos Pièces à la Dégustation'}
          </h2>
          <p className="text-sm text-zinc-400 mt-2">
            {isAr
              ? 'نظرة حية على جودة اللحوم والمرافقات التي نقدمها لزبائننا الكرام يومياً.'
              : 'Un aperçu de la qualité et du soin apporté à chaque pièce d’agneau servie.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 aspect-[4/5] shadow-lg"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-90 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 text-start">
                <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                  {img.title}
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5 line-clamp-2">
                  {img.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
