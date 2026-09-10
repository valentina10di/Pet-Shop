import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice'; 

export const useChangeColorButton = () => {
  const dispatch = useDispatch();
  const [addedProductIds, setAddedProductIds] = useState([]);
  const [hiddenProductIds, setHiddenProductIds] = useState([]);

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    dispatch(addToCart(product));

    if (!addedProductIds.includes(product.id)) {
      setAddedProductIds((prev) => [...prev, product.id]);
    }

    setTimeout(() => {
      setHiddenProductIds((prev) => [...prev, product.id]);
      setAddedProductIds((prev) => prev.filter((id) => id !== product.id));
    }, 1000);
  };

  return {
    handleAddToCart,
    addedProductIds,
    hiddenProductIds,
  };
};