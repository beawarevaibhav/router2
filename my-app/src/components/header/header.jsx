import React from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react';

function Header({cartCount}) {
  return (
    <>
      <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My App</h1>
        <nav>
             <div className="relative inline-block">
          <ShoppingCart size={28} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5">
              {cartCount}
            </span>
          )}
        </div>
             
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "mx-2 text-yellow-300 font-semibold underline" // ✅ active link style
                : "mx-2 hover:underline text-white"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "mx-2 text-yellow-300 font-semibold underline"
                : "mx-2 hover:underline text-white"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "mx-2 text-yellow-300 font-semibold underline"
                : "mx-2 hover:underline text-white"
            }
          >
            Contact
            
          </NavLink>
             
        </nav>
      </header>
    </>
  )
}

export default Header
