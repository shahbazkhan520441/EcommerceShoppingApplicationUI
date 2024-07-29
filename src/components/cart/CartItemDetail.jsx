import { Button, Card, Modal } from "flowbite-react";
import { useLocation, useNavigate } from "react-router-dom"
import Loading from "../loader/Loading";
import { useContext, useState } from "react";
import PopupWarn from "../popup/PopupWarn";
import axios from "axios";
import { AuthContext } from "../authprovider/AuthProvider";
import { HiOutlineArrowRight, HiOutlineShoppingBag } from "react-icons/hi";

function CartItemDetail() {
    let [isLoading, setIsLoading] = useState(false);
    let [popupOpen, setPopupOpen] = useState(false);
    let [openModal, setOpenModal] = useState(false);
    let [popupData, setPopupData] = useState("");
    let { isLogin } = useContext(AuthContext);
    let navigate = useNavigate();

    let location = useLocation();
    let product = location.state.product || {};
    let address = location.state.address || {};
    let quantity = location.state.quantity || 0;
    // console.log(product);
    // console.log(address);
    // console.log(`${product.productId || product.inventoryId}`)

    const productEle = [
        {
            title: "Description:",
            value: product.description || product.productDescription
        },
    ];

    const AddressEle = [
        {
            title: "Address:",
            value: `${address.streetAddress || ''}, 
                    ${address.streetAddressAdditional || ''}, 
                    ${address.city || ''}, ${address.state || ''}, 
                    ${address.country || ''}, Pincode : ${address.pincode || ''}`
        },
        {
            title: `${address.contacts?.[0]?.priority || 'Primary'} contact:`,
            value: address.contacts?.[0]?.contactNumber || 'N/A'
        },
        {
            title: `${address.contacts?.[1]?.priority || 'Secondary'} contact:`,
            value: address.contacts?.[1]?.contactNumber || 'N/A'
        },
    ];

    const PriceEle = [
        {
            title: "Product Price:",
            value: product.price || product.productPrice
        },
        {
            title: "Quantity:",
            value: quantity
        },
        {
            title: "Discount:",
            value: 0.0
        },
        {
            title: "GST:",
            value: 0.00
        },
        {
            title: "Total Price:",
            value: quantity * product.price || (quantity * product.productPrice)
        },
    ];

    let handleOrder = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/customers/${isLogin.userId}/addresses/${address.addressId}/products/${product.productId || product.inventoryId}/purchase-orders`,
                {
                    totalQuantity: quantity,
                    totalPrice: (quantity * product.price) || (quantity * product.productPrice),
                    discountPrice: 0.0,
                    totalPayableAmount: (quantity * product.price) || (quantity * product.productPrice)
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true // Includes cookies with the request
                }
            );
            console.log(response);
            setIsLoading(false);
            if (response.status === 201) {
                setTimeout(() => {
                    setPopupData(response.data.message);
                    setPopupOpen(true);
                    setOpenModal(true)
                }, 0);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);

            setTimeout(() => {
                setPopupData(error.response.data.message);
                setPopupOpen(true);
            }, 0);
        }
    }

    return (
        <>
            {isLoading && <Loading />}

            {popupOpen && <PopupWarn isOpen={popupOpen} width="w-[90%]"
                setIsOpen={setPopupOpen} clr="warning"
                head={popupData.message} msg={popupData} />}



            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineShoppingBag className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            {popupData}
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button onClick={() => setOpenModal(false)} outline pill>
                                OK
                            </Button>
                            <Button onClick={() => { setOpenModal(false), navigate("/orders") }} outline gradientDuoTone="tealToLime">
                                Check Orders
                                <HiOutlineArrowRight className="h-6 w-6" />
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>



            <h1 className="font-bold text-3xl m-2 text-pink-600 text-center">Preview Order : </h1>
            <Card className='max-w-sm ml-auto mr-auto mb-7'>
                <ul className="space-y-4">

                    <li className="flex justify-between space-x-3">
                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                            Product Name :
                        </span>
                        <span className="font-bold dark:text-white text-sm">{product.productTitle}</span>
                    </li>

                    {productEle.map((ele, index) => {
                        return <li key={index} className="flex justify-between space-x-3 ">
                            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                {ele.title}
                            </span>
                            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                {ele.value}
                            </span>
                        </li>
                    })}
                    <hr />
                    <li className="flex justify-between space-x-3">
                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                            Address Type:
                        </span>
                        <span className="font-bold dark:text-white text-sm">{address.addressType}</span>
                    </li>
                    {AddressEle.map((ele, index) => {
                        return <li key={index} className="flex justify-between space-x-3 ">
                            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                {ele.title}
                            </span>
                            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                {ele.value}
                            </span>
                        </li>
                    })}
                    <hr />
                    {PriceEle.map((ele, index) => {
                        return <li key={index} className="flex justify-between space-x-3 ">
                            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                {ele.title}
                            </span>
                            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                {ele.value}
                            </span>
                        </li>
                    })}

                    <li className="flex justify-between space-x-3">
                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                            Total Payable Amount :
                        </span>
                        <span className="font-bold dark:text-white text-lg">{quantity * product.price || quantity * product.productPrice} Rs/-</span>
                    </li>

                </ul>
                <div className="flex flex-wrap gap-3 justify-center">
                    <div>
                        <Button onClick={handleOrder} outline gradientDuoTone="greenToBlue" >
                            Order
                        </Button>
                    </div>
                    <div>
                        <Button outline gradientDuoTone="pinkToOrange" >
                            Cancel
                        </Button>
                    </div>
                    <div>
                        <Button onClick={()=>{window.print()}} outline gradientDuoTone="pinkToOrange" >
                            Print
                        </Button>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default CartItemDetail
