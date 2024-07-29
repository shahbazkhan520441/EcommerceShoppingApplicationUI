import axios from "axios";
import { Button } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import productImg from "../../images/logo.png"
import { HiShoppingBag, HiShoppingCart, HiBell, HiExclamation } from "react-icons/hi";
import "./HomePage.css"
import Loading from "../loader/Loading";
import { AuthContext } from "../authprovider/AuthProvider";
import PopupWarn from "../popup/PopupWarn";

function ProductInfo() {
    let { pid } = useParams()
    let [product, setProduct] = useState({});
    let [stocks, setStocks] = useState(0);
    let [orderQuantity, setOrderQuantity] = useState(1);
    let [isLoading, setIsLoading] = useState(false);
    let { isLogin } = useContext(AuthContext);
    let navigate = useNavigate();
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupData, setPopupData] = useState({});

    let getAllProducts = async () => {
        setIsLoading(true)
        let response = await axios.get(`http://localhost:8080/api/v1/products/${pid}`);
        response = response.data
        setProduct(response)
        console.log(response)
        setStocks(response.stocks[0].quantity)
        setIsLoading(false)
    }

    useEffect(() => {
        getAllProducts();
    }, [pid]);

    let handleOrderQuantity = (action) => {
        if (action === "increase" && orderQuantity < stocks) {
            setOrderQuantity(orderQuantity + 1);
        } else if (action === "decrease" && orderQuantity > 1) {
            setOrderQuantity(orderQuantity - 1);
        }
    };

    let handleCartProduct = async (product) => {
        setIsLoading(true);
        // product.preventDefault();
        let tempProduct = {
            "selectedQuantity": orderQuantity,
            "product": {
                "productId": product.inventoryId,
                "productTitle": product.productTitle,
                "productDescription": product.description,
                "productPrice": product.price,
                "productQuantity": product.stocks[0].quantity,
                "availabilityStatus": "YES"
            }
        }
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/customers/${isLogin.userId}/cart-products`,
                tempProduct,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true // Includes cookies with the request
                }
            );
            console.log(response);
            setIsLoading(false);
            if (response.status === 201) {
                setTimeout(() => {
                    setPopupData(response.data);
                    setPopupOpen(true);
                }, 0);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);

            setTimeout(() => {
                setPopupData(error.response.data);
                setPopupOpen(true);
            }, 0);
        }
    }

    return (
        <>
            {isLoading && <Loading />}

            {popupOpen && <PopupWarn isOpen={popupOpen} width="w-[90%]"
                setIsOpen={setPopupOpen} clr="green"
                head={popupData.message} />}

            <div className="flex items-center justify-center">
                <div className="flex flex-col md:flex-row items-center justify-center m-4 border border-green-500 rounded-md w-full md:w-1/2 p-4 cardShadow">
                    <section className="w-full md:w-1/2 text-center">
                        {product.productImage ? (
                            <img
                                className="w-full max-w-sm mx-auto m-2 object-cover"
                                alt="ProductImage"
                                src={product.productImage}
                            />
                        ) : (
                            <img
                                className="w-full max-w-sm mx-auto m-2 object-cover"
                                alt="ProductImage"
                                src={productImg}
                            />
                        )}

                        <div className="flex flex-wrap gap-2 items-center justify-center mb-2">
                            {stocks === 0 ? <Button gradientDuoTone="purpleToBlue">
                                <HiBell className="mr-2 h-5 w-5" />
                                Add to Wishlist
                            </Button>
                                :
                                <Button onClick={() => handleCartProduct(product)} gradientDuoTone="purpleToBlue">
                                    <HiShoppingCart className="mr-2 h-5 w-5" />
                                    Add To Cart
                                </Button>}
                            {stocks === 0 ? <Button gradientDuoTone="purpleToPink">
                                <HiExclamation className="mr-2 h-5 w-5" />
                                Out Of Stocks
                            </Button>
                                :
                                <Button onClick={() => {
                                    handleCartProduct(product), navigate("/cart/addresses",
                                        { state: { product: product, quantity: orderQuantity } })
                                }}
                                    gradientDuoTone="purpleToPink">
                                    <HiShoppingBag className="mr-2 h-5 w-5" />
                                    Buy Now
                                </Button>}
                        </div>
                    </section>

                    <section className="w-full md:w-1/2 m-2">
                        <h5 className="text-xl md:text-2xl font-bold mb-2 tracking-tight text-gray-900 dark:text-white">
                            {product.productTitle}
                        </h5>
                        <h5 className="text-sm md:text-base font-bold tracking-tight dark:text-white">
                            Price: <span className="text-green-700 dark:text-green-300">{product.price !== 0.0 ? product.price : "99.99 Rs"}</span>
                            &nbsp; &nbsp;<span className="text-base font-normal leading-tight text-gray-500 line-through">70% off</span>
                        </h5>
                        <br />

                        <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
                            <span className="font-semibold">Description:</span> {product.description ? product.description : "It is a demo product"}
                        </p>

                        <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
                            <span className="font-semibold">Categories:</span>
                            {product.materialTypes ? product.materialTypes.map((ele) => ele + ", ") : "No Material Types"}
                        </p>

                        <section className="flex items-center mb-2">
                            <p className="font-normal text-gray-700 dark:text-gray-400 mr-3">
                                <span className="font-semibold">Order Quantity:</span>
                            </p>
                            <Button.Group>
                                <Button outline pill size="xs" onClick={() => handleOrderQuantity("decrease")}>
                                    -
                                </Button>
                                <Button outline pill size="xs" disabled>
                                    {orderQuantity}
                                </Button>
                                <Button outline pill size="xs" onClick={() => handleOrderQuantity("increase")}>
                                    +
                                </Button>
                            </Button.Group>
                        </section>

                        <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
                            <span className="font-semibold">Total Stocks:</span> {stocks}
                        </p>

                        <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
                            <span className="font-semibold">Manufacture Date:</span> {product.restockedAt}
                        </p>

                        <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
                            <span className="font-semibold">Size - <br /> Height:</span> {product.heightInMeters} Meters
                            <br />
                            Length: {product.lengthInMeters} Meters
                            <br />
                            Weight: {product.weightInKg} kg
                        </p>
                    </section>
                </div>
            </div>
        </>
    )
}

export default ProductInfo
