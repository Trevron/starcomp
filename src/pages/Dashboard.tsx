import React from 'react'
import DashboardCard from '../components/DashboardCard';
import {ReactComponent as PlanetIcon} from '../img/globe_big.svg'
import {ReactComponent as SearchIcon} from '../img/search_big.svg'
import { Link } from 'react-router-dom';



const Dashboard = () => {
  return (
    <div className="flex h-3/4 justify-center gap-10 md:flex-row flex-col items-center">
        <Link to="/myplanets">
            <DashboardCard name="My Planets" icon={<PlanetIcon />}/>
        </Link>
        <Link to="/search">
            <DashboardCard name="Search" icon={<SearchIcon />}/>
        </Link>
    </div>
  )
}

export default Dashboard;