import React, {useContext, useState, useEffect} from 'react';
import { User, Bell, Settings, LogOut, LogIn, Dumbbell } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import config from '../../config'

export const Header = () => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const { isAuthenticated, logout, user} = useContext(AuthContext);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const handleAuthClick = async () => {
        if (isAuthenticated) {
          const myHeaders = new Headers();
          myHeaders.append("Authorization", `Token ${user.token}`);
          const payload = {
            method: "POST",
            headers: myHeaders,
            redirect: "follow"
          };
          const response = await fetch(`${config.apiBaseUrl}/api/logout/`, payload);
          const data = await response.json();
          if (response.ok) {
            logout();
            navigate("/");
          }
          console.log("done", data);
          return;
        }
        navigate("/login");
      };
    return (
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white shadow-lg'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
              <img 
                src="/assets/raoBranding2.png" 
                alt="Rao Fitness Logo" 
                className="h-20 object-contain"
              />
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {['Home', 'About', 'Trainers', 'Classes', 'Pricing'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`font-medium transition-colors hover:text-blue-600 ${
                    isScrolled ? 'text-gray-700' : 'text-gray-700'
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
            onClick={handleAuthClick}>
              {isAuthenticated? 'Logout':'Get Started'}
            </button>
          </div>
        </div>
      </header>
    );
  };