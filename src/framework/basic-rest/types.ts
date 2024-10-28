import { QueryKey } from '@tanstack/react-query';

export type CollectionsQueryOptionsType = {
  text?: string;
  collection?: string;
  status?: string;
  limit?: number;
};

export type CategoriesQueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
  lang?: string;
};
export type ProductsQueryOptionsType = {
  type: string;
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type QueryOptionsType = {
  id?: string;
  text?: string;
  slug?: string;
  category?: string;
  lang?: string;
  status?: string;
  limit?: number;
  search?: string;
};

export type QueryProductByCategoryOptionsType  ={
  lang: string;
  categorySlug: string;
  status?: string;
  limit?: number;
}

export type QueryParamsType = {
  queryKey: QueryKey;
  pageParam?: string;
};
export type Attachment = {
  id: string | number;
  thumbnail: string;
  original: string;
};

export type CategorySeo = {
  status: string;
  result: number;
  data: {
    category: Category;
  };
}

// Categories Type 
export type CategoryResponse = {
  status: string;
  result: number;
  data: {
    categories: Category[];
  };
};

export type Category = {
  image: {
    desktop: string;
    mobile: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  _id: string;
  name: CategoryTranslations;
  slug: string;
  description: CategoryTranslations;
  parentCategory: string;
  createdAt: string;
  updatedAt: string;
  translatedName: string;
  translatedDescription: string;
  id: string;
  subcategories: Subcategory[];
};

export type Subcategory = {
  image: {
    desktop: string;
    mobile: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  _id: string;
  name: CategoryTranslations;
  slug: string;
  description: CategoryTranslations;
  parentCategory: string;
  createdAt: string;
  translatedName: string;
  translatedDescription: string;
  id: string;
  subcategories: Subcategory[]; // For nested subcategories
};

export type CategoryTranslations = {
  ar: string;
  en: string;
  zh: string;
};

// End Categories type

// Collections Response  type

export type CollectionsResponse = {
  status: string;
  data: {
    collection: Collection;
  };
};

export type Collection = {
  _id: string;
  name: {
    en: string;
    zh: string;
    ar: string;
  };
  description: {
    en: string;
    zh: string;
    ar: string;
  };
  slug: string;
  products: {
    productId: Product;
    index: number;
    _id: string;
    id: string;
  }[];
  createdAt: string;
  updatedAt: string;
  translatedName: string;
  translatedDescription: string;
  __v: number;
  id: string;
};

export type Brand = {
  id: number | string;
  name: string;
  slug: string;
  image?: Attachment;
  [key: string]: unknown;
};

export type Dietary = {
  id: number | string;
  name: string;
  slug: string;
  [key: string]: unknown;
};
export type Tag = {
  id: string | number;
  name: string;
  slug: string;
};
 // Products Response type

 export type ProductResponse = {
  status: string;
  result: number;
  data: {
    products: Product[];
  };
};


export type ProductDetailsResponse  = {
  status: string;
  result: number;
  data: {
    product: Product;
    relatedProducts: Product[]
  };
}

export type ProductCollection =  {
  products: ProductId[];
}

export type ProductId ={
  productId: Product
}

export type Product = {
  thumbnail: {
    desktop: string;
    mobile: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  _id: string;
  name: ProductTranslations;
  slug: string;
  categoryId: CategoryId;
  description: ProductTranslations;
  tags: ProductTranslationsArray;
  units: ProductUnit[];
  minPurchaseQty: number;
  isTrending: boolean;
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
  translatedName: string;
  translatedDescription: string;
  translatedTags: string[];
  id: string;
};

export type CategoryId = {
  _id: string;
  name:{
    ar:string;
    en: string;
    zh:string;
  },
  translatedName:string;
  id:string;
}

export type ProductUnit = {
  quantity: number;
  unitName: string;
  _id: string;
  id: string;
};

export type ProductImage = {
  desktop: string;
  mobile: string;
  _id: string;
  id: string;
};

export type ProductTranslations = {
  en: string;
  zh: string;
  ar: string;
};

export type ProductTranslationsArray = {
  en: string[];
  zh: string[];
  ar: string[];
};

 // End Products Response type 


export type OrderItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
};
export type Order = {
  id: string | number;
  name: string;
  slug: string;
  products: OrderItem[];
  total: number;
  tracking_number: string;
  customer: {
    id: number;
    email: string;
  };
  shipping_fee: number;
  payment_gateway: string;
};

export type ShopsQueryOptionsType = {
  text?: string;
  shop?: Shop;
  status?: string;
  limit?: number;
};

export type Shop = {
  id: string | number;
  owner_id: string | number;
  owner_name: string;
  address: string;
  phone: string;
  website: string;
  ratings: string;
  name: string;
  slug: string;
  description: string;
  cover_image: Attachment;
  logo: Attachment;
  socialShare: any;
  created_at: string;
  updated_at: string;
};

// Banner  type 

export type Banner = {
  image:ImageBanner;
  _id: string;
  altText: string;
  type: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export type ImageBanner = {
  desktop: string;
  mobile: string;
}

// End Banner Type
export type CompanyProfileResponse = {
  status: string;
  data: {
    companyProfile: CompanyProfile;
  };
};

export type CompanyProfile = {
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  seo: {
    keywords: string[];
    metaDescription: string;
    metaTitle: string;
  };
  _id: string;
  name: string;
  logo: string;
  socialMedia: SocialMedia[];
  certificates: any[]; 
  partners: Partner[]; 
  updatedAt: string;
  description: string;
}

export type Partner = {
    logo: string;
    name: string;
    _id: string;
}

export type SocialMedia = {
  name: string;
  url: string;
  icon: string;
  _id: string;
}

export type OrderData ={
  companyInfo: CompanyInfo;
  items: OrderItems[];
}

export type CompanyInfo  = {
  name: string;
  address: Address;
  contact: string;
  email: string;
  representative: string;
 
}

export type Address = {
  country: string;
  city: string;
  state: string;
  zipCode: string;
  address:string;
}

export type OrderItems = {
  productId: string;
  unitName: string;
  quantity: number;
}

export type QuotationDetailsResponse = {
  status: string;
  data: QuotationData;
};

export type QuotationData = {
  quotation: Quotation;
};

export type QuotationDetails = {
  companyInfo: CompanyInfo;
  items: QuotationItem[];
  status: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};


export type QuotationProduct = {
  _id: string;
  name: {
    en: string;
    zh: string;
    ar: string;
  };
  translatedName: string | null;
  translatedDescription: string | null;
  translatedTags: string[] | null;
  id: string;
  thumbnail: {
    desktop: string;
    mobile: string;
  };
};

export type QuotationItem = {
  thumbnail: {
    desktop: string;
    mobile: string;
  };
  productId: QuotationProduct;
  unitName: string;
  quantity: number;
  _id: string;
};

export type CustomerCompanyInfo = {
  _id: string;
  name: string;
  address: Address;
  contact: string;
  email: string;
  representative: string;
  createdAt: string;
}

export type ContactRequest = {
  name: string;
  email: string;
  country: string;
  subject: string;
  message: string;
};

export type ContactResponse = {
  status: string;
  message: string;
  data: {
    contactmessage: ContactMessage
  };
};
export type ContactMessage =  {
  name: string;
  email: string;
  country: string;
  subject: string;
  message: string;
  _id: string;
  createdAt: string;
  __v: number;
}

export type FavoriteItem = {
  itemId: string;
  isSaved: boolean;
}

export type FilterResponse = {
  status: string;
  result: number;
  data: {
    categories: Category[];
    tags: string[];
  };
};

export type SubscribeRequest = {
  email: string;
};

export type SubscribeResponse = {
  status: string;
  message: string;
  data: {
    subscription: {
      email: string;
      _id: string;
      subscribedAt: string;
      __v: number;
    };
  };
};




export type Quotation = {
  _id: string;
  status: string;
  createdAt: string;
  name: string;
  email: string;
  itemCount: number;
};

export type QuotationResponse = {
  status: string;
  result: number;
  data: {
      quotations: Quotation[];
  };
};




