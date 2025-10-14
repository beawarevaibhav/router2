import React from 'react'
import {NavLink } from 'react-router-dom'

function Header() {
    return (
        <>
            <header className='bg-blue-500 text-white p-4 flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>My App</h1>
                <nav >
                    <NavLink to="/" className="mx-2 hover:underline text-white" end>Home</NavLink>
                    <NavLink to="/about" className="mx-2 hover:underline text-white">About</NavLink>
                    <NavLink to="/contact" className="mx-2 hover:underline text-white">Contact</NavLink>
                </nav>
            </header>   
        </>
    )
}

export default Header
