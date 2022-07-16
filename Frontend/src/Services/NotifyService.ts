import { Notyf } from "notyf"; // npm i notyf

class NotifyService {

    private notification = new Notyf({ duration: 3000, position: { x: "center", y: "top" } });

    public success(message: string): void {
        this.notification.success(message);
    }

    public error(err: any): void {
        this.notification.error(this.extractError(err));
    }

    private extractError(err: any): string {

        // throw "some error..."
        if (typeof err === "string") return err;

        // axios reporting a single error from backend:
        if (typeof err.response?.data === "string") return err.response.data;

        // axios reporting an array of errors from backend:
        if (Array.isArray(err.response?.data)) return err.response.data[0];

        // throw new Error(...) - must be lats
        if (typeof err.message === "string") return err.message;

        // Non of the above
        return "Some error, please try again.";
    }

}

const notifyService = new NotifyService();

export default notifyService;