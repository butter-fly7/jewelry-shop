import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./sections/Navbar";
import { Hero } from "./sections/Hero";
import { Categories } from "./sections/Categories";
import { HotProducts } from "./sections/HotProducts";
import { Promotions } from "./sections/Promotions";
import { Footer } from "./sections/Footer";
import { CategoryPage } from "./pages/CategoryPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CustomPage } from "./pages/CustomPage";

function HomePage() {
  return (
    <main>
      <Hero />
      <Categories />
      <HotProducts />
      <Promotions />
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:key" element={<CategoryPage />} />
          <Route path="/necklace" element={<CategoryPage />} />
          <Route path="/earring" element={<CategoryPage />} />
          <Route path="/ring" element={<CategoryPage />} />
          <Route path="/bracelet" element={<CategoryPage />} />
          <Route path="/set" element={<CategoryPage />} />
          <Route path="/new" element={<CategoryPage />} />
          <Route path="/product" element={<ProductDetailPage />} />
          <Route path="/custom" element={<CustomPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
