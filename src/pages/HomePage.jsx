import backgroundImage from "../assets/background-image.jpg"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function HomePage() {

  const { isLoggedIn, logOutUser } = useContext(AuthContext); // Destructure isLoggedIn from AuthContext


  return (
    <div className="hero min-h-screen" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover'}}>
    
    <div className="hero-overlay bg-opacity-70"></div>
    <div className="hero-content text-left text-neutral-content mb-20">
    
        <div className="max-w-md">
        <h1 className="text-9xl font-bold text-amber-100" >Mini Book Club</h1>
        <p className="py-7 text-2xl font-bold text-amber-100">A simple note taking app, where you can post your thoughts about any book</p>
    
            <Link to={"/books"}>
            <button className="btn btn-primary">See Books</button>
            </Link>

            {isLoggedIn ? (
            <button className="ml-4 btn btn-secondary" onClick={logOutUser}>Logout</button>
          ) : (
            <>
              <p className="py-7 text-2xl font-bold text-amber-100">Sign Up/ Login to get started</p>
              <Link to={"/signup"}>
                <button className="mr-4 btn btn-secondary">Sign Up</button>
              </Link>
              <Link to={"/login"}>
                <button className="btn btn-primary">Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;