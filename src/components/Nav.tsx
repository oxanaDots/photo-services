import { NavLink } from 'react-router-dom'


const Nav = () => {
  return (
    <nav >
    <ul className=' flex w-full  gap-10 p-6 justify-end text-stone-100 font-medium'>
        <li  >
           <NavLink 
           to='/signup'
           className={({ isActive }) => isActive? 'px-3 py-1 rounded-3xl border-2 border-lime-100 shadow-sm': "" }>
           Sign Up
          </NavLink>
        </li>

        <li >
           <NavLink to='/signin'
            className={({ isActive }) => isActive? 'px-3 py-1 rounded-3xl border-2 border-lime-100 shadow-sm': "" }>
       Sign In
          </NavLink>
        </li>

        <li >
           <NavLink to='/book'
            className={({ isActive }) => isActive? 'px-3 py-1 rounded-3xl border-2 border-lime-100 shadow-sm': "" }>
       Book
          </NavLink>
        </li>
    </ul>
    
    </nav>
  );
};

export default Nav;