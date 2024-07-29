import { Button, Card } from "flowbite-react"
import { useNavigate } from "react-router-dom"
import warehouse from "../../images/warehouseImg.png"
import product from "../../images/products.png"
import storage from "../../images/storageImg.png"


function SellerComp() {
    let navigate = useNavigate()

    let comps = [
        { url: "/sellers/wareHouses", title: "WareHouses", image: warehouse, btnColor: "purpleToBlue" },
        { url: "/sellers/storages", title: "Your Storages", image: storage, btnColor: "purpleToPink" },
        { url: "/sellers/products", title: "Your Products", image: product, btnColor: "tealToLime" }
    ]

    return (
        <div className="text-center">
            <h1 className="font-bold text-2xl dark:text-white">Seller Component page</h1>
            <br />

            <section className="flex flex-wrap justify-around gap-3 m-2">
                {comps.map(({ url, title, image, btnColor }, index) => {
                    return <Card key={index}
                        className="max-w-sm w-52"
                        imgAlt={title}
                        imgSrc={image}
                    >
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {title}
                        </h5>
                        <Button onClick={() => navigate(url)} outline gradientDuoTone={btnColor}>
                            Click Here
                        </Button>
                    </Card>
                })}
            </section>
        </div>
    )
}

export default SellerComp
