import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authprovider/AuthProvider";
import axios from "axios";
import { Button, Card } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileRetro } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import Loading from "../loader/Loading";
import { HiOutlineArrowRight } from "react-icons/hi";


export default function OrderAddress() {
    let { isLogin } = useContext(AuthContext);
    let [isLoading, setIsLoading] = useState(false);
    let [addressData, setAddressData] = useState([]);
    let navigate = useNavigate();
    let location = useLocation();
    console.log(location.state)

    let hadleAddressData = async () => {
        setIsLoading(true);
        try {
            const responseAddress = await axios.get(`http://localhost:8080/api/v1/users/${isLogin.userId}/addresses`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            // console.log(responseAddress.data);
            if (responseAddress.status === 200) {
                setAddressData(responseAddress.data.data)
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        hadleAddressData();
    }, [])

    let handleUpdateAddress = () => {

    }

    return (
        <section className="">
            {isLoading && <Loading />}
            <h1 className="font-bold text-3xl m-2 text-pink-600 text-center">Select a address : </h1>
            <div className="flex items-center text-2xl text-purple-700">
                <span>Address ({`${isLogin.userRole === "SELLER" ? "max-1" : "max-4"}`}) :</span>
                <Button
                    className="ml-2"
                    size="sm"
                    outline
                    gradientDuoTone="purpleToPink"
                    onClick={() => navigate("add-address")}
                    disabled={(isLogin.userRole === "SELLER" && addressData.length >= 1) ||
                        (isLogin.userRole === "CUSTOMER" && addressData.length >= 4)}
                >
                    Add Address
                </Button>
            </div>
            <div className="row-span-1 md:row-span-2 col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-2">
                {addressData.map((address, index) => {
                    return <Card key={address.addressId} className="max-w-sm">
                        <div className="flex flex-wap justify-between m-1">
                            <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                Address : {address.addressType}
                            </h5>
                            <Button onClick={() => navigate(`/cart/addresses/order-preview`,
                                {
                                    state: {
                                        product: location.state.product,
                                        address: address,
                                        quantity: location.state.quantity
                                    }
                                })} outline pill>
                                Choose Address
                                <HiOutlineArrowRight className="h-6 w-6" />
                            </Button>
                        </div>
                        <p className="font-mono text-gray-700 dark:text-gray-400">
                            <span className="font-bold">Street and HNO : </span> {address.streetAddress}
                        </p>
                        <p className="font-mono text-gray-700 dark:text-gray-400">
                            <span className="font-bold">Area : </span> {address.streetAddressAdditional}
                        </p>
                        <p className="font-mono text-gray-700 dark:text-gray-400">
                            <span className="font-bold">City : </span>  {address.city}
                        </p>
                        <p className="font-mono text-gray-700 dark:text-gray-400">
                            <span className="font-bold">State : </span> {address.state}
                        </p>
                        <p className="font-mono text-gray-700 dark:text-gray-400">
                            <span className="font-bold">Country : </span> {address.country} - {address.pincode}
                        </p>
                        <Button size="sm" onClick={() => handleUpdateAddress({ data: addressData[index] })} outline gradientDuoTone="pinkToOrange">
                            Edit Address
                        </Button>
                        <hr />

                        <div className="">
                            <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white mb-1">
                                <FontAwesomeIcon icon={faMobileRetro} /> Contact :&nbsp;
                                {address.contacts.length >= 2 ? <span className="text-slate-500">Max-2</span> : <Link className="text-sm text-blue-600 hover:underline" to={`/profile-page/addresses/add-contact/${address.addressId}`}>
                                    Add Contact
                                </Link>}
                            </h5>
                            {address.contacts.map(({ contactId, contactNumber, priority }) => {
                                return <div key={contactId} className="flex justify-around">
                                    <span className="text-sm text-slate-500 dark:text-slate-400">{priority}</span>
                                    <span className="text-slate-700 dark:text-slate-300 mr-1">{contactNumber}</span>
                                    <Link to="/profile-page/addresses/update-contact"
                                        state={{ contactId: contactId, contactNumber: contactNumber, priority: priority }} >
                                        <FontAwesomeIcon className="text-blue-600" icon={faPenToSquare} />
                                    </Link>
                                </div>
                            })}

                        </div>
                    </Card>
                })}
            </div>
        </section>
    )
}