import axios from "axios";
import store from "../Redux/Store";
import authService from "./AuthService";

class InterceptorService {

    public createInterceptors(): void {
        
        // Send token for each request and attach credentials:
        axios.interceptors.request.use(request => {

            if(authService.isLoggedIn()) {
                request.headers = {
                    ...request.headers,
                    authorization: "Bearer " + store.getState().authState.token
                };
            }

            request.withCredentials = true;

            return request;

        });

    }

}

const interceptorService = new InterceptorService();

export default interceptorService;
