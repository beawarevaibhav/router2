import React from "react";

function Home({setCartCount}) {
    const handleAddToCart = () => {
        setCartCount(prevCount => prevCount + 1);
    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-5 w-72">
        <img
          src="https://via.placeholder.com/300x200"
          alt="Product"
          className="rounded-md mb-4 w-full h-40 object-cover"
        />
        <h2 className="text-lg font-semibold">Simple Product</h2>
        <p className="text-gray-600 text-sm mb-3">This is a simple product card example.</p>
        <div className="flex justify-between items-center">
          <span className="text-blue-500 font-bold">$49.99</span>
          <button onClick={handleAddToCart} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
