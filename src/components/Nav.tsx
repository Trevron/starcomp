import React from 'react'
import {Link} from 'react-router-dom';
import {ReactComponent as MenuIcon} from '../menu.svg'
import {ReactComponent as PlanetIcon} from '../globe.svg'
import {ReactComponent as SearchIcon} from '../search.svg'



export default function Nav() {
    const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
        <nav className="sticky top-0 flex flex-wrap items-center justify-between px-2 py-3 bg-slate-700 mb-3">
          
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              to="/starcomp/"
            >
              STARCOMP
            </Link>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <MenuIcon className="fas fa-bars"/>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  to="/search"
                >
                  <SearchIcon/><span className="ml-2">Search</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
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