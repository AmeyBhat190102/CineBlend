import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useSelector} from 'react-redux/es/hooks/useSelector'

import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons from React Icons library

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const refreshEmailLogout = () =>{
    dispatch({
      type:"setEmail",
      payload : ""
    })
    dispatch({
      type: "setLoggedInLoggedOut"
    })
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const {username} = useSelector(state => state.customReducer)
  
  return (
    <div className='flex flex-col md:flex-row items-center justify-between p-4 w-full bg-gray-900'>
      <div className="container mx-auto flex justify-between items-center">
        <button className="text-white text-4xl font-bold cursor-pointer" onClick={() => navigate("/home")}>CINEBLEND</button>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          {isMobileMenuOpen ? (
            <button className="text-white" onClick={closeMobileMenu}>
              <FaTimes />
            </button>
          ) : (
            <button className="text-white" onClick={toggleMobileMenu}>
              <FaBars />
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden text-center">
          {/* Render mobile menu items in a column */}
          <div className="flex flex-col space-y-4 mt-2">
            <button className="text-white" onClick={() => { navigate('/home/moviesSearch'); }}>Search</button>
            <button className="text-white" onClick={() => { navigate('/home/moviesRows'); }}>Browse</button>
            <button className="text-white" onClick={() => { navigate('/home/myAccount'); }}>{username}</button>
            <button className="text-white" onClick={() => { refreshEmailLogout(); navigate('/'); }}>Logout</button>
          </div>
        </div>   
      )}
      {/* Desktop menu */}
      <div className={`hidden md:flex space-x-4 ${isMobileMenuOpen ? 'hidden' : ''}`}>
          <button className="text-white" onClick={() => { navigate('/home/moviesSearch'); }}>Search</button>
          <button className="text-white" onClick={() => { navigate('/home/moviesRows'); }}>Browse</button>
          <button className="text-white" onClick={() => { navigate('/home/myAccount'); }}>{username}</button>
          <button className="text-white" onClick={() => { refreshEmailLogout(); navigate('/'); }}>Logout</button>
        </div>
      
    </div>

  )
}

export default Navbar

