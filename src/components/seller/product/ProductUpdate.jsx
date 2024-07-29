import { Button, Checkbox, FileInput, Label, Textarea, TextInput } from "flowbite-react";
import React, { useContext, useId, useState } from "react";
import { materialTypesList } from "../MaterialTypes";
import { AuthContext } from "../../authprovider/AuthProvider";
import { useLocation, useParams } from "react-router-dom";
import Loading from "../../loader/Loading";
import axios from "axios";

function UpdateProduct() {
    let id = useId();
    let { isLogin } = useContext(AuthContext);
    let { productId } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    let product = location.state.productData || {};
    console.log(product)

    let [formData, setFormData] = useState(product)

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
        try {
            const response = await axios.put(`http://localhost:8080/api/v1/sellers/products/` + productId,
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true // Includes cookies with the request
                }
            );
            console.log(response);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }


    return (
        <>
            {isLoading ? <Loading /> : ""}
            <h1 className="font-bold text-2xl text-center dark:text-white">Update Product Form</h1>
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
                        <TextInput id={`${id}pTitle`} name="productTitle" value={formData.productTitle || ""}
                            type="text" placeholder="eg. Realme 2 Pro" onChange={handleFormData} required shadow />
                    </div>

                    <section className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor={`${id}plength`} value="Length In Meters" />
                            </div>
                            <TextInput id={`${id}plength`} name="lengthInMeters" value={formData.lengthInMeters || 0}
                                type="number" placeholder="eg. 3.5" onChange={handleFormData} required shadow />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor={`${id}pbreadth`} value="Breadth In Meters" />
                            </div>
                            <TextInput id={`${id}pbreadth`} name="breadthInMeters" value={formData.breadthInMeters || 0}
                                type="number" placeholder="eg. 2.2" onChange={handleFormData} required shadow />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor={`${id}pheight`} value="Height In Meters" />
                            </div>
                            <TextInput id={`${id}pheight`} name="heightInMeters" value={formData.heightInMeters || 0}
                                type="number" placeholder="eg. 2.7" onChange={handleFormData} required shadow />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor={`${id}pweight`} value="Weight In KG" />
                            </div>
                            <TextInput id={`${id}pweight`} name="weightInKg" value={formData.weightInKg || 0}
                                type="number" placeholder="eg. 2.7" onChange={handleFormData} required shadow />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor={`${id}pprice`} value="Price in Rs/-" />
                            </div>
                            <TextInput id={`${id}pprice`} name="price" value={formData.price || 0}
                                type="number" placeholder="eg. 2.7" onChange={handleFormData} required shadow />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor={`${id}proId`} color="success" value="Product Id" />
                            </div>
                            <TextInput id={`${id}proId`} name="productId" value={product.inventoryId}
                                type="number" shadow disabled />
                        </div>
                    </section>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor={`${id}description`} value="Description about product" />
                        </div>
                        <Textarea id={`${id}description`} name="description" value={formData.description || ""}
                            type="text" placeholder="eg. It is a Realme pro model of 2nd edition Mobile phone "
                            onChange={handleFormData} required shadow rows={4} />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor={`${id}pimg`} value="Product Image" />
                        </div>
                        <FileInput id={`${id}pimg`} name="productImage" value="" onChange={handleFormData}
                            helperText="A product image is only jpeg, jpg, png format are allowed" />
                    </div>

                    <div className="mb-2 block">
                        <h3 className="text-purple-700 dark:text-purple-500">Material Types</h3>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {materialTypesList.map((type, index) => (
                                <React.Fragment key={index}>
                                    {product.materialTypes.includes(type) && (
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
                            Update Product
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

export default UpdateProduct;
