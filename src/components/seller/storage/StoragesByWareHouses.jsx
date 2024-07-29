import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import storageImg from "../../../images/storageImg.png";
import "../../navbarpage/HomePage.css";
import { AuthContext } from "../../authprovider/AuthProvider";
import Loading from "../../loader/Loading"

function StoragesByWareHouses() {
    let [storages, setStorages] = useState([]);
    let { wareHouseId } = useParams();
    let { isLogin } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    let getStorages = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/wareHouses/${wareHouseId}/storages`,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true // Includes cookies with the request
                }
            );
            if (response.status === 200) {
                setStorages(response.data)
            }
            console.log(response)
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getStorages();
    }, [])

    const handleNavigate = (storageId, sellerId, materialTypes) => {
        if (sellerId === null || sellerId === isLogin.userId) {
            navigate(`/sellers/products/add-product/${storageId}`, { state: { storageData: materialTypes } });
        }
    };

    return (
        <>
            {isLoading ? <Loading /> : ""}
            <h1 className="font-bold text-center text-2xl dark:text-white">Select Storage</h1>
            <section className="flex flex-wrap m-2">
                {storages.map(({ storageId, section, maxAdditionalWeightInKg,
                    blockName, availableArea, materialTypes, storeHouseId, sellerId }) => {
                    return <section key={storageId} className="rounded-md m-2 cardShadow">
                        <img
                            className="max-w-sm w-40 m-2 rounded-md"
                            alt="ProductImage"
                            src={storageImg}
                        />
                        <div className="p-2">
                            <h5 className="text-xl font-bold tracking-tight text-gray-700 dark:text-slate-300">
                                Block Name : {blockName}
                            </h5>
                            <h5 className="text-sm font-bold tracking-tight dark:text-white" >
                                Storage Id : <span className="text-green-700 dark:text-green-300">
                                    {storageId}
                                </span>
                            </h5>
                            <h5 className="text-sm font-bold tracking-tight dark:text-white" >
                                Section : <span className="text-green-700 dark:text-green-300">
                                    {section}
                                </span>
                            </h5>
                            <h5 className="text-sm font-bold tracking-tight dark:text-white" >
                                Max Additional Weight In Kg : <span className="text-green-700 dark:text-green-300">
                                    {maxAdditionalWeightInKg}
                                </span>
                            </h5>
                            <h5 className="text-sm font-bold tracking-tight dark:text-white" >
                                Available Area : <span className="text-green-700 dark:text-green-300">
                                    {availableArea}
                                </span>
                            </h5>
                            <h5 className="text-sm font-bold tracking-tight dark:text-white" >
                                Material Types : <span className="text-green-700 dark:text-green-300">
                                    {materialTypes ? materialTypes.map((ele) => ele + ", ") : "No Material Types"}
                                </span>
                            </h5>
                            <h5 className="text-sm font-bold tracking-tight dark:text-white mb-1" >
                                WareHouse Id : <span className="text-green-700 dark:text-green-300">
                                    {storeHouseId}
                                </span>
                            </h5>
                        </div>
                        <hr />
                        <button
                            type="button"
                            className={`block w-full text-center ${sellerId === isLogin.userId ? 'bg-green-500' : (sellerId === null ? "bg-purple-500" : "bg-red-500 cursor-not-allowed")}`}
                            onClick={() => handleNavigate(storageId, sellerId, materialTypes)}
                            disabled={sellerId !== null && sellerId !== isLogin.userId}
                        >
                            {sellerId === isLogin.userId ? "Your Storage Add More Products" : (sellerId === null ? "Add Here" : "Already Booked")}
                        </button>
                    </section>
                })}
            </section>
        </>
    )
}
export default StoragesByWareHouses
