/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import authService from "../services/auth.service";


import { Input, Button } from "react-daisyui";
import {
  FaEnvelope,
  FaLock,
  FaUserCircle,
  FaUser
} from "react-icons/fa";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [books, setBooks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const requestBody = {
      name,
      email,
      password,
      about,
      books,
      notes,
    };
    authService
      .signup(requestBody)
      .then((response) => {
        setLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.message);
      });
  };

  return (
    <div className="SignUpPage p-6 bg-white shadow-md rounded-md max-w-md mx-auto my-40">
      <h2 className="text-2xl font-bold mb-7">Sign Up</h2>

      <form onSubmit={handleFormSubmit}>
        <div className="flex items-center mb-4">
          <span className="mr-2">
            <FaEnvelope />
          </span>
          <Input
            type="text"
            name="email"
            placeholder="your@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            label="Email:"
            icon="bx bx-envelope"
          />
        </div>

        <div className="flex items-center mb-4">
          <span className="mr-2">
            <FaLock />
          </span>
          <Input
            type="password"
            name="password"
            placeholder="******"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            label="Password:"
            icon="bx bx-lock"
          />
        </div>

        <div className="flex items-center mb-4">
          <span className="mr-2">
            <FaUserCircle />
          </span>
          <Input
            type="text"
            name="name"
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            label="Name:"
            icon="bx bx-user"
          />
        </div>

        <div className="mb-2">
          <Button type="submit" className="btn mt-4" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
        <div className="mb-2 my-8">
          <p>Already have an account?</p>
        </div>
        <Link to="/login" className="btn btn-active btn-secondary">
          Login
        </Link>
      </form>
      <div className="spacer" style={{ height: '500px' }}></div> {/* Placeholder element */}
    </div>
  );
}

export default SignUp;
