import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import './Layout.css';

const Layout = () => {
    return (  
        <div className="layout">
            <Navbar/>
            <main className="layout-content">
                <Outlet/>
            </main>
        </div>
    );
};
 
export default Layout;