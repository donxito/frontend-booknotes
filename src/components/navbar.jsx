import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import logo from "../assets/logo.png";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { isLoggedIn, logOutUser } = useContext(AuthContext); // Destructure isLoggedIn and logOutUser from AuthContext

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleDropdownLinkClick = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    logOutUser();
    setIsDropdownOpen(false);
  };

  return (
    <div className="navbar bg-base-100">
      {/* Home Button */}
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="logo" className="w-14 h-14 mr-8 ml-6" />
        </Link>
      </div>

      {/* Dropdown Button for Small Screens */}
      <div className="lg:hidden ml-auto">
        <button
          tabIndex={0}
          role="button"
          className="btn btn-ghost"
          onClick={toggleDropdown}
        >
          {isDropdownOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Dropdown Content */}
      <div className={`lg:hidden ${isDropdownOpen ? "block" : "hidden"}`}>
        <div className="absolute top-14 right-0 bg-base-200 border border-gray-300 rounded-md shadow-md z-10">
          <div className="flex flex-col">
            {!isLoggedIn && (
              <>
                <Link
                  to="/login"
                  className="btn btn-ghost"
                  onClick={handleDropdownLinkClick}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-ghost"
                  onClick={handleDropdownLinkClick}
                >
                  Sign Up
                </Link>
              </>
            )}
            <Link
              to="/books"
              className="btn btn-ghost"
              onClick={handleDropdownLinkClick}
            >
              Books
            </Link>
            <Link
              to="/authors"
              className="btn btn-ghost"
              onClick={handleDropdownLinkClick}
            >
              Authors
            </Link>
            {isLoggedIn && (
              <>
                <Link
                  to="/books/add"
                  className="btn btn-ghost"
                  onClick={handleDropdownLinkClick}
                >
                  Add Book
                </Link>
                <Link
                  to="/authors/add"
                  className="btn btn-ghost"
                  onClick={handleDropdownLinkClick}
                >
                  Add Author
                </Link>
                <Link
                  to="/profile"
                  className="btn btn-ghost"
                  onClick={handleDropdownLinkClick}
                >
                  Profile
                </Link>
                <button className="btn btn-ghost" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Links for Large Screens */}
      <div className="hidden lg:flex lg:items-center">
        {!isLoggedIn && (
          <>
            <Link to="/login" className="btn btn-ghost text-xl">
              Login
            </Link>
            <Link to="/signup" className="btn btn-ghost text-xl">
              Sign Up
            </Link>
          </>
        )}
        <Link to="/books" className="btn btn-ghost text-xl">
          Books
        </Link>
        <Link to="/authors" className="btn btn-ghost text-xl">
          Authors
        </Link>
        {isLoggedIn && (
          <>
            <Link to="/books/add" className="btn btn-ghost text-xl">
              Add Book
            </Link>
            <Link to="/authors/add" className="btn btn-ghost text-xl">
              Add Author
            </Link>
            <Link to="/profile" className="btn btn-ghost text-xl">
              Profile
            </Link>
            <button className="btn btn-ghost text-xl" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
