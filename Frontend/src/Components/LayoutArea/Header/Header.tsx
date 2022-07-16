import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Header.css";

function Header(): JSX.Element {

    const [user, setUser] = useState<UserModel>();
    const navigate = useNavigate();

    useEffect(() => {

        setUser(store.getState().authState.user);


        const unsubscribe = store.subscribe(() => {
            setUser(store.getState().authState.user);
        });

        return () => unsubscribe();
    }, []);


    function handleLogout(): void {
        navigate("/logout");
        notifyService.success("You have been successfully logged-out");
    }



    return (
        <div className="Header border-bottom bg-light text-center pt-2">

            <Nav className="justify-content-center " defaultActiveKey="/">
                {authService.isLoggedIn() ? <>
                    <span className="text-secondary p-1">Hello {user?.firstName} |</span>
                    <Nav.Link className="nav-link  p-1 text-danger" onClick={handleLogout}  >
                        Logout
                    </Nav.Link>
                </> :
                    <>
                        <NavLink className="nav-link text-success p-1" to="/">Login |</NavLink>
                        <NavLink className="nav-link p-1" to="/register">Register</NavLink>
                    </>
                }
            </Nav>
            <br />
        </div>
    );
}

export default Header;
