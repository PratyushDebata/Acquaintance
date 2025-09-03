// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { FiHeart, FiShoppingCart, FiSearch } from "react-icons/fi";

const dummyProducts = [
  { id: 1, name: "Classic Shirt", category: "Shirts", image: "https://source.unsplash.com/300x400/?shirt", price: 45 },
  { id: 2, name: "Casual T-Shirt", category: "T-Shirts", image: "https://source.unsplash.com/300x400/?tshirt", price: 25 },
  { id: 3, name: "Warm Hoodie", category: "Hoodies", image: "https://source.unsplash.com/300x400/?hoodie", price: 60 },
  { id: 4, name: "Soft Sweatshirt", category: "Sweatshirts", image: "https://source.unsplash.com/300x400/?sweatshirt", price: 50 },
  { id: 5, name: "Wool Sweater", category: "Sweaters", image: "https://source.unsplash.com/300x400/?sweater", price: 70 },
];

function Navbar({ cart, wishlist, setSearch }) {
  return (
    <nav className="bg-navy text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">AQUINTANCE</Link>
      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/collections">Collections</Link>
        <Link to="/shop">Shop by Category</Link>
      </div>
      <div className="flex gap-4 items-center">
        <input 
          type="text" 
          placeholder="Search..." 
          className="px-2 py-1 rounded text-black"
          onChange={(e)=> setSearch(e.target.value)}
        />
        <Link to="/wishlist"><FiHeart size={22} /></Link>
        <Link to="/cart"><FiShoppingCart size={22} /> ({cart.length})</Link>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <div className="p-6">
      <section className="bg-orange-600 text-white text-center py-20 rounded-xl mb-10">
        <h1 className="text-4xl font-bold">DISCOVER INDIAN DESIGN</h1>
        <p className="mt-4">Blending Australian spirit with Indian craftsmanship</p>
        <button className="mt-6 bg-white text-orange-600 px-6 py-2 rounded-full font-semibold">Shop Now</button>
      </section>
      <section className="grid md:grid-cols-2 gap-10 my-10">
        <div>
          <h2 className="text-2xl font-bold mb-3">Our Ideology</h2>
          <p>
            We are committed to blending contemporary Australian fashion with traditional Indian designs. 
            Our collection showcases the beauty and versatility of Indian motifs and craftsmanship, offering unique and timeless pieces.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-3">Our Story</h2>
          <p>
            Established in 2025, Aquintance was inspired by the rich cultural heritage of India and the modern spirit of Australia. 
            Our mission is to create a unique fusion of styles that celebrates diversity and craftsmanship.
          </p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-5">Collections</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-4 rounded-xl text-center">
            <img src="https://source.unsplash.com/300x300/?fashion" alt="collection" className="rounded-xl mb-3"/>
            <h3 className="font-semibold">Autumn Blooms</h3>
          </div>
          <div className="bg-gray-100 p-4 rounded-xl text-center">
            <img src="https://source.unsplash.com/300x300/?clothing" alt="collection" className="rounded-xl mb-3"/>
            <h3 className="font-semibold">Festive Collection</h3>
          </div>
          <div className="bg-gray-100 p-4 rounded-xl text-center">
            <img src="https://source.unsplash.com/300x300/?style" alt="collection" className="rounded-xl mb-3"/>
            <h3 className="font-semibold">Summer Collection</h3>
          </div>
        </div>
      </section>
    </div>
  );
}

function Collections() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Our Collections</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gray-100 p-4 rounded-xl text-center">Drop 1 - Fusion Wear</div>
        <div className="bg-gray-100 p-4 rounded-xl text-center">Drop 2 - Street Meets Tradition</div>
        <div className="bg-gray-100 p-4 rounded-xl text-center">Drop 3 - The Modern Heritage</div>
      </div>
    </div>
  );
}

function Shop({ cart, setCart, wishlist, setWishlist, search }) {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {dummyProducts
          .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
          .map(product => (
          <div key={product.id} className="bg-gray-100 p-4 rounded-xl text-center">
            <img src={product.image} alt={product.name} className="rounded-xl mb-3"/>
            <h3 className="font-semibold">{product.name}</h3>
            <p>${product.price}</p>
            <div className="flex justify-center gap-3 mt-3">
              <button onClick={()=> setCart([...cart, product])} className="bg-navy text-white px-3 py-1 rounded">Add to Cart</button>
              <button onClick={()=> setWishlist([...wishlist, product])} className="bg-orange-600 text-white px-3 py-1 rounded">♥</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Cart({ cart }) {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
      {cart.length === 0 ? <p>No items in cart</p> :
      <ul>{cart.map((c,i)=><li key={i}>{c.name} - ${c.price}</li>)}</ul>}
    </div>
  );
}

function Wishlist({ wishlist }) {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Your Wishlist</h2>
      {wishlist.length === 0 ? <p>No items in wishlist</p> :
      <ul>{wishlist.map((w,i)=><li key={i}>{w.name}</li>)}</ul>}
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Navbar cart={cart} wishlist={wishlist} setSearch={setSearch}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/collections" element={<Collections/>}/>
        <Route path="/shop" element={<Shop cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} search={search}/>}/>
        <Route path="/cart" element={<Cart cart={cart}/>}/>
        <Route path="/wishlist" element={<Wishlist wishlist={wishlist}/>}/>
      </Routes>
    </Router>
  );
}

// Tailwind config: add in tailwind.config.js
// theme: { extend: { colors: { navy: '#001f54', orange: '#ff6f3c' } } }

