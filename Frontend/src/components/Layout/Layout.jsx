import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import './Layout.css';

const Layout = () => {
    const location = useLocation();
    const hideNavbar = location.pathname === '/login';
  
    return (
      <div className="layout">
        {!hideNavbar && <Navbar />}
        <main className={`layout-content ${hideNavbar ? 'no-navbar' : ''}`}>
            <Outlet />
        </main>
      </div>
    );
  };
  
 
export default Layout;