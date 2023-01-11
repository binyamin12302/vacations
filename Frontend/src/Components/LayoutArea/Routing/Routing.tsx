import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import store from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import Chart from "../../HomeArea/Chart/Chart";
import Home from "../../HomeArea/Home/Home";
import HomeGuest from "../../HomeArea/HomeGuest/HomeGuest";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {

    const [admin, setAdmin] = useState<boolean>(false);

    useEffect(() => {

        setAdmin(authService.isUserAdmin());

        const unsubscribe = store.subscribe(() => {
            setAdmin(authService.isUserAdmin());
        });

        return () => unsubscribe();
    }, []);




    return (
        <div className="Routing">

            <Routes>
                <Route path="*" element={<PageNotFound />} />

                {localStorage.getItem("token") ?
                    <>
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/" element={<Home />} />
                        <Route path="" element={<Navigate to="/" />} />
                    </>
                    :
                    <>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<HomeGuest />} />
                    </>
                }


                {admin && <Route path="/chart" element={<Chart />} />}

            </Routes>

        </div>
    );

}

export default Routing;
