import { useContext, useEffect, useState } from "react";
import Loading from "../../loader/Loading";
import { Link } from "react-router-dom";
import giftBox from "../../../images/giftbox.png"
import axios from "axios";
import { AuthContext } from "../../authprovider/AuthProvider";
import "../../navbarpage/HomePage.css"

function ProductBySeller() {
  let [products, setProducts] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let { isLogin } = useContext(AuthContext);

  let getAllProducts = async () => {
    setIsLoading(true)
    let response = await axios.get("http://localhost:8080/api/v1/sellers/" + isLogin.userId + "/products",
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true // Includes cookies with the request
      }
    );
    response = response.data
    setProducts(response)
    console.log(response)
    setIsLoading(false)
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <h1 className="font-bold text-center text-2xl dark:text-white">Your Products</h1>

      <section className="flex flex-wrap m-1 justify-around">
        {products.map(({ inventoryId, productTitle, price, productImage, description }) => {
          return <Link to={`/sellers/products/product-info/${inventoryId}`} key={inventoryId} className="rounded-md m-2 w-44 cardShadow product-link" title={productTitle}>
            {productImage !== null ? productImage :
              <img
                className="max-w-sm w-40 m-2 product-picture"
                alt="ProductImage"
                src={giftBox}
              />}
            <div className="p-2">
              <h5 className="text-xl font-bold tracking-tight text-gray-700 dark:text-slate-300">
                {productTitle}
              </h5>
              <h5 className="text-sm font-bold tracking-tight dark:text-white" >
                Price : <span className="text-green-700 dark:text-green-300">{price !== 0.0 ? price : 100.20 + " Rs"}</span>
                &nbsp;<span className="text-base font-normal leading-tight text-gray-500 line-through">70% off</span>
              </h5>
              <p className="text-sm text-gray-700 dark:text-gray-400">
                {description !== null ? description : "It is a demo product"}
              </p>
            </div>
          </Link>
        })}
      </section>
    </>
  )
}

export default ProductBySeller
