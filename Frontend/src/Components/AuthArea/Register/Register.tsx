import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "../AuthForm.css";

function Register(): JSX.Element {

    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm<UserModel>();
    const [loading, setLoading] = useState<boolean>(false);

    async function send(user: UserModel) {
        try {
            setLoading(true);
            await authService.register(user);
            navigate("/");
            notifyService.success("Congrats! Welcome to your new account.");
        } catch (err: any) {
            notifyService.error(err);
            setLoading(false);
        }
    }

    return (
        <div className="AuthForm container">
            <Form className="form border rounded bg-light p-4 shadow m-auto" onSubmit={handleSubmit(send)}>
                <h3 className="mb-3 text-center">Register</h3>

                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name"
                        isInvalid={!!formState.errors.firstName}
                        {...register("firstName", {
                            required: { value: true, message: "Missing first name" },
                            minLength: { value: 2, message: "Name too short" },
                            maxLength: { value: 30, message: "Name too long" }
                        })} />
                    <Form.Control.Feedback type="invalid">
                        {formState.errors.firstName?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name"
                        isInvalid={!!formState.errors.lastName}
                        {...register("lastName", {
                            required: { value: true, message: "Missing last name" },
                            minLength: { value: 2, message: "Last name too short" },
                            maxLength: { value: 30, message: "Last name too long" }
                        })} />
                    <Form.Control.Feedback type="invalid">
                        {formState.errors.lastName?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username"
                        isInvalid={!!formState.errors.username}
                        {...register("username", {
                            required: { value: true, message: "Missing username" },
                            minLength: { value: 8, message: "Username too short" },
                            maxLength: { value: 40, message: "Username too long" }
                        })} />
                    <Form.Control.Feedback type="invalid">
                        {formState.errors.username?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                        isInvalid={!!formState.errors.password}
                        {...register("password", {
                            required: { value: true, message: "Missing password" },
                            minLength: { value: 8, message: "Min 8 characters" },
                            maxLength: { value: 30, message: "Max 30 characters" },
                            pattern: {
                                value: /^(?=(?:.*[a-z]){2,})(?=(?:.*[A-Z]){2,})(?=(?:.*\d){2,})(?=.*[\W_])(?!.*\s).*$/,
                                message: "2 lowercase, 2 uppercase, 2 digits, 1 symbol"
                            }
                        })} />
                    <Form.Control.Feedback type="invalid">
                        {formState.errors.password?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="d-block m-auto w-100 shadow-none">
                    {!loading ? "Register" : (
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    )}
                </Button>
            </Form>
        </div>
    );
}

export default Register;
