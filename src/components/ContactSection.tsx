import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { RESTAURANT_INFO } from '../data/menu';
import { openDirectWhatsAppContact, callRestaurant } from '../utils/whatsapp';
import { MessageSquare, Phone, Clock, MapPin, Sparkles, Navigation, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export const ContactSection: React.FC = () => {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <section id="contact-section" className="relative py-20 bg-[#0b0b0e] text-zinc-100 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>{t.contact.badge}</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white">
            {t.contact.title}
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        {/* 2-Column Contact Info & Map Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            {/* Direct WhatsApp Action Box */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#141d17] via-[#121614] to-[#121216] border border-emerald-600/40 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <MessageSquare className="w-6 h-6 fill-emerald-500/20" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-white">
                    {isAr ? 'تواصل معنا على واتساب' : 'WhatsApp Direct'}
                  </h3>
                  <p className="text-sm font-extrabold text-emerald-400 tracking-wider">
                    {RESTAURANT_INFO.phoneDisplay}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {isAr
                  ? 'يمكنكم مراسلتنا في أي وقت لتأكيد الطلبات، الاستفسار عن الأسعار اليومية، أو طلب وجبات خاصة للمجموعات.'
                  : 'Contactez notre équipe directement sur WhatsApp pour toute demande, commande de groupe ou précision.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  id="btn-contact-whatsapp-main"
                  onClick={() => openDirectWhatsAppContact()}
                  className="flex-1 flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-950/40 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.contact.directWhatsApp}</span>
                </button>

                <button
                  id="btn-contact-call-main"
                  onClick={() => callRestaurant()}
                  className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-100 font-bold text-sm border border-zinc-700 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>{t.contact.directCall}</span>
                </button>
              </div>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Hours */}
              <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    {t.contact.hoursTitle}
                  </h4>
                  <p className="text-sm font-extrabold text-zinc-100 mt-1">
                    {isAr ? RESTAURANT_INFO.openingHoursAr : RESTAURANT_INFO.openingHoursFr}
                  </p>
                </div>
              </div>

              {/* Special Orders */}
              <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    {isAr ? 'الولائم والمناسبات' : 'Méchoui & Événements'}
                  </h4>
                  <p className="text-xs font-semibold text-zinc-300 mt-1">
                    {isAr ? 'قطع وخرفان كاملة مدخنة حسب الطلب' : 'Pièces entières sur réservation'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Location Card with Map Preview */}
          <div className="lg:col-span-6 p-6 sm:p-7 rounded-3xl bg-[#141418] border border-zinc-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white">
                    {t.contact.locationTitle}
                  </h3>
                  <p className="text-xs text-zinc-400">{RESTAURANT_INFO.locationCity}</p>
                </div>
              </div>

              <p className="text-xs text-zinc-400 mb-4">
                {t.contact.locationNotice}
              </p>
            </div>

            {/* Dark Styled Map Placeholder */}
            <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/80 flex items-center justify-center group">
              {/* Map stylized background grid */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Pin Center Indicator */}
              <div className="relative z-10 flex flex-col items-center gap-2 p-4 rounded-2xl bg-zinc-900/90 border border-amber-500/40 shadow-2xl backdrop-blur-md text-center max-w-xs">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg animate-bounce">
                  <MapPin className="w-5 h-5 fill-white/20" />
                </div>
                <div>
                  <h5 className="text-sm font-extrabold text-white">SMOKE ME</h5>
                  <p className="text-[11px] text-amber-400 font-semibold">
                    {isAr ? 'الجزائر العاصمة' : 'Alger, Algérie'}
                  </p>
                  <p className="text-[10px] text-zinc-400 mt-1">
                    {isAr ? 'تواصل للحصول على اللوكيشن الدقيق' : 'Position GPS exacte sur WhatsApp'}
                  </p>
                </div>
                <button
                  onClick={() => openDirectWhatsAppContact('Bonjour Smoke Me 👋, pouvez-vous m’envoyer votre localisation GPS exacte ?')}
                  className="mt-1 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 text-[11px] font-bold hover:bg-emerald-900 transition-colors cursor-pointer"
                >
                  <Navigation className="w-3 h-3" />
                  <span>{isAr ? 'طلب الموقع' : 'Demander la position GPS'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
