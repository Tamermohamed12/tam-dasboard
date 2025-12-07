import React, { useState, useEffect } from 'react';
import '../../components/products/Products.css';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';

const Products = () => {
  const { language } = useLanguage();
  const t = (key) => translations[language]?.[key] || key;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const itemsPerPage = 12;
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Fetch 200 products from DummyJSON API
      const response = await fetch('https://dummyjson.com/products?limit=200');
      const data = await response.json();
      
      if (data.products && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        throw new Error('Invalid data format');
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      category: product.category,
      brand: product.brand
    });
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <span className="stars">
        {'★'.repeat(fullStars)}
        {hasHalfStar && '½'}
        {'☆'.repeat(emptyStars)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>{t('common.loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{t('common.error')}: {error}</p>
        <button onClick={fetchProducts}>{t('common.retry')}</button>
      </div>
    );
  }

  return (
    <div className="products-container">
      <div className="products-header">
        <h2>{t('products.title')}</h2>
        <div className="products-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder={t('products.search')}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <select
            className="category-filter"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="products-stats">
        <div className="stat-card">
          <h3>{t('products.totalProducts')}</h3>
          <p>{products.length}</p>
        </div>
        <div className="stat-card">
          <h3>{t('products.inStock')}</h3>
          <p>{products.reduce((sum, p) => sum + (p.stock || 0), 0)}</p>
        </div>
        <div className="stat-card">
          <h3>{t('products.categories')}</h3>
          <p>{categories.length - 1}</p>
        </div>
        <div className="stat-card">
          <h3>{t('products.averageRating')}</h3>
          <p>{(products.reduce((sum, p) => sum + (p.rating || 0), 0) / products.length).toFixed(1)}</p>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-results">
          <p>{t('products.noResults')}</p>
        </div>
      ) : (
        <>
          <div className="products-grid">
            {paginatedProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img 
                    src={product.thumbnail || product.images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image'} 
                    alt={product.title}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                    }}
                  />
                  {product.discountPercentage && product.discountPercentage > 0 && (
                    <span className="discount-badge">
                      -{Math.round(product.discountPercentage)}%
                    </span>
                  )}
                </div>
                <div className="product-info">
                  <div className="product-category">{product.category || 'General'}</div>
                  <h3>{product.title}</h3>
                  {product.brand && (
                    <div className="product-brand">{product.brand}</div>
                  )}
                  {product.rating && (
                    <div className="product-rating">
                      {renderStars(product.rating)}
                      <span>({product.rating})</span>
                    </div>
                  )}
                  {product.stock !== undefined && (
                    <div className="stock">In Stock: {product.stock}</div>
                  )}
                  <div className="product-price">
                    <span className="current-price">${product.price?.toFixed(2) || '0.00'}</span>
                    {product.discountPercentage && product.discountPercentage > 0 && (
                      <span className="original-price">
                        ${((product.price || 0) / (1 - product.discountPercentage / 100)).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? t('products.outOfStock') : t('products.addToCart')}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                {t('common.previous')}
              </button>
              <span>{t('common.page')} {currentPage} {t('common.of')} {totalPages}</span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                {t('common.next')}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
