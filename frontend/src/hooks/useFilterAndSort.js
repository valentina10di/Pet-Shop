import { useState, useMemo } from 'react';

export function useFilterAndSort(products = [], options = {}) {
  const { forceDiscounted = false } = options;

  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [sortOption, setSortOption] = useState('default');

  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter((product) => {
        const currentPrice = product.discont_price ?? product.price;
        
        if (priceFrom && currentPrice < Number(priceFrom)) return false;
        if (priceTo && currentPrice > Number(priceTo)) return false;
        
        
        if (!forceDiscounted && onlyDiscounted && !product.discont_price) return false;
        
        return true;
      })
      .sort((a, b) => {
        const priceA = a.discont_price ?? a.price;
        const priceB = b.discont_price ?? b.price;

        if (sortOption === 'price-low-high') return priceA - priceB;
        if (sortOption === 'price-high-low') return priceB - priceA;
        if (sortOption === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
        return 0;
      });
  }, [products, priceFrom, priceTo, onlyDiscounted, sortOption, forceDiscounted]);

  return {
    priceFrom,
    setPriceFrom,
    priceTo,
    setPriceTo,
    onlyDiscounted,
    setOnlyDiscounted,
    sortOption,
    setSortOption,
    filteredAndSortedProducts,
  };
}