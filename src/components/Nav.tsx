import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import {ReactComponent as MenuIcon} from '../img/menu.svg'
import {ReactComponent as PlanetIcon} from '../img/globe.svg'
import {ReactComponent as SearchIcon} from '../img/search.svg'

/**
 *  Navigation bar component
 */

function Nav() {
    const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <>
        <nav className="sticky top-0 flex flex-wrap items-center justify-between px-2 py-3 bg-slate-700 mb-3 text-gray-50">
          
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between md:w-auto md:static md:block md:justify-start">
            <Link
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase hover:text-amber-400"
              to="/starcomp/"
            >
              STARCOMP
            </Link>
            <button
              className="hover:text-amber-400 cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <MenuIcon />
            </button>
          </div>
          <div
            className={
              "md:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
          >
            <ul className="flex flex-col md:flex-row list-none md:ml-auto">
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug hover:text-amber-400"
                  to="/search"
                >
                  <SearchIcon/><span className="ml-2">Search</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug hover:text-amber-400"
                  to="/myplanets"
                >
                  <PlanetIcon/> <span className="ml-2">My Planets</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
      </nav>
    </>
  )
}

export default Nav;