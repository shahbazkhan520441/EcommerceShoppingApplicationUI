import { Button, Checkbox, FileInput, Label, Textarea, TextInput } from "flowbite-react";
import React, { useContext, useId, useState } from "react";
import { materialTypesList } from "../MaterialTypes";
import { AuthContext } from "../../authprovider/AuthProvider";
import { useLocation, useParams } from "react-router-dom";
import Loading from "../../loader/Loading";
import axios from "axios";

function AddProduct() {
    let id = useId();
    let { isLogin } = useContext(AuthContext);
    let [formData, setFormData] = useState({
        sellerId: isLogin.userId,
        productTitle: "",
        lengthInMeters: "",
        breadthInMeters: "",
        heightInMeters: "",
        weightInKg: "",
        price: "",
        description: "",
        productImage: "",
        materialTypes: [],
    })
    let [productQuantity, setProductQuantity] = useState({ quantity: "" });
    let { storageId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    let materials = location.state.storageData || [];
    // console.log(materials)

    let handleFormData = ({ target: { name, value, checked, type } }) => {
        if (name === "materialTypes") {
            if (checked) {
                setFormData(prevState => ({
                    ...prevState,
                    materialTypes: [...prevState.materialTypes, value]
                }));
            } else {
                setFormData(prevState => ({
                    ...prevState,
                    materialTypes: prevState.materialTypes.filter(type => type !== value)
                }));
            }
        } else if (name === "quantity") {
            setProductQuantity({ ...productQuantity, [name]: Number(value) })
        } else {
            if (type === "number")
                setFormData({ ...formData, [name]: Number(value) });
            else
                setFormData({ ...formData, [name]: value });
        }
        // console.log(formData);
    }

    let sendProductData = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        console.log(productQuantity);
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/storages/${storageId}/products?quantity=${productQuantity.quantity}`,
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true // Includes cookies with the request
                }
            );
            console.log(response);
            if(response.status === 200){
                alert('product is added')
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }


    return (
        <>
            {isLoading ? <Loading /> : ""}
            <h1 className="font-bold text-2xl text-center dark:text-white">Add Product Form</h1>
            <section className="flex items-center justify-center min-h-screen">
                <form className="flex max-w-md flex-col gap-4 p-4 border border-green-500 rounded-md m-2" onSubmit={sendProductData}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor={`${id}sid`} color="success" value="Your Seller Id" />
                        </div>
                        <TextInput id={`${id}sid`} type="text" value={isLogin.userId} shadow disabled />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor={`${id}pTitle`} value="Product Title" />
                        </div>
                        <TextInput id={`${id}pTitle`} name="productTitle" value={formData.productTitle} type="text" placeholder="eg. Realme 2 Pro" onChange={handleFormData} required shadow />
                    </div>

                    <section className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor={`${id}plength`} value="Length In Meters" />
                            </div>
                            <TextInput id={`${id}plength`} name="lengthInMeters" value={formData.lengthInMeters} type="number" placeholder="eg. 3.5" onChange={handleFormData} required shadow />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor={`${id}pbreadth`} value="Breadth In Meters" />
                            </div>
                            <TextInput id={`${id}pbreadth`} name="breadthInMeters" value={formData.breadthInMeters} type="number" placeholder="eg. 2.2" onChange={handleFormData} required shadow />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor={`${id}pheight`} value="Height In Meters" />
                            </div>
                            <TextInput id={`${id}pheight`} name="heightInMeters" value={formData.heightInMeters} type="number" placeholder="eg. 2.7" onChange={handleFormData} required shadow />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor={`${id}pweight`} value="Weight In KG" />
                            </div>
                            <TextInput id={`${id}pweight`} name="weightInKg" value={formData.weightInKg} type="number" placeholder="eg. 2.7" onChange={handleFormData} required shadow />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor={`${id}pprice`} value="Price in Rs/-" />
                            </div>
                            <TextInput id={`${id}pprice`} name="price" value={formData.price} type="number" placeholder="eg. 2.7" onChange={handleFormData} required shadow />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor={`${id}pquantity`} value="Quantity" />
                            </div>
                            <TextInput id={`${id}pquantity`} name="quantity" value={productQuantity.quantity} type="number" placeholder="eg. 2" onChange={handleFormData} required shadow />
                        </div>
                    </section>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor={`${id}description`} value="Description about product" />
                        </div>
                        <Textarea id={`${id}description`} name="description" value={formData.description} type="text" placeholder="eg. It is a Realme pro model of 2nd edition Mobile phone " onChange={handleFormData} required shadow rows={4} />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor={`${id}pimg`} value="Product Image" />
                        </div>
                        <FileInput id={`${id}pimg`} name="productImage" value={formData.productImage} onChange={handleFormData} helperText="A product image is only jpeg, jpg, png format are allowed" />
                    </div>

                    <div className="mb-2 block">
                        <h3 className="text-purple-700 dark:text-purple-500">Material Types</h3>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {materialTypesList.map((type, index) => (
                                <React.Fragment key={index}>
                                    {materials.includes(type) && (
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`${id}${type}`}
                                                name="materialTypes"
                                                value={type}
                                                onChange={handleFormData}
                                                label={type}
                                                className="mr-2"
                                            />
                                            <Label htmlFor={`${id}${type}`}>{type}</Label>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center justify-center mb-2">
                        <Button type="submit" gradientDuoTone="purpleToBlue">
                            Add Product
                        </Button>
                        <Button type="reset" gradientMonochrome="failure">
                            Clear
                        </Button>
                    </div>
                </form>
            </section >
        </>
    )
}

export default AddProduct;
