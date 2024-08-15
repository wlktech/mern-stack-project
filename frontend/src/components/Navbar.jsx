import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
        <nav className='flex justify-between items-center p-5 shadow-lg'>
        <div>
            <h1 className="font-bold text-2xl text-green-500">
            MERN
            </h1>
        </div>
        <ul className='flex space-x-10'>
            <li>
            <Link className='hover:text-green-500' to={'/'}>Home</Link>
            </li>
            <li>
            <Link className='hover:text-green-500' to={'/about'}>About</Link>
            </li>
            <li>
            <Link className='hover:text-green-500' to={'/contact'}>Contact</Link>
            </li>
        </ul>
        </nav>
    </>
  )
}
