/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";
import { Input, Button } from "react-daisyui";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (event) => setEmail(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const requestBody = { email, password };
   
    authService
      .login(requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/profile");
        
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        console.log("Error Description:", errorDescription);
      });
  };

  return (
    <div className="LoginPage p-6 bg-white shadow-md rounded-md max-w-md mx-auto my-40">
      <h2 className="text-2xl font-bold mb-4 my-8">Login</h2>

      <form onSubmit={handleLoginSubmit}>
        <label className="block mb-2">Email:</label>
        <Input
          type="email"
          name="email"
          placeholder="your@email.com"
          value={email}
          onChange={handleEmail}
        />

        <label className="block mb-2">Password:</label>
        <Input
          type="password"
          name="password"
          placeholder="**********"
          value={password}
          onChange={handlePassword}
        />

        <Button type="submit" className="btn ml-4">
          Login
        </Button>
      </form>

      {errorMessage && <p className="error-message mt-4">{errorMessage}</p>}

      <p className="mt-4">Do not have an account yet?</p>
      <Link to="/signup" className="text-blue-500">
        Sign Up
      </Link>
      <div className="spacer" style={{ height: '500px' }}></div> {/* Placeholder element */}
    </div>
  );
}

export default LogIn;
