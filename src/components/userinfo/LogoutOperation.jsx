import { Button, Modal } from "flowbite-react"
import { HiOutlineExclamationCircle } from "react-icons/hi"
import Loading from "../loader/Loading";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../authprovider/AuthProvider";

// eslint-disable-next-line react/prop-types
function LogoutOperation({ modelData: { val }, handleModel }) {
    let [isLoading, setIsLoading] = useState(false);
    let [openModal, setOpenModal] = useState(true);
    let navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const logOutCalling = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/${val}`, "", {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            console.log(response.data);
            if (response.status === 200) {
                if (val === "logoutFromAllDevices") {
                    localStorage.setItem("userData", "")
                    localStorage.setItem("atExpiredTime", "");
                    localStorage.setItem("rtExpiredTime", "");
                    login(null)
                    navigate("/login-form", { state: response.data })
                }
                else if (val === "logoutFromOtherDevices")
                    alert(response.data.message)
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    return (
        <div>
            {isLoading ? <Loading /> : ""}
            {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
            <Modal show={openModal} size="md" onClick={() => { setOpenModal(false), handleModel({ openStatus: false, val: "" }) }} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure want to {val}?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => { setOpenModal(false), logOutCalling(), handleModel({ openStatus: false, val: "" }) }}>
                                {"Yes, I'm sure"}
                            </Button>
                            <Button color="gray" onClick={() => { setOpenModal(false), handleModel({ openStatus: false, val: "" }) }}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default LogoutOperation
