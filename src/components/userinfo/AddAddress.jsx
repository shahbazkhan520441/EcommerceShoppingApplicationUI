import { Button, Label, Radio, Textarea, TextInput } from "flowbite-react"
import React, { useContext, useId, useState } from "react";
import { AuthContext } from "../authprovider/AuthProvider";
import axios from "axios";
import Loading from "../loader/Loading";
import { addressType } from "./AddressTypes"
import { useNavigate } from "react-router-dom";

function AddAddress() {
    let id = useId();
    let { isLogin } = useContext(AuthContext);
    let [addressData, setAddressData] = useState({
        streetAddress: "",
        streetAddressAdditional: "",
        city: "",
        state: "",
        country: "India",
        pincode: "",
        addressType: "",
    })
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    let handleaddressData = ({ target: { name, value, type } }) => {
        setAddressData((prevData) => ({
            ...prevData, [name]: type === "number" ? Number(value) : value,
        }));
        // console.log(addressData);
    }

    let sendProductData = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        console.log(addressData);
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/users/${isLogin.userId}/addresses`,
                addressData,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true // Includes cookies with the request
                }
            );
            if (response.status === 201) {
                alert(response.data.message)
                navigate("/profile-page")
            }
            console.log(response);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }
    return (
        <div>
            {isLoading ? <Loading /> : ""}
            <h1 className="font-bold text-2xl text-center dark:text-white">Add Address Form</h1>
            <section className="flex items-center justify-center min-h-screen">
                <form className="flex max-w-md flex-col gap-4 p-4 border border-green-500 rounded-md m-2" onSubmit={sendProductData}>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor={`${id}streetAddress`} value="Street or HNO, or Plot NO" />
                        </div>
                        <Textarea id={`${id}streetAddress`} name="streetAddress" value={addressData.streetAddress} type="text" placeholder="eg. Hno 20 School road" onChange={handleaddressData} required shadow rows={2} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor={`${id}streetAddressAdditional`} value="Street Address or Area" />
                        </div>
                        <Textarea id={`${id}streetAddressAdditional`} name="streetAddressAdditional" value={addressData.streetAddressAdditional} type="text" placeholder="eg. Raja ji nagar" onChange={handleaddressData} required shadow rows={2} />
                    </div>

                    <section className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor={`${id}city`} value="City" />
                            </div>
                            <TextInput id={`${id}city`} name="city" value={addressData.city} type="text" placeholder="eg. Banglore" onChange={handleaddressData} required shadow />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor={`${id}state`} value="State" />
                            </div>
                            <TextInput id={`${id}state`} name="state" value={addressData.state} type="text" placeholder="eg. Karnataka" onChange={handleaddressData} required shadow />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor={`${id}pweight`} value="Country" />
                            </div>
                            <TextInput id={`${id}pweight`} name="country" value={addressData.country} type="text" onChange={handleaddressData} required shadow />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor={`${id}pincode`} value="Pincode" />
                            </div>
                            <TextInput
                                id={`${id}pincode`}
                                name="pincode"
                                value={addressData.pincode}
                                type="number"
                                placeholder="eg. 560001"
                                onChange={handleaddressData}
                                required
                                shadow
                            />
                        </div>
                    </section>

                    <div className="mb-2 block">
                        <legend className="mb-4 text-purple-700 dark:text-purple-500">Choose Address Type : </legend>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {addressType.map((type, index) => (
                                <React.Fragment key={index}>
                                    <fieldset className="flex max-w-md flex-col gap-4">
                                        <div className="flex items-center gap-2">
                                            <Radio id={`${id}${type}`} name="addressType" value={type} onChange={handleaddressData} required />
                                            <Label htmlFor={`${id}${type}`}>{type}</Label>
                                        </div>
                                    </fieldset>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center justify-center mb-2">
                        <Button type="submit" gradientDuoTone="purpleToBlue">
                            Add Address
                        </Button>
                        <Button type="reset" gradientMonochrome="failure">
                            Clear
                        </Button>
                    </div>
                </form>
            </section >
        </div >
    )
}

export default AddAddress
