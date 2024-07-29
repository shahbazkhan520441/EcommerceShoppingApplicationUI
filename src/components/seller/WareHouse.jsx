import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import "../navbarpage/HomePage.css"
import wareHouseImg from "../../images/warehouseImg.png"
import Loading from "../loader/Loading";

function WareHouse() {
    let [wareHouses, setWareHouses] = useState([])
    let [isLoading, setIsLoading] = useState(false);

    let getWareHouses = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get("http://localhost:8080/api/v1/wareHouses-with-address",
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true // Includes cookies with the request
                }
            );
            if (response.status === 200) {
                setWareHouses(response.data)
            }
            console.log(response)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getWareHouses();
    }, [])
    return (
        <>
            {isLoading && <Loading />}
            <h1 className="font-bold text-center text-2xl dark:text-white">Total WareHouses</h1>
            <section className="flex flex-wrap m-2">
                {wareHouses.map(({ StoreHouseId, Name, TotalCapacityInKg, Address:
                    { addressId, addressLine, city, country, latitude, longitude, pincode, state } }) => {
                    return <section key={StoreHouseId} className="rounded-md m-2 cardShadow">
                        <img
                            className="max-w-sm w-40 m-2 rounded-md"
                            alt="ProductImage"
                            src={wareHouseImg}
                        />
                        <div className="p-2">
                            <h5 className="text-xl font-bold tracking-tight text-gray-700 dark:text-slate-300">
                                {Name}
                            </h5>
                            <h5 className="text-sm font-bold tracking-tight dark:text-white" >
                                Total Capacity In KG : <span className="text-green-700 dark:text-green-300">{TotalCapacityInKg}</span>
                            </h5>
                            <p className="tracking-tight mb-1 text-slate-500" >
                                WareHouse ID : {StoreHouseId}
                            </p>
                            <hr />
                            <h5 className="text-sm font-bold tracking-tight dark:text-white" >Address : </h5>
                            <p className="text-slate-500">AddressLine - {addressLine}</p>
                            <p className="text-slate-500">city - {city}</p>
                            <p className="text-slate-500">country - {country}</p>
                            <p className="text-slate-500">latitude - {latitude}</p>
                            <p className="text-slate-500">longitude - {longitude}</p>
                            <p className="text-slate-500">pincode - {pincode}</p>
                            <p className="text-slate-500">state - {state}</p>
                            <p className="text-slate-500">addressId - {addressId}</p>
                        </div>
                        <hr />
                        <Link to={`/sellers/warehouses/${StoreHouseId}/storages`}
                            className="text-blue-800 dark:text-blue-300 bg-yellow-400 dark:bg-yellow-800 block text-center">
                            Add Products
                        </Link>
                    </section>
                })}
            </section>
        </>
    )
}

export default WareHouse
