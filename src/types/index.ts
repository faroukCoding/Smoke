export type Language = 'fr' | 'ar';

export type PriceType = 'fixed' | 'per_kg' | 'to_confirm';

export interface ExtraItem {
  id: string;
  nameFr: string;
  nameAr: string;
  price: number; // 0 DA currently by default
  category: 'accompaniment' | 'sauce' | 'extra';
  includedByDefault?: boolean;
}

export interface MenuItem {
  id: string;
  nameFr: string;
  nameAr: string;
  subtitleFr?: string;
  subtitleAr?: string;
  descriptionFr: string;
  descriptionAr: string;
  priceType: PriceType;
  price?: number; // for fixed e.g. 1800 DA
  priceSurPlace?: number; // e.g. 8900 DA for 1KG
  priceAEmporter?: number; // e.g. 8000 DA for 1KG
  weightLabelFr?: string; // e.g. "210g" or "1 KG"
  weightLabelAr?: string;
  image: string;
  category: 'speciality' | 'cuts' | 'kilo' | 'sides';
  isPopular?: boolean;
  isNew?: boolean;
  includesAccompaniments?: boolean; // "Riz, Pomme de terre, Légumes sautés, sauce inclus"
  tagsFr?: string[];
  tagsAr?: string[];
}

export interface CartItem {
  cartItemId: string; // unique generated ID per customization
  productId: string;
  nameFr: string;
  nameAr: string;
  image: string;
  priceType: PriceType;
  unitPrice: number | null; // null if to_confirm
  diningOption?: 'sur_place' | 'a_emporter'; // for 1KG items or general
  weightMultiplier?: number; // for kg items
  selectedExtras: ExtraItem[];
  specialInstructions?: string;
  quantity: number;
}

export interface OrderFormState {
  fullName: string;
  phoneNumber: string;
  diningType: 'livraison' | 'a_emporter' | 'sur_place';
  deliveryAddress: string;
  specialNote: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'error';
}
