import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import FollowModel from "../Models/FollowModel";
import Role from "../Models/RoleModel";
import UserModel from "../Models/UserModel";
import { followAction, loginAction, logoutAction, registerAction, unfollowAction } from "../Redux/AuthState";
import store from "../Redux/Store";
import config from "../Utils/Config";

class AuthService {

    public async register(user: UserModel): Promise<void> {
        const response = await axios.post<string>(config.registerUrl, user);
        const token = response.data;
        store.dispatch(registerAction(token));
    }

    
    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<string>(config.loginUrl, credentials);
        const token = response.data;
        store.dispatch(loginAction(token));
    }

    public async followVacation(follow: FollowModel): Promise<void> {
        await axios.post<string>(config.followVacationUrl, follow);
        store.dispatch(followAction());
    }

    public async unfollowVacation(follow: FollowModel): Promise<void> {
        await axios.delete<string>(config.unfollowVacationUrl + follow.vacationId);
        store.dispatch(unfollowAction());
    }

  
    public logout(): void {
        store.dispatch(logoutAction());
    }

    public isLoggedIn(): boolean {
        return store.getState().authState?.user !== null;
    }

    public isUserAdmin(): boolean {
        return store.getState().authState.user?.roleId === Role.Admin;
    }

}

const authService = new AuthService();

export default authService;