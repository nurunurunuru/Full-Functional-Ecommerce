import React from 'react'
import { BsCollectionFill } from 'react-icons/bs'
import { FaRegWindowClose } from 'react-icons/fa'
import { SiAtlassian, SiGooglehome, SiMaildotcom } from 'react-icons/si'
import { Link, NavLink } from 'react-router'

const Navbar = ({containerStyles,toggleMenu,menuOpened}) => {

  const navItems = [
    {to: "/", label: "Home", icon: <SiGooglehome/>},
    {to: "/collection", label: "Collection", icon: <BsCollectionFill/>},
    {to: "/about", label: "About", icon: <SiAtlassian/>},
    {to: "/mailto:nursajid1200@gmail.com", label: "Contact", icon: <SiMaildotcom/>},
  ]
  return (
    <nav className={containerStyles}>
      {menuOpened && (
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="text-2xl font-bold text-cyan-500">
            Shoppire
          </Link>
          <FaRegWindowClose
  onClick={toggleMenu} // Correct prop name
  className="text-2xl self-end reltive left-8 cursor-pointer text-gray-500"
/>

        </div>
      )}
      <div className="xl:flex gap-x-8"> {/* Add flex row and gap between items */}
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-x-4 text-cyan-500 font-semibold py-2"
                : "flex items-center gap-x-4 text-gray-700 hover:text-cyan-500 py-2"
            }
          >
            {icon}
            <h5 className='medium-16'>{label}</h5>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default Navbar