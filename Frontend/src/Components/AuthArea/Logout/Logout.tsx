import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import socketService from "../../../Services/SocketService";


function Logout(): JSX.Element {
    const navigate = useNavigate();

    useEffect(() => {

        navigate("/home");

        try {
            authService.logout();
            socketService.disconnect();

        }
        catch (err: any) {
            console.log(err.message);
        }

    }, [navigate]);


    return null;
}

export default Logout;
