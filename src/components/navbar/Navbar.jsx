import { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu, AiOutlineDown } from 'react-icons/ai';
import RealLogo from '/assets/logo.webp';
import './navbar.css';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        // Ensure menu is closed on initial load
        setIsOpen(false);
    }, []);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev); // Toggling the menu open/close state
    };

    const closeMenu = () => {
        setIsOpen(false);
        setIsDropdownOpen(false); // Close dropdown when closing menu
    };

    const toggleDropdown = (event) => {
        event.preventDefault(); // Prevent anchor default action
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Handle scroll event to adjust navbar opacity
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className="header">
            <nav className={`navbar text-white text-xl ${isScrolled ? 'scrolled' : ''}`}>
                <a href="/" className="nav-logo" onClick={closeMenu}>
                    <img src={RealLogo} alt="Logo" className="logo" />
                </a>
                <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    <li className="nav-item">
                        <a href="/" className="nav-a" onClick={closeMenu}>Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="/about" className="nav-a" onClick={closeMenu}>About</a>
                    </li>
                    <li className="nav-item">
                        <a href="/connect" className="nav-a" onClick={closeMenu}>Connect</a>
                    </li>
                    <li className="nav-item">
                        <a href="/events" className="nav-a" onClick={closeMenu}>Events</a>
                    </li>
                    <li className="nav-item">
                        <a href="/service-recap" className="nav-a" onClick={closeMenu}>Service-Recap</a>
                    </li>
                    <li className="nav-item">
                        <a href="/give" className="nav-a" onClick={closeMenu}>Give</a>
                    </li>
                    <li className="nav-item location-item">
                        <a href="/locations" className="nav-a" onClick={closeMenu}>
                            Locations
                        </a>
                        <span className="dropdown-icon-wrapper" onClick={toggleDropdown}>
                            <AiOutlineDown className={`dropdown-icon ${isDropdownOpen ? 'rotate' : ''}`} />
                        </span>
                        {isDropdownOpen && (
                            <div className="dropdown-menu mt-4">
                                <a href="/locations/calgary" className="dropdown-a" onClick={closeMenu}>Calgary</a>
                                <a href="/locations/toronto" className="dropdown-a" onClick={closeMenu}>Toronto</a>
                                <a href="/locations/vancouver" className="dropdown-a" onClick={closeMenu}>Vancouver</a>
                            </div>
                        )}
                    </li>
                </ul>
                <div className="hamburger" onClick={toggleMenu}>
                    {isOpen ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
                </div>
            </nav>
        </header>
    );
};

export default NavBar;
