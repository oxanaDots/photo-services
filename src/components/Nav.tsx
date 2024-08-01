import { NavLink } from 'react-router-dom'


const Nav = () => {
  return (
    <nav >
    <ul className=' flex w-full  gap-10 p-6 justify-center'>
        <li >
           <NavLink to='/signup'>
           Sign Up
          </NavLink>
        </li>

        <li >
           <NavLink to='/signin'>
       Sign In
          </NavLink>
        </li>

        <li >
           <NavLink to='/book'>
        Book
          </NavLink>
        </li>
    </ul>
    
    </nav>
  );
};

export default Nav;