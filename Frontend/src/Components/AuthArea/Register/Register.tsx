import { useState } from "react";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "../AuthForm.css";

function Register(): JSX.Element {
  const navigate = useNavigate();
  const { register, handleSubmit, formState, setValue } = useForm<UserModel>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

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
      <Form
        className="form border rounded bg-light p-4 shadow m-auto"
        onSubmit={handleSubmit(send)}
      >
        <h3 className="mb-3 text-center">Register</h3>

        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            isInvalid={!!formState.errors.firstName}
            {...register("firstName", {
              required: { value: true, message: "Missing first name" },
              minLength: { value: 2, message: "Name too short" },
              maxLength: { value: 30, message: "Name too long" },
              pattern: {
                value: /^[A-Za-zא-ת\s\-]+$/,
                message:
                  "First name must contain only letters, spaces, or hyphens",
              },
            })}
          />
          <Form.Control.Feedback type="invalid">
            {formState.errors.firstName?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            isInvalid={!!formState.errors.lastName}
            {...register("lastName", {
              required: { value: true, message: "Missing last name" },
              minLength: { value: 2, message: "Last name too short" },
              maxLength: { value: 30, message: "Last name too long" },
              pattern: {
                value: /^[A-Za-zא-ת\s\-']+$/,
                message:
                  "Last name must contain only letters, spaces, hyphens, or apostrophes",
              },
            })}
          />
          <Form.Control.Feedback type="invalid">
            {formState.errors.lastName?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            isInvalid={!!formState.errors.username}
            {...register("username", {
              required: { value: true, message: "Missing username" },
              minLength: { value: 8, message: "Username too short" },
              maxLength: { value: 30, message: "Username too long" },
              pattern: {
                value: /^[A-Za-z0-9_-]+$/,
                message:
                  "Username must contain only English letters, numbers, hyphens or underscores",
              },
            })}
            onChange={(e) =>
              setValue("username", e.target.value.replace(/\s/g, ""), {
                shouldValidate: true,
              })
            }
          />
          <Form.Control.Feedback type="invalid">
            {formState.errors.username?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              isInvalid={!!formState.errors.password}
              {...register("password", {
                required: { value: true, message: "Missing password" },
                minLength: { value: 8, message: "Min 8 characters" },
                maxLength: { value: 30, message: "Max 30 characters" },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,30}$/,
                  message:
                    "Password must include uppercase, lowercase, digit, and symbol",
                },
              })}
            />
            <InputGroup.Text
              onClick={() => setShowPassword((prev) => !prev)}
              style={{ cursor: "pointer", background: "white" }}
              title={showPassword ? "Hide password" : "Show password"}
            >
              <i
                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
              ></i>
            </InputGroup.Text>
          </InputGroup>
          <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
            {formState.errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="d-block m-auto w-100 shadow-none"
        >
          {!loading ? (
            "Register"
          ) : (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </Button>
        <Form.Text className="text-center d-block mt-3">
          Already have an account?{" "}
          <NavLink to="/login" className="text-success">
            Sign in.
          </NavLink>
        </Form.Text>
      </Form>
    </div>
  );
}

export default Register;
