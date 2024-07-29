import { createContext, useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from "../loader/Loading"

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
    const [isLogin, setIsLogin] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isOtp, setIsOtp] = useState(false);
    const navigate = useNavigate();
    const refreshTokenCalled = useRef(false); // Ref to track if refresh token function has been called
    const refreshCancelSource = useRef(axios.CancelToken.source());

    const login = (userData) => {
        setIsLogin(userData);
        localStorage.setItem("userData", JSON.stringify(userData));
    };

    const logout = () => {
        setIsLogin(null);
        localStorage.removeItem("userData");
        localStorage.removeItem("atExpiredTime");
        localStorage.removeItem("rtExpiredTime");
    };

    const otpVerify = (otpGen) => {
        setIsOtp(otpGen)
    }

    const handleRefreshToken = async () => {
        try {
            setIsLoading(true)
            refreshCancelSource.current.cancel('Cancelling previous refresh request');
            refreshCancelSource.current = axios.CancelToken.source();
            const response = await axios.post("http://localhost:8080/api/v1/refreshLogin", "", {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
                cancelToken: refreshCancelSource.current.token,
            });
            if (response.status === 200) {
                let userData = response.data.data;
                let nowDate = new Date().getTime();
                localStorage.setItem("atExpiredTime", new Date(nowDate + (userData.accessExpiration * 1000)).toString());
                login(userData);
                console.log("RT regenerated successfully done");
                refreshTokenCalled.current = false; // Reset the ref after successful refresh
            }
            setIsLoading(false)
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 401) {
                logout();
                navigate("/login-form");
            }
            refreshTokenCalled.current = false; // Reset the ref in case of error
            setIsLoading(false)
        }
    };

    useEffect(() => {
        let currentTime = new Date();
        let atExpiredTime = new Date(localStorage.getItem("atExpiredTime"));
        let rtExpiredTime = new Date(localStorage.getItem("rtExpiredTime"));
        let userData = localStorage.getItem("userData");
        if (userData)
            userData = JSON.parse(userData);

        if (userData) {
            if (atExpiredTime > currentTime && currentTime < rtExpiredTime) {
                if (!isLogin) {
                    setIsLogin(userData);
                }
            } else if (atExpiredTime < currentTime && currentTime < rtExpiredTime) {
                if (!refreshTokenCalled.current) {
                    refreshTokenCalled.current = true;
                    handleRefreshToken();
                }
            } else {
                logout();
                navigate("/login-form");
            }
        }
    }, [isLogin, navigate]);

    return (
        <AuthContext.Provider value={{ isLogin, login, logout, isOtp, otpVerify }}>
            {isLoading && < Loading />}
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
