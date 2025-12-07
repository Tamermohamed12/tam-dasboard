export const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    products: 'Products',
    orders: 'Orders',
    customers: 'Customers',
    cart: 'Cart',
    transactions: 'Transactions',
    reviews: 'Reviews',
    statistics: 'Statistics',
    settings: 'Settings',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'Whole data about your business here',
    'dashboard.createReport': 'Create report',
    'dashboard.revenue': 'Revenue',
    'dashboard.orders': 'Orders',
    'dashboard.products': 'Products',
    'dashboard.monthlyEarning': 'Monthly Earning',
    'dashboard.saleStatistics': 'Sale statistics',
    'dashboard.revenueBaseOnArea': 'Revenue Base on Area',
    'dashboard.marketingChannel': 'Marketing Channel',
    
    // Products
    'products.title': 'Products',
    'products.search': 'Search products...',
    'products.totalProducts': 'Total Products',
    'products.inStock': 'In Stock',
    'products.categories': 'Categories',
    'products.averageRating': 'Average Rating',
    'products.addToCart': 'Add to Cart',
    'products.outOfStock': 'Out of Stock',
    'products.noResults': 'No products found matching your search.',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.retry': 'Retry',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.search': 'Search',
    'common.previous': 'Previous',
    'common.next': 'Next',
    'common.page': 'Page',
    'common.of': 'of',
  },
  
  ar: {
    // Navigation
    dashboard: 'لوحة التحكم',
    products: 'المنتجات',
    orders: 'الطلبات',
    customers: 'العملاء',
    cart: 'السلة',
    transactions: 'المعاملات',
    reviews: 'التقييمات',
    statistics: 'الإحصائيات',
    settings: 'الإعدادات',
    
    // Dashboard
    'dashboard.title': 'لوحة التحكم',
    'dashboard.subtitle': 'جميع البيانات حول عملك هنا',
    'dashboard.createReport': 'إنشاء تقرير',
    'dashboard.revenue': 'الإيرادات',
    'dashboard.orders': 'الطلبات',
    'dashboard.products': 'المنتجات',
    'dashboard.monthlyEarning': 'الأرباح الشهرية',
    'dashboard.saleStatistics': 'إحصائيات المبيعات',
    'dashboard.revenueBaseOnArea': 'الإيرادات حسب المنطقة',
    'dashboard.marketingChannel': 'قناة التسويق',
    
    // Products
    'products.title': 'المنتجات',
    'products.search': 'البحث عن المنتجات...',
    'products.totalProducts': 'إجمالي المنتجات',
    'products.inStock': 'متوفر',
    'products.categories': 'الفئات',
    'products.averageRating': 'متوسط التقييم',
    'products.addToCart': 'أضف إلى السلة',
    'products.outOfStock': 'غير متوفر',
    'products.noResults': 'لم يتم العثور على منتجات تطابق بحثك.',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.retry': 'إعادة المحاولة',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.search': 'بحث',
    'common.previous': 'السابق',
    'common.next': 'التالي',
    'common.page': 'صفحة',
    'common.of': 'من',
  },
  
  de: {
    // Navigation
    dashboard: 'Dashboard',
    products: 'Produkte',
    orders: 'Bestellungen',
    customers: 'Kunden',
    cart: 'Warenkorb',
    transactions: 'Transaktionen',
    reviews: 'Bewertungen',
    statistics: 'Statistiken',
    settings: 'Einstellungen',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'Alle Daten zu Ihrem Unternehmen hier',
    'dashboard.createReport': 'Bericht erstellen',
    'dashboard.revenue': 'Umsatz',
    'dashboard.orders': 'Bestellungen',
    'dashboard.products': 'Produkte',
    'dashboard.monthlyEarning': 'Monatliches Einkommen',
    'dashboard.saleStatistics': 'Verkaufsstatistiken',
    'dashboard.revenueBaseOnArea': 'Umsatz nach Region',
    'dashboard.marketingChannel': 'Marketingkanal',
    
    // Products
    'products.title': 'Produkte',
    'products.search': 'Produkte suchen...',
    'products.totalProducts': 'Gesamtprodukte',
    'products.inStock': 'Auf Lager',
    'products.categories': 'Kategorien',
    'products.averageRating': 'Durchschnittliche Bewertung',
    'products.addToCart': 'In den Warenkorb',
    'products.outOfStock': 'Nicht vorrätig',
    'products.noResults': 'Keine Produkte gefunden, die Ihrer Suche entsprechen.',
    
    // Common
    'common.loading': 'Lädt...',
    'common.error': 'Fehler',
    'common.retry': 'Wiederholen',
    'common.save': 'Speichern',
    'common.cancel': 'Abbrechen',
    'common.edit': 'Bearbeiten',
    'common.delete': 'Löschen',
    'common.search': 'Suchen',
    'common.previous': 'Zurück',
    'common.next': 'Weiter',
    'common.page': 'Seite',
    'common.of': 'von',
  },
};

// Helper function to get translation
export const getTranslation = (language, key) => {
  return translations[language]?.[key] || key;
};

