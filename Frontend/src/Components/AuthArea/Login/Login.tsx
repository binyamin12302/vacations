import { useState } from "react";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "../AuthForm.css";
import "./Login.css";

function Login(): JSX.Element {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<CredentialsModel>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  async function send(credentials: CredentialsModel) {
    setLoading(true);
    try {
      await authService.login(credentials);
      notifyService.success("You have been successfully logged-in.");
      navigate("/");
    } catch (err: any) {
      notifyService.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="AuthForm container">
      <Form
        className="form border rounded bg-light p-4 shadow m-auto"
        onSubmit={handleSubmit(send)}
      >
        <h3 className="mb-3 text-center">Login</h3>


        <div className="login-note login-note-hosting">
          <span role="img" aria-label="clock">
            🕒
          </span>{" "}
          First login may be slow (free hosting).
        </div>
        <div className="login-note login-note-admin">
          <span role="img" aria-label="admin">
            🛡️
          </span>{" "}
          <b>Demo Admin:</b>
          <span className="login-demo-user">ronaldo_nazario</span>
          <span className="login-demo-pass">/ Aa11!!Bb</span>
        </div>

        {/* Username */}
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            placeholder="Enter username"
            isInvalid={!!formState.errors.username}
            {...register("username", {
              required: { value: true, message: "Missing username" },
            })}
          />
          <Form.Control.Feedback type="invalid">
            {formState.errors.username?.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              isInvalid={!!formState.errors.password}
              {...register("password", {
                required: { value: true, message: "Missing password" },
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
          className="d-block m-auto w-100 shadow-none mb-3"
        >
          {!loading ? (
            "Login"
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

        <Form.Text className="text-center d-block">
          Don't have an account? <NavLink to="/register">Register.</NavLink>
        </Form.Text>
      </Form>
    </div>
  );
}

export default Login;
