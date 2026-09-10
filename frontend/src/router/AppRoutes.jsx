import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import MainPage from "../pages/Main";
import CategoriesAll from "../pages/CatigoriesAll";
import CategoryProducts from "../pages/CategoryProducts";
import AllProducts from "../pages/AllProdukts";
import AllSales from "../pages/AllSales";
import ProductPage from "../pages/ProductPage";
import ShoppingCart from "../pages/ShoppingCart";
import NotFoundPage from "../pages/NotFoundPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="categories" element={<CategoriesAll />} />
        <Route path="categories/:id" element={<CategoryProducts />} />
        <Route path="all-products" element={<AllProducts />} />
        <Route path="all-sales" element={<AllSales />} />
        <Route path="products/:id" element={<ProductPage />} />
        <Route path="cart" element={<ShoppingCart />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
