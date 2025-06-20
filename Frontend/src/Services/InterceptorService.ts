import axios from "axios";
import store from "../Redux/Store";
import authService from "./AuthService";
import notifyService from "./NotifyService";
import { navigate } from "../Components/SharedArea/Navigator/Navigator";

class InterceptorService {
  public createInterceptors(): void {
    // Send token for each request:
    axios.interceptors.request.use((request) => {
      if (authService.isLoggedIn()) {
        request.headers = {
          authorization: "Bearer " + store.getState().authState.token,
        };
      }

      request.withCredentials = true; // for CORS requests

      return request;
    });

    // Handle expired token on response:
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const requestUrl = error.config?.url || "";

        const isLoggedIn = !!store.getState().authState.token;

        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403) &&
          isLoggedIn &&
          !requestUrl.includes("/login") &&
          !requestUrl.includes("/register")
        ) {
          authService.logout();
          notifyService.error("Your session has expired. Please log in again.");
          if (navigate) navigate("/home");
          else window.location.href = "/home";
        }

        return Promise.reject(error);
      }
    );
  }
}

const interceptorService = new InterceptorService();

export default interceptorService;
