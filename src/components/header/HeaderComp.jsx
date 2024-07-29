import { useContext, useState } from 'react';
import { faBoxOpen, faCartShopping, faSearch, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar, TextInput } from "flowbite-react";
import DarkModeOption from "../darkmode/DarkModeOption";
import "./HeaderComp.css"
import "./UserData.css"
import UserData from './UserData';
import logo from "../../images/logo.png"
import { NavLink, useLocation } from 'react-router-dom';
import MoreOptionNav from './MoreOptionNav';
import { AuthContext } from '../authprovider/AuthProvider';
import NetworkStatus from "../network/NetworkStatus"

function HeaderComp() {
    const { isLogin } = useContext(AuthContext);
    let [isSearchVisible, setIsSearchVisible] = useState(false);
    const location = useLocation();

    let handleSearchIconClick = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    return (
        <>
            <Navbar fluid className='bg-slate-200'>
                <NavLink to='/' className='flex items-center navlogo'>
                    {/* <Navbar.Link active={location.pathname === "/"} as="div"> */}
                    {/* <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg" width="160" height="40" title="Flipkart" alt="Flipkart" /> */}
                    <img src={logo} alt="EcommerceShoppingApp" width="47" height="40" title="EcommerceShoppingApp" />
                    <span className="self-center sitename dark:text-white text-xl font-semibold break-words md:whitespace-normal">Ecommerce Shopping App <NetworkStatus /> </span>
                    {/* </Navbar.Link> */}
                </NavLink>
                <div className="flex md:order-1 md:w-1/4">
                    <Navbar.Toggle />
                    <button onClick={handleSearchIconClick} className="md:hidden p-2 dark:text-white">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                    <div className={`w-full ${isSearchVisible ? 'block' : 'hidden'} md:block`}>
                        <TextInput className="w-full" placeholder="Search Products" />
                    </div>
                </div>
                <Navbar.Collapse className="md:order-2">
                    <UserData />

                    <NavLink to="/cart" className="text-base">
                        <Navbar.Link active={location.pathname === "/cart"} as="div">
                            <FontAwesomeIcon icon={faCartShopping} />
                            &nbsp;Cart
                        </Navbar.Link>
                    </NavLink>

                    <NavLink to={(isLogin === null || isLogin.userRole === 'CUSTOMER') ? "/become-a-seller" : "/sellers"} className='text-base'>
                        <Navbar.Link active={location.pathname === "/become-a-seller"} as="div">
                            {(isLogin === null || isLogin.userRole === 'CUSTOMER') ?
                                <><FontAwesomeIcon icon={faBoxOpen} /> Become a Seller</> :
                                <><FontAwesomeIcon icon={faWarehouse} /> Storage</>}
                        </Navbar.Link>
                    </NavLink>

                    <div className='navbtn mt-auto mb-auto dark:text-slate-400 hover:dark:text-slate-100'>
                        <DarkModeOption />
                    </div>

                    <MoreOptionNav />
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default HeaderComp;
