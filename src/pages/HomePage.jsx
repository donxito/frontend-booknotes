import backgroundImage from "../assets/background-image.jpg"
import { Link } from "react-router-dom";

function HomePage() {


  return (
    <div className="hero min-h-screen" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover'}}>
    
    <div className="hero-overlay bg-opacity-60"></div>
    <div className="hero-content text-left text-neutral-content">

 
        <div className="max-w-md">
    
            <Link to={"/books"}>
            <button className="btn btn-primary">My Book Notes</button>
            </Link>
        </div>
    </div>
</div>
  );
}

export default HomePage