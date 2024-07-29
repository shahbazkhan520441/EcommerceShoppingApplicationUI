import { Button, Table } from "flowbite-react";
import giftbox from "../../images/giftbox.png";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../authprovider/AuthProvider";
import Loading from "../loader/Loading";
import { useNavigate } from "react-router-dom";

function CartComp() {
    let [isLoading, setIsLoading] = useState(false);
    let { isLogin } = useContext(AuthContext);
    let [cartProduct, setCartProduct] = useState([])
    let [totalItemAndPrice, setTotalItemAndPrice] = useState({ totalItem: 0, totalPrice: 0 });
    let navigate = useNavigate();

    let handleOrderQuantity = (action, cartProductId, selectedQuantity, productQuantity) => {
        if (action === "increase" && selectedQuantity < productQuantity) {
            handleIncreatAndDecreaseCartProduct(cartProductId, selectedQuantity + 1);
        } else if (action === "decrease" && selectedQuantity > 1) {
            handleIncreatAndDecreaseCartProduct(cartProductId, selectedQuantity - 1);
        }
    };

    let handleCartProduct = async () => {
        setIsLoading(true);
        try {
            const responseCartProducts = await axios.get(`http://localhost:8080/api/v1/customers/${isLogin.userId}/cart-products`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            console.log(responseCartProducts)
            setCartProduct(responseCartProducts.data.data)
            setIsLoading(false);
            console.log(cartProduct)
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }
    useEffect(() => {
        handleCartProduct();
    }, []);

    useEffect(() => {
        let totalItem = 0;
        let totalPrice = 0;
        cartProduct.forEach(product => {
            totalItem += product.selectedQuantity;
            totalPrice += product.selectedQuantity * product.product.productPrice;
        });
        setTotalItemAndPrice({ totalItem, totalPrice });
    }, [cartProduct]);

    let handleRemoveCartProduct = async (cartProductId) => {
        setIsLoading(true);
        try {
            const responseCartProducts = await axios.delete(`http://localhost:8080/api/v1/customers/${isLogin.userId}/cart-products/${cartProductId}`,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
            console.log(responseCartProducts)
            setCartProduct(cartProduct.filter(product => product.cartProductId !== cartProductId));
            setIsLoading(false);
            console.log(cartProduct)
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    let handleRemoveAllCartProduct = async () => {
        setIsLoading(true);
        try {
            const responseCartProducts = await axios.delete(`http://localhost:8080/api/v1/customers/${isLogin.userId}/cart-products`,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
            console.log(responseCartProducts)
            setIsLoading(false);
            setCartProduct([])
            alert(responseCartProducts.data.message)
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    let handleIncreatAndDecreaseCartProduct = async (cartProductId, selectedQuantity) => {
        setIsLoading(true);
        try {
            const responseCartProducts = await axios.put(`http://localhost:8080/api/v1/customers/cart-products/${cartProductId}?selectedQuantity=${selectedQuantity}`,
                "", {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            console.log(responseCartProducts)
            setCartProduct(cartProduct.map(product =>
                product.cartProductId === cartProductId
                    ? { ...product, selectedQuantity }
                    : product
            ));
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    return (
        <div className="px-1">
            {isLoading && <Loading />}
            <h1 className="font-bold text-2xl dark:text-white mb-4">CartComp page</h1>

            <div className="overflow-x-auto w-full">
                <Table className="min-w-full table-auto">
                    <Table.Head>
                        <Table.HeadCell>Product Title</Table.HeadCell>
                        <Table.HeadCell>Price</Table.HeadCell>
                        <Table.HeadCell>Quantity</Table.HeadCell>
                        <Table.HeadCell>Available Stock</Table.HeadCell>
                        <Table.HeadCell>Description</Table.HeadCell>
                        <Table.HeadCell>Product Image</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Remove</span>
                        </Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y">
                        {cartProduct.map(({ cartProductId, selectedQuantity, product }) => {
                            return <Table.Row key={cartProductId} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {product.productTitle}
                                </Table.Cell>
                                <Table.Cell>{product.productPrice}</Table.Cell>

                                <Table.Cell>
                                    <Button.Group>
                                        <Button outline pill size="xs"
                                            onClick={() => handleOrderQuantity("decrease", cartProductId, selectedQuantity, product.productQuantity)}>
                                            -
                                        </Button>
                                        <Button outline pill size="xs" disabled>
                                            {selectedQuantity}
                                        </Button>
                                        <Button outline pill size="xs"
                                            onClick={() => handleOrderQuantity("increase", cartProductId, selectedQuantity, product.productQuantity)}>
                                            +
                                        </Button>
                                    </Button.Group>
                                </Table.Cell>
                                <Table.Cell>{product.productQuantity}</Table.Cell>
                                <Table.Cell>{product.productDescription}</Table.Cell>
                                <Table.Cell>
                                    {/* <img src={productImage} alt="Product" className="w-16 h-16 object-cover" /> */}
                                    <img src={product.productImage ? product.productImage : giftbox} alt="Product" className="w-16 h-16 object-cover" />
                                </Table.Cell>
                                <Table.Cell>
                                    <Button onClick={() => navigate("/cart/addresses",
                                        { state: { product: product, quantity: selectedQuantity } })}
                                        outline gradientDuoTone="greenToBlue">
                                        Order
                                    </Button>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button onClick={() => { handleRemoveCartProduct(cartProductId) }} outline gradientDuoTone="pinkToOrange">
                                        Remove
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        })}
                    </Table.Body>
                </Table>
            </div>

            <footer className={`flex flex-wrap justify-between px-4 py-2 bg-gray-200
                   dark:bg-gray-800 text-gray-800 dark:text-white mt-4 rounded-b-lg`}>
                <div>Total Items: {totalItemAndPrice.totalItem}</div>
                <div>Total Price : {totalItemAndPrice.totalPrice} Rs/-</div>
                <div className="flex flex-wrap gap-3">
                    <div>
                        <Button outline gradientDuoTone="greenToBlue" disabled={cartProduct.length === 0 ? true : false}>
                            Order All
                        </Button>
                    </div>
                    <div>
                        <Button onClick={handleRemoveAllCartProduct} outline gradientDuoTone="purpleToBlue" disabled={cartProduct.length === 0 ? true : false}>
                            Remove All
                        </Button>
                    </div>
                </div>
            </footer>

            <br />
            <br />
            <br />
        </div>
    )
}

export default CartComp
