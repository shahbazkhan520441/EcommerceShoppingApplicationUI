import { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../authprovider/AuthProvider"
import { Button, Card } from "flowbite-react";
import user from "../../images/user.png"
import LogoutOperation from "./LogoutOperation";
import axios from "axios";
import Loading from "../loader/Loading";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faMobileRetro } from "@fortawesome/free-solid-svg-icons";

function ProfilePage() {
    let { isLogin } = useContext(AuthContext);
    let [openModal, setOpenModal] = useState({ openStatus: false, val: "" });
    let [isLoading, setIsLoading] = useState(false);
    let [addressData, setAddressData] = useState([]);
    let [userData, setUserData] = useState({})
    let navigate = useNavigate();

    const handleLogout = (val) => {
        setOpenModal({ openStatus: true, val });
    };

    let hadleUserData = async () => {
        setIsLoading(true);
        try {
            const responseUser = await axios.get(`http://localhost:8080/api/v1/users/${isLogin.userId}`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            console.log(responseUser.data)
            setUserData(responseUser.data.data)
            const responseAddress = await axios.get(`http://localhost:8080/api/v1/users/${isLogin.userId}/addresses`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            console.log(responseAddress.data);
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
        hadleUserData();
    }, [])

    let handleUpdateAddress = ({ data }) => {
        navigate("/profile-page/update-address", { state: data })
    }

    let handleUserUpdate = () => {
        navigate("/profile-page/update-profile", { state: userData })
    }

    return (
        <>
            {isLoading && <Loading />}
            {openModal.openStatus && <LogoutOperation modelData={openModal} handleModel={setOpenModal} />}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="row-span-1 md:row-span-3">
                    <div className="p-2">
                        <img src={user} className=" ml-auto mr-auto" style={{ width: "18rem" }} alt="user" />
                        <div className="flex flex-col items-center">
                            <Button onClick={() => handleLogout("logoutFromAllDevices")}
                                className="m-2" outline gradientDuoTone="redToYellow">
                                Logout from All Devices
                            </Button>
                            <Button onClick={() => handleLogout("logoutFromOtherDevices")}
                                className="m-2" outline gradientDuoTone="purpleToBlue">
                                Logout From Other Devices
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 md:col-span-2">
                    <section className="p-2">
                        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-slate-500">
                            Username : <span className="dark:text-slate-200">{isLogin.username}</span>
                        </h5>
                        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-slate-500">
                            Role : <span className="dark:text-slate-200">{isLogin.userRole}</span>
                        </h5>
                        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-slate-500">
                            UserId : <span className="dark:text-slate-200">{isLogin.userId}</span>
                        </h5>
                        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-slate-500">
                            Email : <span className="dark:text-slate-200">{userData.email}</span>
                        </h5>
                        <Button onClick={handleUserUpdate} className="mt-2" outline pill>
                            Edit Email or Password
                        </Button>
                    </section>
                </div>

                <div className="flex items-center text-2xl text-purple-700">
                    <span>Address ({`${isLogin.userRole === "SELLER" ? "max-1" : "max-4"}`}) :</span>
                    <Button
                        className="ml-2"
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
                    {addressData.map(({ addressId, addressType, city, country, pincode,
                        state, streetAddress, streetAddressAdditional, contacts }, index) => {
                        return <Card key={addressId} className="max-w-sm">
                            <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                Address : {addressType}
                            </h5>
                            <p className="font-mono text-gray-700 dark:text-gray-400">
                                <span className="font-bold">Street and HNO : </span> {streetAddress}
                            </p>
                            <p className="font-mono text-gray-700 dark:text-gray-400">
                                <span className="font-bold">Area : </span> {streetAddressAdditional}
                            </p>
                            <p className="font-mono text-gray-700 dark:text-gray-400">
                                <span className="font-bold">City : </span>  {city}
                            </p>
                            <p className="font-mono text-gray-700 dark:text-gray-400">
                                <span className="font-bold">State : </span> {state}
                            </p>
                            <p className="font-mono text-gray-700 dark:text-gray-400">
                                <span className="font-bold">Country : </span> {country} - {pincode}
                            </p>
                            <Button onClick={() => handleUpdateAddress({ data: addressData[index] })} outline gradientDuoTone="pinkToOrange">
                                Edit Address
                            </Button>
                            <hr />

                            <div className="">
                                <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white mb-1">
                                    <FontAwesomeIcon icon={faMobileRetro} /> Contact :&nbsp;
                                    {contacts.length >= 2 ? <span className="text-slate-500">Max-2</span> : <Link className="text-sm text-blue-600 hover:underline" to={`/profile-page/addresses/add-contact/${addressId}`}>
                                        Add Contact
                                    </Link>}
                                </h5>
                                {contacts.map(({ contactId, contactNumber, priority }) => {
                                    return <div key={contactId} className="flex justify-around">
                                        <span className="text-sm text-slate-500 dark:text-slate-400">{priority}</span>
                                        <span className="text-slate-700 dark:text-slate-300 mr-1">{contactNumber}</span>
                                        <Link to="/profile-page/addresses/update-contact"
                                            state={{contactId : contactId, contactNumber: contactNumber, priority: priority }} >
                                            <FontAwesomeIcon className="text-blue-600" icon={faPenToSquare} />
                                        </Link>
                                    </div>
                                })}

                            </div>
                        </Card>
                    })}
                </div>
            </div>

        </>
    )
}

export default ProfilePage
