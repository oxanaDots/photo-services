import { NavLink } from 'react-router-dom'
import React from 'react'


const Nav: React.FC = () => {
  return (
    <div className='p-6 flex items-stretch justify-between w-full'>
      <h3 className='justify-self-start font-BGsans font-semibold text-green-700 text-lg'>Music Photographers' Platform</h3>
    <nav >
    <ul className=' flex w-full  gap-10 font-normal text-stone-700
'>
        <li  >
           <NavLink 
           to='/signup'
           className={({ isActive }) => isActive? 'px-4 py-2  rounded-3xl border border-stone-500 shadow-md': "" }>
           Sign Up
          </NavLink>
        </li>

        <li >
           <NavLink to='/signin'
            className={({ isActive }) => isActive? 'px-4 py-2  rounded-3xl border border-stone-500 shadow-md': "" }>
       Sign In
          </NavLink>
        </li>

        <li >
           <NavLink to='/book'
            className={({ isActive }) => isActive? 'px-4 py-2  rounded-3xl border border-stone-500 shadow-md': "" }>
       Book
          </NavLink>
        </li>
    </ul>
    
    </nav>
    </div>
  );
};

export default Nav;