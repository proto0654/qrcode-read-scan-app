import { Link } from "react-router-dom"
import NavigationStyle from "./NavigationStyle.module.css"
import { useState } from "react"

export const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    
    return (
        <>
            {/* Десктопное меню */}
            <nav className={NavigationStyle.desktopNav}>
                <Link to="/">Главная</Link>
                <Link to="/generate">Генерация</Link>
                <Link to="/scan">Сканирование</Link>
                <Link to="/generate-history">История генераций</Link>
                <Link to="/scan-history">История сканирований</Link>
            </nav>

            {/* Мобильное меню */}
            <nav className={NavigationStyle.mobileNav}>
                <div className={NavigationStyle.mobileTopBar}>
                    <Link to="/" className={NavigationStyle.homeLink}>Главная</Link>
                    <button 
                        className={NavigationStyle.menuButton} 
                        onClick={toggleMenu}
                        aria-label="Открыть меню"
                    >
                        <div className={`${NavigationStyle.burgerIcon} ${menuOpen ? NavigationStyle.open : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                </div>
                
                <div className={`${NavigationStyle.mobileLinks} ${menuOpen ? NavigationStyle.menuOpen : ''}`}>
                    <Link to="/generate" onClick={() => setMenuOpen(false)}>Генерация</Link>
                    <Link to="/scan" onClick={() => setMenuOpen(false)}>Сканирование</Link>
                    <Link to="/generate-history" onClick={() => setMenuOpen(false)}>История генераций</Link>
                    <Link to="/scan-history" onClick={() => setMenuOpen(false)}>История сканирований</Link>
                </div>
            </nav>
        </>
    )
}
    