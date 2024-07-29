import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { useContext, useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../authprovider/AuthProvider";
import Loading from "../loader/Loading";
import logoutimg from "../../images/logout.png"

function LogoutAlert() {
    const [openModal, setOpenModal] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoding, setIsLoding] = useState(false);
    const { login, logout } = useContext(AuthContext);

    const previousLocation = location.state?.from || "/";
    console.log(location.state?.from)

    const handleLogout = async () => {
        setIsLoding(true)
        try {
            const response = await axios.post("http://localhost:8080/api/v1/logout", "",
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true // Includes cookies with the request
                }
            );
            // console.log(response.data)
            if (response.status === 200) {
                let userData = response.data.data;
                console.log(userData)
                localStorage.setItem("userData", "")
                localStorage.setItem("atExpiredTime", "");
                localStorage.setItem("rtExpiredTime", "");
                login(null)
                navigate("/login-form")
            }
            setIsLoding(false)

        } catch (error) {
            console.log(error)
            if (error.response.data.status === 401) {
                console.log(error.response.data)
            }
            setIsLoding(false)
        }
    }

    return (
        <>
            {isLoding ? <Loading /> : ""}
            {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
            <br /><br /><br />
            <Modal show={openModal} size="md" onClose={() => {
                setOpenModal(false);
                navigate(previousLocation);
            }} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineLogout className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure want to Logout?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => {
                                setOpenModal(false);
                                handleLogout();
                                logout();
                            }}>
                                {"Logout"}
                            </Button>
                            <Button color="gray" onClick={() => {
                                setOpenModal(false);
                                navigate(previousLocation);
                            }}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <img src={logoutimg} alt="logout" className="ml-auto mr-auto" />
        </>
    )
}

export default LogoutAlert
