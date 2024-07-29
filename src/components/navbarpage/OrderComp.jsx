import { Button, Table } from "flowbite-react"
import giftbox from "../../images/giftbox.png";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../authprovider/AuthProvider";
import Loading from "../loader/Loading";


function OrderComp() {
    let [isLoading, setIsLoading] = useState(false);
    let [orders, setOrders] = useState([]);
    let { isLogin } = useContext(AuthContext);

    let handleOrders = async () => {
        setIsLoading(true);
        try {
            const responseOrders = await axios.get(`http://localhost:8080/api/v1/customers/${isLogin.userId}/purchase-orders`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (responseOrders.status === 200) {
                setOrders(responseOrders.data.data)
            }
            setIsLoading(false);
            // console.log(orders)
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleOrders();
    }, []);

    // let downloadInvoice = async (orderId) => {
    //     setIsLoading(true);
    //     try {
    //         const response = await axios.get(`http://localhost:8080/api/v1/customers/purchase-orders/${orderId}`, {
    //             headers: { "Content-Type": "application/json" },
    //             responseType: 'blob', // This is important for handling binary data
    //             withCredentials: true,
    //         });

    //         // Create a link element, set the download attribute with a filename, and trigger a click to start the download
    //         const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.setAttribute('download', `invoice_${orderId}.pdf`);
    //         document.body.appendChild(link);
    //         link.click();

    //         setIsLoading(false);
    //     } catch (error) {
    //         console.error(error);
    //         setIsLoading(false);
    //     }
    // };

    let downloadInvoice = async (orderId) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/customers/purchase-orders/${orderId}`, {
                headers: { "Content-Type": "application/json" },
                responseType: 'blob', // This is important for handling binary data
                withCredentials: true,
            });

            // Create a URL for the PDF and open it in a new tab
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            window.open(url, '_blank');

            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };



    return (
        <>
            {isLoading && <Loading />}
            <div className="text-center">
                <h1 className="font-bold text-2xl dark:text-white m-2">OrderComp page</h1>

                <div className="overflow-x-auto w-full">
                    <Table className="min-w-full table-auto">
                        <Table.Head>
                            <Table.HeadCell className="px-3">Order Id</Table.HeadCell>
                            <Table.HeadCell className="px-1">Product Title</Table.HeadCell>
                            <Table.HeadCell className="px-1">Invoice Date</Table.HeadCell>
                            <Table.HeadCell className="px-1">Product Image</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">invoice</span>
                            </Table.HeadCell>
                        </Table.Head>

                        <Table.Body className="divide-y">
                            {orders.map(({ orderId, inventoryTitle, invoiceDate, inventoryImage, invoiceLink }) => {
                                return <Table.Row key={orderId} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="px-3 py-1">{orderId}</Table.Cell>
                                    <Table.Cell className="px-1 py-1 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {inventoryTitle}
                                    </Table.Cell>
                                    <Table.Cell className="px-1 py-1">{invoiceDate}</Table.Cell>
                                    <Table.Cell className="px-1 py-1">
                                        <img src={inventoryImage ? inventoryImage : giftbox} alt="Product" className="w-16 h-16 object-cover" />
                                    </Table.Cell>
                                    <Table.Cell className="px-1 py-1">
                                        <Button onClick={() => downloadInvoice(orderId)} outline gradientDuoTone="greenToBlue">
                                            View Invoice
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            })}
                        </Table.Body>
                    </Table>
                </div>
            </div>
            <br />
            <br />
        </>
    )
}

export default OrderComp
