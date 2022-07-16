
import { io, Socket } from "socket.io-client";
import FollowModel from "../Models/FollowModel";
import VacationModel from "../Models/VacationModel";
import { followAction, unfollowAction } from "../Redux/AuthState";
import store from "../Redux/Store";
import { addVacationAction, deleteVacationAction, updateVacationAction } from "../Redux/VacationsState";
import config from "../Utils/Config";


class SocketService {

    private socket: Socket;

    public connect(): void {
        this.socket = io(config.port);
        this.listen();
    }

    private listen(): void {

        // Listen to adding by admin: 
        this.socket.on("admin-added-vacation", (vacation: VacationModel) => {
            store.dispatch(addVacationAction(vacation));
        });

        // Listen to updating by admin: 
        this.socket.on("admin-updated-vacation", (vacation: VacationModel) => {
            // store.dispatch(updateAction(vacation));
            store.dispatch(updateVacationAction(vacation));
        });

        // Listen to deleting by admin: 
        this.socket.on("admin-deleted-vacation", (id: number) => {
            // store.dispatch(deleteAction(id));
            store.dispatch(deleteVacationAction(id));
        });

        this.socket.on("user-follow-vacation", (follow: FollowModel) => {
            // store.dispatch(deleteAction(id));

            const index = store.getState().vacationsState.vacations.findIndex(v => v.id === follow.vacationId);

            const vacation = store.getState().vacationsState.vacations[index]

            vacation.followers++

            store.dispatch(followAction());
        });


        this.socket.on("user-unfollow-vacation", (follow: FollowModel) => {
            // store.dispatch(deleteAction(id));

            const index = store.getState().vacationsState.vacations.findIndex(v => v.id === follow.vacationId);

            let vacation = store.getState().vacationsState.vacations[index]


            vacation.followers--

            store.dispatch(unfollowAction());
        });

    }

    public disconnect(): void {
        this.socket.disconnect();
    }

}

const socketService = new SocketService();

export default socketService;