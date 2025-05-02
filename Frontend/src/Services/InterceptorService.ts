import axios from "axios";
import store from "../Redux/Store";
import authService from "./AuthService";

class InterceptorService {

    public createInterceptors(): void {
        
        // Send token for each request: 
        axios.interceptors.request.use(request => {

            if(authService.isLoggedIn()) {
                request.headers = {
                    authorization: "Bearer " + store.getState().authState.token
                };
            }


            request.withCredentials = true; // for CORS requests
            request.headers["Access-Control-Allow-Origin"] = "*"; // for CORS requests

            return request;

        });

    }

}

const interceptorService = new InterceptorService();

export default interceptorService;