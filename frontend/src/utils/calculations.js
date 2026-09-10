export const calculateDiscountPercent = (price, discont_price) => {
  if (!discont_price) return null;
  return Math.round(((price - discont_price) / price) * 100);
};


export const getCurrentPrice = (price, discont_price) => {
  return discont_price ?? price;
};


export const getProductImages = (product) => {
  if (product.images) {
    return Array.isArray(product.images) ? product.images : [product.images];
  }
  return [product.image];
};


