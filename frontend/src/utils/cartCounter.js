export const calculateTotalItemsCount = (items = []) => {
  return items.reduce((sum, item) => sum + item.count, 0);
};

export const calculateTotalPrice = (items = []) => {
  return items.reduce((sum, item) => {
    const price = item.discont_price ?? item.price;
    return sum + price * item.count;
  }, 0);
};