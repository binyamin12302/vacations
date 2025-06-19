import axios from "axios";
import store from "../Redux/Store";
import authService from "./AuthService";


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
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          localStorage.setItem(
            "sessionMessage",
            "Your session has expired. Please log in again."
          );
          authService.logout();
          window.location.href = "/home";
        }
        return Promise.reject(error);
      }
    );
  }
}

const interceptorService = new InterceptorService();

export default interceptorService;
