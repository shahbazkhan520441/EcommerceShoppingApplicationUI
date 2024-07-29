import CustomerRegistration from "../auth/CustomerRegistration";
import LoginForm from "../auth/LoginForm";
import LogoutAlert from "../auth/LogoutAlert";
import SellerRegistration from "../auth/SellerRegistration";
import CustomerComp from "../customer/CustomerComp";
import ErrorPage from "../errorpage/ErrorPage";
import BecomeASeller from "../navbarpage/BecomeASeller";
import CartComp from "../navbarpage/CartComp";
import GiftCardComp from "../navbarpage/GiftCardComp";
import HomePage from "../navbarpage/HomePage";
import OrderComp from "../navbarpage/OrderComp";
import ProductInfo from "../navbarpage/ProductInfo";
import RewardComp from "../navbarpage/RewardComp";
import SuperCoinZone from "../navbarpage/SuperCoinZone";
import WishListComp from "../navbarpage/WishListComp";
import AddProduct from "../seller/product/AddProduct";
import ProductBySeller from "../seller/product/ProductBySeller";
import SellerComp from "../seller/SellerComp";
import Storage from "../seller/storage/Storage";
import WareHouse from "../seller/WareHouse";
import ProfilePage from "../userinfo/ProfilePage";
import StoragesByWareHouses from "../seller/storage/StoragesByWareHouses";
import ProductInfoSeller from "../seller/product/ProductInfoSeller";
import UpdateProduct from "../seller/product/ProductUpdate";
import AddAddress from "../userinfo/AddAddress";
import UpdateAddress from "../userinfo/UpdateAddress";
import UpdateUser from "../userinfo/UpdateUser";
import AddContact from "../userinfo/AddContact";
import UpdateContact from "../userinfo/UpdateContact";
import OrderAddress from "../cart/OrderAddress";
import CartItemDetail from "../cart/CartItemDetail";

export const RouteComps = [
    {
        element: <CartComp />,
        path: "cart",
        isPrivate: true,
        isVisibleAfterLogin: true,
        role: ["CUSTOMER", "SELLER"]
    },
    {
        element: <OrderAddress />,
        path: "cart/addresses",
        isPrivate: true,
        isVisibleAfterLogin: true,
        role: ["CUSTOMER"]
    },
    {
        element: <CartItemDetail />,
        path: "cart/addresses/order-preview",
        isPrivate: true,
        isVisibleAfterLogin: true,
        role: ["CUSTOMER"]
    },
    {
        element: <LogoutAlert />,
        path: "logout",
        isPrivate: true,
        isVisibleAfterLogin: true,
        role: ["CUSTOMER", "SELLER"]
    },
    {
        element: <ProfilePage />,
        path: "profile-page",
        isPrivate: true,
        isVisibleAfterLogin: true,
        role: ["CUSTOMER", "SELLER"]
    },
    {
        element: <UpdateUser />,
        path: "profile-page/update-profile",
        isPrivate: true,
        isVisibleAfterLogin: true,
        role: ["CUSTOMER", "SELLER"]
    },
    {
        element: <AddAddress />,
        path: "profile-page/add-address",
        isPrivate: true,
        isVisibleAfterLogin: true,
        role: ["CUSTOMER", "SELLER"]
    },
    {
        element: <UpdateAddress />,
        path: "profile-page/update-address",
        isPrivate: true,
        isVisibleAfterLogin: true,
        role: ["CUSTOMER", "SELLER"]
    },
    {
        element: <AddContact />,
        path: "profile-page/addresses/add-contact/:addressId",
        isPrivate: true,
        isVisibleAfterLogin: true,
        role: ["CUSTOMER", "SELLER"]
    },
    {
        element: <UpdateContact />,
        path: "profile-page/addresses/update-contact",
        isPrivate: true,
        isVisibleAfterLogin: true,
        role: ["CUSTOMER", "SELLER"]
    },
    {
        element: <SuperCoinZone />,
        path: "super-coin-zone",
        isPrivate: true,
        isVisibleAfterLogin: true,
        role: ["CUSTOMER", "SELLER"]
    },
    {
        element: <OrderComp />,
        path: "orders",
        isPrivate: true,
        isVisibleAfterLogin: true,
        role: ["CUSTOMER", "SELLER"]
    },
    {
        element: <WishListComp />,
        path: "wish-list",
        isPrivate: true,
        isVisibleAfterLogin: true,
        role: ["CUSTOMER", "SELLER"]
    },
    {
        element: <RewardComp />,
        path: "rewards",
        isPrivate: true,
        isVisibleAfterLogin: true,
        role: ["CUSTOMER", "SELLER"]
    },
    {
        element: <GiftCardComp />,
        path: "gift-cards",
        isPrivate: true,
        isVisibleAfterLogin: true,
        role: ["CUSTOMER", "SELLER"]
    },
    {
        element: <CustomerComp />,
        path: "customers",
        isPrivate: true,
        isVisibleAfterLogin: true,
        role: ["CUSTOMER"]
    },
    {
        element: <SellerComp />,
        path: "sellers",
        isPrivate: true,
        isVisibleAfterLogin: true,
        role: ["SELLER"]
    },
    {
        element: <WareHouse />,
        path: "sellers/wareHouses",
        isPrivate: true,
        isVisibleAfterLogin: true,
        role: ["SELLER"]
    },
    {
        element: <Storage />,
        path: "sellers/storages",
        isPrivate: true,
        isVisibleAfterLogin: true,
        role: ["SELLER"]
    },
    {
        element: <StoragesByWareHouses />,
        path: "sellers/warehouses/:wareHouseId/storages",
        isPrivate: true,
        isVisibleAfterLogin: true,
        role: ["SELLER"]
    },
    {
        element: <ProductBySeller />,
        path: "sellers/products",
        isPrivate: true,
        isVisibleAfterLogin: true,
        role: ["SELLER"]
    },
    {
        element: <ProductInfoSeller />,
        path: "sellers/products/product-info/:productId",
        isPrivate: true,
        isVisibleAfterLogin: true,
        role: ["SELLER"]
    },
    {
        element: <AddProduct />,
        path: "sellers/products/add-product/:storageId",
        isPrivate: true,
        isVisibleAfterLogin: true,
        role: ["SELLER"]
    },
    {
        element: <UpdateProduct />,
        path: "sellers/products/update-product/:productId",
        isPrivate: true,
        isVisibleAfterLogin: true,
        role: ["SELLER"]
    },



    {
        element: <BecomeASeller />,
        path: "become-a-seller",
        isPrivate: false,
        isVisibleAfterLogin: true,
        role: ["CUSTOMER"]
    },
    {
        element: <HomePage />,
        path: "",
        isPrivate: false,
        isVisibleAfterLogin: true,
        role: []
    },
    {
        element: <CustomerRegistration />,
        path: "customer-registration",
        isPrivate: false,
        isVisibleAfterLogin: false,
        role: []
    },
    {
        element: <SellerRegistration />,
        path: "seller-registration",
        isPrivate: false,
        isVisibleAfterLogin: false,
        role: []
    },
    {
        element: <LoginForm />,
        path: "login-form",
        isPrivate: false,
        isVisibleAfterLogin: false,
        role: []
    },
    {
        element: <ProductInfo />,
        path: "products/:pid",
        isPrivate: false,
        isVisibleAfterLogin: true,
        role: []
    },







    {
        element: <ErrorPage />,
        path: "*",
        isPrivate: false,
        isVisibleAfterLogin: true,
        role: []
    },

]