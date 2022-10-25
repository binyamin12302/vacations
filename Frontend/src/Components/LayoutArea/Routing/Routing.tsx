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


    const [user, setUser] = useState<boolean>(false);
    const [admin, setAdmin] = useState<boolean>(false);


    useEffect(() => {

        setUser(authService.isLoggedIn());
        setAdmin(authService.isUserAdmin());


        const unsubscribe = store.subscribe(() => {
            setUser(authService.isLoggedIn());
            setAdmin(authService.isUserAdmin());
        });

        return () => unsubscribe();
    }, []);



    return (
        <div className="Routing">

            <Routes>

                {user ?
                    <>
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/" element={<Home />} />
                        <Route path="" element={<Navigate to="/" />} />
                    </>
                    :
                    <>
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<Login />} />
                        <Route path="" element={<Navigate to="/" />} />
                        <Route path="/home" element={<HomeGuest />} />
                    </>
                }


                <Route path="*" element={<PageNotFound />} />

                {admin && <Route path="/chart" element={<Chart />} />}

            </Routes>

        </div>
    );

}

export default Routing;
