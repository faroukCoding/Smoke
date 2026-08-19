import { CartItem, OrderFormState, Language } from '../types';
import { RESTAURANT_INFO } from '../data/menu';

export const formatPrice = (amount: number | null, lang: Language = 'fr'): string => {
  if (amount === null || amount === undefined) {
    return lang === 'ar' ? 'السعر عند التأكيد' : 'Prix à confirmer';
  }
  return `${amount.toLocaleString('fr-FR')} DA`;
};

export const generateWhatsAppOrderMessage = (
  cart: CartItem[],
  formData: OrderFormState,
  confirmedTotal: number,
  itemsToConfirmCount: number,
  lang: Language = 'fr'
): string => {
  const isAr = lang === 'ar';

  const greeting = isAr
    ? 'السلام عليكم Smoke Me 👋\n\nطلب جديد من الموقع :'
    : 'Bonjour Smoke Me 👋\n\nNouvelle commande :';

  const itemsList = cart
    .map((item) => {
      const name = isAr ? item.nameAr : item.nameFr;
      const optionLabel = item.diningOption
        ? item.diningOption === 'sur_place'
          ? isAr ? ' (في المطعم)' : ' (Sur place)'
          : isAr ? ' (سفري)' : ' (À emporter)'
        : '';
      
      const priceText = item.unitPrice !== null
        ? `${(item.unitPrice * item.quantity).toLocaleString('fr-FR')} DA`
        : isAr ? 'السعر عند التأكيد' : 'Prix à confirmer';

      let text = `• ${name}${optionLabel} × ${item.quantity} [${priceText}]`;

      if (item.selectedExtras && item.selectedExtras.length > 0) {
        const extrasNames = item.selectedExtras
          .map((e) => (isAr ? e.nameAr : e.nameFr))
          .join(', ');
        text += `\n  ${isAr ? 'المرافقات' : 'Extras'}: ${extrasNames}`;
      }

      if (item.specialInstructions && item.specialInstructions.trim()) {
        text += `\n  ${isAr ? 'ملاحظة الطبق' : 'Note'}: ${item.specialInstructions.trim()}`;
      }

      return text;
    })
    .join('\n\n');

  const totalLabel = isAr ? 'المجموع' : 'Total';
  const totalDetails = itemsToConfirmCount > 0
    ? `${confirmedTotal.toLocaleString('fr-FR')} DA (+ ${itemsToConfirmCount} ${isAr ? 'أطباق بسعر عند التأكيد' : 'article(s) à confirmer'})`
    : `${confirmedTotal.toLocaleString('fr-FR')} DA`;

  const diningTypeFormatted = (() => {
    switch (formData.diningType) {
      case 'livraison':
        return isAr ? 'توصيل إلى المنزل 🛵' : 'Livraison à domicile 🛵';
      case 'a_emporter':
        return isAr ? 'سفري / استلام من المطعم 🛍️' : 'À emporter 🛍️';
      case 'sur_place':
        return isAr ? 'تناول في المطعم (حجز) 🍽️' : 'Sur place 🍽️';
      default:
        return formData.diningType;
    }
  })();

  const customerDetails = isAr
    ? `👤 الاسم: ${formData.fullName}
📞 الهاتف: ${formData.phoneNumber}
📦 نوع الطلب: ${diningTypeFormatted}
📍 العنوان: ${formData.deliveryAddress || 'غير محدد'}
📝 ملاحظة: ${formData.specialNote || 'لا توجد'}`
    : `👤 Nom: ${formData.fullName}
📞 Téléphone: ${formData.phoneNumber}
📦 Type de commande: ${diningTypeFormatted}
📍 Adresse: ${formData.deliveryAddress || 'Non spécifiée'}
📝 Note: ${formData.specialNote || 'Aucune'}`;

  const separator = '──────────────────────────';

  const footerText = isAr
    ? '🔥 تم الإرسال من موقع Smoke Me الرسمي'
    : '🔥 Envoyé depuis le site officiel Smoke Me';

  return `${greeting}

${itemsList}

${separator}
💰 ${totalLabel}: ${totalDetails}
${separator}

${customerDetails}

${footerText}`;
};

export const openWhatsAppOrder = (
  cart: CartItem[],
  formData: OrderFormState,
  confirmedTotal: number,
  itemsToConfirmCount: number,
  lang: Language = 'fr'
): string => {
  const message = generateWhatsAppOrderMessage(cart, formData, confirmedTotal, itemsToConfirmCount, lang);
  const encodedText = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodedText}`;

  // Open in new tab/window for WhatsApp
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

  return message;
};

export const openDirectWhatsAppContact = (customMsg?: string): void => {
  const defaultMsg = encodeURIComponent('Bonjour Smoke Me 👋, je souhaite avoir plus d’informations sur le menu et les disponibilités.');
  const text = customMsg ? encodeURIComponent(customMsg) : defaultMsg;
  window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
};

export const callRestaurant = (): void => {
  window.location.href = `tel:${RESTAURANT_INFO.phoneRaw}`;
};
