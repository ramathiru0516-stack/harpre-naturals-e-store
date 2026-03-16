export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  mrp?: number;
  weight?: string;
  description: string;
  ingredients?: string;
  benefits?: string;
  image?: string;
}

export interface Category {
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export const categories: Category[] = [
  { name: "Hair Oils", slug: "hair-oils", icon: "💧", description: "Pure herbal oils for healthy hair" },
  { name: "Herbal Soaps", slug: "herbal-soaps", icon: "🧼", description: "Handmade natural soaps" },
  { name: "Herbal Gels", slug: "herbal-gels", icon: "✨", description: "Natural soothing gels" },
  { name: "Lip Balms", slug: "lip-balms", icon: "💋", description: "Nourishing lip care" },
  { name: "Face Packs", slug: "face-packs", icon: "🌿", description: "Deep cleansing face packs" },
  { name: "Hair Packs", slug: "hair-packs", icon: "🌾", description: "Strengthening hair treatments" },
  { name: "Herbal Powders", slug: "herbal-powders", icon: "🫧", description: "Traditional herbal powders" },
  { name: "Masala Powders", slug: "masala-powders", icon: "🌶️", description: "Fresh homemade masalas" },
  { name: "Pre-Mix Foods", slug: "pre-mix-foods", icon: "🍲", description: "Ready-to-cook premixes" },
  { name: "Pickles", slug: "pickles", icon: "🫙", description: "Traditional homemade pickles" },
  { name: "Honey", slug: "honey", icon: "🍯", description: "Pure natural honey" },
  { name: "Shampoo & Conditioner", slug: "shampoo-conditioner", icon: "🧴", description: "Herbal hair cleansers" },
  { name: "Special Products", slug: "special-products", icon: "⭐", description: "Unique herbal products" },
];

export const products: Product[] = [
  // Hair Oils
  { id: "ho-1", name: "Mixed Herbal Oil", category: "Hair Oils", categorySlug: "hair-oils", price: 250, description: "A powerful blend of herbal oils that reduces hair fall, promotes hair growth, and strengthens roots.", ingredients: "Coconut oil, Sesame oil, Amla, Brahmi, Bhringraj, Hibiscus, Curry leaves", benefits: "Reduces hair fall, promotes growth, strengthens roots" },
  { id: "ho-2", name: "Amla Oil", category: "Hair Oils", categorySlug: "hair-oils", price: 200, mrp: 300, description: "Pure Amla oil that controls dandruff, improves shine, and delays greying.", ingredients: "Amla extract, Coconut oil base", benefits: "Controls dandruff, improves shine, delays greying" },
  { id: "ho-3", name: "Neem Oil", category: "Hair Oils", categorySlug: "hair-oils", price: 180, mrp: 250, description: "Natural Neem oil with anti-bacterial properties for scalp health.", ingredients: "Cold-pressed Neem oil, Coconut oil", benefits: "Anti-bacterial, promotes scalp health" },
  { id: "ho-4", name: "Pre Bath Oil", category: "Hair Oils", categorySlug: "hair-oils", price: 350, mrp: 400, description: "Premium pre-bath oil treatment for deep nourishment.", ingredients: "Coconut oil, Castor oil, Fenugreek, Hibiscus", benefits: "Deep nourishment, reduces dryness" },

  // Herbal Soaps
  { id: "hs-1", name: "Manjistha Soap", category: "Herbal Soaps", categorySlug: "herbal-soaps", price: 65, weight: "100g", description: "Improves complexion and reduces pigmentation.", ingredients: "Manjistha extract, Soap base, Essential oils", benefits: "Improves complexion, reduces pigmentation" },
  { id: "hs-2", name: "Rose Soap", category: "Herbal Soaps", categorySlug: "herbal-soaps", price: 65, weight: "100g", description: "Mild cleansing with refreshing rose fragrance for a natural glow.", ingredients: "Rose extract, Rose water, Soap base", benefits: "Mild cleansing, refreshing fragrance, natural glow" },
  { id: "hs-3", name: "Orange Soap", category: "Herbal Soaps", categorySlug: "herbal-soaps", price: 65, weight: "100g", description: "Brightening soap for tan removal and moisturizing.", ingredients: "Orange peel extract, Vitamin C, Soap base", benefits: "Brightening, tan removal, moisturizing" },
  { id: "hs-4", name: "Goat Milk Soap", category: "Herbal Soaps", categorySlug: "herbal-soaps", price: 150, weight: "100g", description: "Rich and creamy goat milk soap for deep moisturization.", ingredients: "Goat milk, Shea butter, Soap base", benefits: "Deep moisturization, soft skin" },
  { id: "hs-5", name: "Nalangu Maavu Soap", category: "Herbal Soaps", categorySlug: "herbal-soaps", price: 80, weight: "100g", description: "Traditional soap with turmeric and gram flour for natural glow.", ingredients: "Turmeric, Gram flour, Herbal ingredients, Essential oils", benefits: "Removes excess oil, natural glow, reduces acne" },
  { id: "hs-6", name: "Skin Brightening Soap", category: "Herbal Soaps", categorySlug: "herbal-soaps", price: 90, weight: "100g", description: "Handmade soap with beetroot and carrot for skin brightening.", ingredients: "Beetroot, Carrot, Essential Oils, Shea Butter", benefits: "Brightens & nourishes skin" },
  { id: "hs-7", name: "Kuppaimeni Soap", category: "Herbal Soaps", categorySlug: "herbal-soaps", price: 65, weight: "100g", description: "Anti-bacterial herbal soap with neem for sensitive skin.", ingredients: "Kuppaimeni, Neem, Soap base", benefits: "Anti-bacterial, reduces itching & skin irritation" },
  { id: "hs-8", name: "Turmeric Soap", category: "Herbal Soaps", categorySlug: "herbal-soaps", price: 65, weight: "100g", description: "Traditional turmeric soap for glowing skin.", ingredients: "Turmeric, Essential oils, Soap base", benefits: "Natural glow, anti-inflammatory" },
  { id: "hs-9", name: "Mixed Herbal Soap", category: "Herbal Soaps", categorySlug: "herbal-soaps", price: 65, weight: "100g", description: "A blend of multiple herbs for overall skin care.", ingredients: "Mixed herbal extracts, Soap base", benefits: "Overall skin nourishment" },
  { id: "hs-10", name: "Loofah Soap", category: "Herbal Soaps", categorySlug: "herbal-soaps", price: 100, weight: "100g", description: "Exfoliating loofah soap. Loofah customization available for all types.", ingredients: "Natural loofah, Soap base, Essential oils", benefits: "Exfoliation, deep cleansing" },
  { id: "hs-11", name: "Kojic Acid Soap", category: "Herbal Soaps", categorySlug: "herbal-soaps", price: 120, weight: "100g", description: "Skin brightening soap with Kojic acid.", ingredients: "Kojic acid, Soap base", benefits: "Skin brightening, even tone" },
  { id: "hs-12", name: "Spirulina Soap", category: "Herbal Soaps", categorySlug: "herbal-soaps", price: 120, weight: "100g", description: "Nutrient-rich spirulina soap for healthy skin.", ingredients: "Spirulina, Soap base, Essential oils", benefits: "Nutrient-rich, anti-aging" },
  { id: "hs-13", name: "Glutathione Soap", category: "Herbal Soaps", categorySlug: "herbal-soaps", price: 150, weight: "100g", description: "Premium skin whitening soap with Glutathione.", ingredients: "Glutathione, Soap base", benefits: "Skin whitening, anti-oxidant" },
  { id: "hs-14", name: "Multani Mitti Soap", category: "Herbal Soaps", categorySlug: "herbal-soaps", price: 70, weight: "100g", description: "Deep cleansing Fuller's Earth soap for oily skin.", ingredients: "Multani Mitti, Soap base", benefits: "Deep cleansing, oil control, reduces pimples" },

  // Herbal Gels
  { id: "hg-1", name: "Saffron Gel", category: "Herbal Gels", categorySlug: "herbal-gels", price: 199, description: "Luxurious saffron gel for glowing skin.", ingredients: "Saffron extract, Aloe Vera gel base", benefits: "Skin brightening, natural glow" },
  { id: "hg-2", name: "Aloe Vera Gel", category: "Herbal Gels", categorySlug: "herbal-gels", price: 150, description: "Pure aloe vera gel for soothing and hydrating skin and hair.", ingredients: "Pure Aloe Vera gel", benefits: "Soothing, hydrating, reduces sunburn" },
  { id: "hg-3", name: "Butterfly Pea Gel", category: "Herbal Gels", categorySlug: "herbal-gels", price: 180, description: "Natural butterfly pea gel for hair and skin care.", ingredients: "Butterfly Pea extract, Aloe Vera gel", benefits: "Anti-aging, promotes hair growth" },
  { id: "hg-4", name: "Rose Gel", category: "Herbal Gels", categorySlug: "herbal-gels", price: 170, description: "Refreshing rose gel for skin hydration.", ingredients: "Rose extract, Aloe Vera gel", benefits: "Hydrating, refreshing, toning" },

  // Lip Balms
  { id: "lb-1", name: "Beetroot Lip Balm", category: "Lip Balms", categorySlug: "lip-balms", price: 120, description: "Natural tint and deep moisture for soft, rosy lips.", ingredients: "Beetroot extract, Shea butter, Beeswax", benefits: "Natural tint, deep moisture, soft lips" },
  { id: "lb-2", name: "Rose Lip Balm", category: "Lip Balms", categorySlug: "lip-balms", price: 120, description: "Rose-infused lip balm for delicate lip care.", ingredients: "Rose extract, Cocoa butter, Beeswax", benefits: "Moisturizing, subtle rosy tint" },

  // Face Packs
  { id: "fp-1", name: "Mixed Herbal Face Pack", category: "Face Packs", categorySlug: "face-packs", price: 180, description: "Deep cleansing face pack for clear, glowing skin.", ingredients: "Multani Mitti, Sandalwood, Turmeric, Rose", benefits: "Deep cleansing, improves complexion" },
  { id: "fp-2", name: "Skin Brightening Face Pack", category: "Face Packs", categorySlug: "face-packs", price: 200, description: "Brightening face pack with natural ingredients.", ingredients: "Saffron, Turmeric, Sandalwood, Milk powder", benefits: "Brightens skin, reduces dark spots" },
  { id: "fp-3", name: "Bridal Herbal Face Pack", category: "Face Packs", categorySlug: "face-packs", price: 250, description: "Premium bridal face pack for wedding glow.", ingredients: "Saffron, Gold dust, Sandalwood, Rose", benefits: "Bridal glow, instant radiance" },
  { id: "fp-4", name: "Skin Whitening Face Pack", category: "Face Packs", categorySlug: "face-packs", price: 220, description: "Natural skin whitening face pack.", ingredients: "Liquorice, Milk powder, Sandalwood", benefits: "Skin whitening, even tone" },

  // Hair Packs
  { id: "hp-1", name: "Mixed Herbal Hair Pack", category: "Hair Packs", categorySlug: "hair-packs", price: 180, description: "Nourishing herbal hair pack for all hair types.", ingredients: "Amla, Shikakai, Bhringraj, Hibiscus", benefits: "Nourishes scalp, reduces hair fall" },
  { id: "hp-2", name: "Anti-Dandruff Hair Pack", category: "Hair Packs", categorySlug: "hair-packs", price: 200, description: "Effective anti-dandruff treatment.", ingredients: "Neem, Tea tree, Fenugreek", benefits: "Removes dandruff, soothes scalp" },
  { id: "hp-3", name: "Hair Blackening Hair Pack", category: "Hair Packs", categorySlug: "hair-packs", price: 220, description: "Natural hair blackening treatment.", ingredients: "Indigo, Henna, Amla, Brahmi", benefits: "Natural blackening, strengthens hair" },
  { id: "hp-4", name: "Biotin Hair Pack", category: "Hair Packs", categorySlug: "hair-packs", price: 250, description: "Biotin-enriched hair pack for thick, healthy hair.", ingredients: "Biotin, Keratin, Herbal extracts", benefits: "Thickens hair, promotes growth" },

  // Herbal Powders
  { id: "hpw-1", name: "Kasturi Manjal Powder", category: "Herbal Powders", categorySlug: "herbal-powders", price: 120, description: "Traditional kasturi manjal for skin brightening.", ingredients: "Wild turmeric (Kasturi Manjal)", benefits: "Reduces tan, improves glow, controls acne" },
  { id: "hpw-2", name: "Nalangu Maavu", category: "Herbal Powders", categorySlug: "herbal-powders", price: 100, description: "Traditional body cleanser and bridal care powder.", ingredients: "Turmeric, Gram flour, Herbal mix", benefits: "Natural cleanser, bridal glow care" },
  { id: "hpw-3", name: "Manjistha Powder", category: "Herbal Powders", categorySlug: "herbal-powders", price: 130, description: "Pure Manjistha powder for complexion improvement.", ingredients: "Manjistha root powder", benefits: "Improves complexion, blood purifier" },
  { id: "hpw-4", name: "Multani Mitti Powder", category: "Herbal Powders", categorySlug: "herbal-powders", price: 80, description: "Fuller's Earth for deep cleansing.", ingredients: "Pure Multani Mitti", benefits: "Deep cleansing, oil control" },
  { id: "hpw-5", name: "Beetroot Powder", category: "Herbal Powders", categorySlug: "herbal-powders", price: 100, description: "Natural beetroot powder for skin and health.", ingredients: "Dehydrated Beetroot powder", benefits: "Rich in iron, natural colorant" },
  { id: "hpw-6", name: "Carrot Powder", category: "Herbal Powders", categorySlug: "herbal-powders", price: 100, description: "Natural carrot powder rich in beta-carotene.", ingredients: "Dehydrated Carrot powder", benefits: "Rich in Vitamin A, skin nourishment" },
  { id: "hpw-7", name: "ABC Powder", category: "Herbal Powders", categorySlug: "herbal-powders", price: 110, description: "ABC herbal powder blend for skin care.", ingredients: "Almond, Beetroot, Carrot powder blend", benefits: "Skin nourishment, natural glow" },
  { id: "hpw-8", name: "Sandalwood Powder", category: "Herbal Powders", categorySlug: "herbal-powders", price: 200, description: "Premium sandalwood powder for radiant skin.", ingredients: "Pure Sandalwood powder", benefits: "Cooling, brightening, anti-acne" },

  // Honey
  { id: "hn-1", name: "Wild Honey", category: "Honey", categorySlug: "honey", price: 350, description: "Pure wild honey sourced from natural forests.", ingredients: "100% Wild Honey", benefits: "Immunity booster, natural sweetener" },
  { id: "hn-2", name: "Raw Honey", category: "Honey", categorySlug: "honey", price: 300, description: "Unprocessed raw honey with natural enzymes.", ingredients: "100% Raw Honey", benefits: "Rich in antioxidants, natural energy" },

  // Shampoo
  { id: "sh-1", name: "Shikakai Shampoo", category: "Shampoo & Conditioner", categorySlug: "shampoo-conditioner", price: 200, description: "Gentle cleansing shampoo with Shikakai for all hair types.", ingredients: "Shikakai, Amla, Reetha", benefits: "Gentle cleansing, reduces dandruff" },
  { id: "sh-2", name: "Aloe Vera Shampoo", category: "Shampoo & Conditioner", categorySlug: "shampoo-conditioner", price: 220, description: "Hydrating shampoo with Aloe Vera.", ingredients: "Aloe Vera, Coconut extract", benefits: "Hydrating, soothing scalp" },
  { id: "sh-3", name: "Rosemary Shampoo", category: "Shampoo & Conditioner", categorySlug: "shampoo-conditioner", price: 250, description: "Rosemary-infused shampoo for hair growth.", ingredients: "Rosemary oil, Herbal extracts", benefits: "Promotes growth, strengthens hair" },
  { id: "sh-4", name: "Hibiscus Shampoo", category: "Shampoo & Conditioner", categorySlug: "shampoo-conditioner", price: 230, description: "Hibiscus shampoo for soft, shiny hair.", ingredients: "Hibiscus extract, Coconut milk", benefits: "Adds shine, reduces hair fall" },
  { id: "sh-5", name: "Rosemary Hair Conditioner", category: "Shampoo & Conditioner", categorySlug: "shampoo-conditioner", price: 280, description: "Deep conditioning with rosemary for silky hair.", ingredients: "Rosemary oil, Shea butter, Argan oil", benefits: "Deep conditioning, silky smooth hair" },

  // Special Products
  { id: "sp-1", name: "Rosemary Hair Spray", category: "Special Products", categorySlug: "special-products", price: 200, description: "Rosemary hair spray for hair growth and styling.", ingredients: "Rosemary water, Essential oils", benefits: "Promotes growth, natural styling" },
  { id: "sp-2", name: "Herbal Kajal", category: "Special Products", categorySlug: "special-products", price: 150, description: "Handmade herbal kajal, safe for eyes.", ingredients: "Castor oil, Camphor, Ghee, Almond oil", benefits: "Safe for eyes, long-lasting, cooling" },

  // Masala Powders
  { id: "mp-1", name: "Chilli Powder", category: "Masala Powders", categorySlug: "masala-powders", price: 80, description: "Pure homemade chilli powder.", ingredients: "Sun-dried red chillies", benefits: "Fresh, pure, homemade" },
  { id: "mp-2", name: "Sambar Powder", category: "Masala Powders", categorySlug: "masala-powders", price: 100, description: "Traditional sambar powder blend.", ingredients: "Coriander, Chilli, Toor dal, Curry leaves, Spices", benefits: "Authentic taste, no preservatives" },
  { id: "mp-3", name: "Garam Masala Powder", category: "Masala Powders", categorySlug: "masala-powders", price: 120, description: "Aromatic garam masala blend.", ingredients: "Cardamom, Cinnamon, Cloves, Bay leaf, Pepper", benefits: "Rich aroma, authentic flavour" },
  { id: "mp-4", name: "Curry Masala Powder", category: "Masala Powders", categorySlug: "masala-powders", price: 100, description: "Versatile curry masala powder.", ingredients: "Coriander, Cumin, Turmeric, Chilli, Spice blend", benefits: "Versatile, fresh taste" },
  { id: "mp-5", name: "Turmeric Powder", category: "Masala Powders", categorySlug: "masala-powders", price: 80, description: "Pure turmeric powder.", ingredients: "Sun-dried Turmeric root", benefits: "Anti-inflammatory, pure" },

  // Pre Mix
  { id: "pm-1", name: "Chutney Premix", category: "Pre-Mix Foods", categorySlug: "pre-mix-foods", price: 80, description: "Instant chutney premix.", ingredients: "Urad dal, Chana dal, Red chilli, Curry leaves", benefits: "Quick preparation, authentic taste" },
  { id: "pm-2", name: "Sambar Premix", category: "Pre-Mix Foods", categorySlug: "pre-mix-foods", price: 90, description: "Ready-to-cook sambar premix.", ingredients: "Toor dal, Sambar powder, Spices", benefits: "Quick sambar, traditional flavour" },
  { id: "pm-3", name: "Idli Podi", category: "Pre-Mix Foods", categorySlug: "pre-mix-foods", price: 80, description: "Crunchy idli podi for South Indian breakfast.", ingredients: "Urad dal, Chana dal, Red chilli, Sesame", benefits: "Crunchy, nutritious" },
  { id: "pm-4", name: "Paruppu Podi", category: "Pre-Mix Foods", categorySlug: "pre-mix-foods", price: 80, description: "Traditional paruppu podi.", ingredients: "Toor dal, Pepper, Cumin, Red chilli", benefits: "Protein-rich, flavourful" },
  { id: "pm-5", name: "Kariveppilai Podi", category: "Pre-Mix Foods", categorySlug: "pre-mix-foods", price: 80, description: "Curry leaves podi for rice.", ingredients: "Curry leaves, Urad dal, Chilli", benefits: "Iron-rich, aromatic" },
  { id: "pm-6", name: "ABC Malt", category: "Pre-Mix Foods", categorySlug: "pre-mix-foods", price: 150, description: "Nutritious health malt drink.", ingredients: "Almonds, Bajra, Cashew, Ragi, Wheat", benefits: "Nutritious, energy booster" },
  { id: "pm-7", name: "Nuts Powder", category: "Pre-Mix Foods", categorySlug: "pre-mix-foods", price: 200, description: "Mixed nuts powder for health.", ingredients: "Almonds, Cashew, Pista, Walnut", benefits: "Rich in protein, energy boost" },
  { id: "pm-8", name: "Health Mix", category: "Pre-Mix Foods", categorySlug: "pre-mix-foods", price: 180, description: "Multi-grain health mix powder.", ingredients: "Ragi, Rice, Wheat, Corn, Green gram, Bajra", benefits: "Complete nutrition, all ages" },

  // Pickles
  { id: "pk-1", name: "Mango Pickle", category: "Pickles", categorySlug: "pickles", price: 120, description: "Traditional homemade mango pickle.", ingredients: "Raw mango, Mustard, Chilli, Sesame oil", benefits: "Authentic taste, homemade" },
  { id: "pk-2", name: "Tomato Garlic Pickle", category: "Pickles", categorySlug: "pickles", price: 100, description: "Spicy tomato garlic pickle.", ingredients: "Tomato, Garlic, Chilli, Oil", benefits: "Tangy, flavourful" },
  { id: "pk-3", name: "Garlic Pickle", category: "Pickles", categorySlug: "pickles", price: 100, description: "Pure garlic pickle.", ingredients: "Garlic, Chilli, Sesame oil, Mustard", benefits: "Immunity booster, traditional" },
  { id: "pk-4", name: "Lemon Pickle", category: "Pickles", categorySlug: "pickles", price: 100, description: "Tangy lemon pickle.", ingredients: "Lemon, Salt, Chilli, Oil", benefits: "Rich in Vitamin C, digestive" },
  { id: "pk-5", name: "Chilli Pickle", category: "Pickles", categorySlug: "pickles", price: 100, description: "Spicy green chilli pickle.", ingredients: "Green chilli, Oil, Mustard, Fenugreek", benefits: "Spicy, appetizing" },
  { id: "pk-6", name: "Mixed Pickle", category: "Pickles", categorySlug: "pickles", price: 130, description: "Mixed vegetable pickle.", ingredients: "Mango, Lime, Chilli, Carrot, Oil", benefits: "Variety of flavours" },
];

export const getProductsByCategory = (slug: string) => products.filter(p => p.categorySlug === slug);
export const getProductById = (id: string) => products.find(p => p.id === id);
export const getFeaturedProducts = () => products.slice(0, 8);
