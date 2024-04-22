import backgroundImage from "../assets/background-image.jpg"
import { Link } from "react-router-dom";

function HomePage() {


  return (
    <div className="hero min-h-screen" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover'}}>
    
    <div className="hero-overlay bg-opacity-60"></div>
    <div className="hero-content text-left text-neutral-content">
    

 
        <div className="max-w-md">
        <h1 className="text-9xl font-bold " >Mini Book Club</h1>
        <p className="py-6 font-bold">A simple note taking app, where you can post your thoughts about any book</p>
    
            <Link to={"/books"}>
            <button className="btn btn-primary">Enter</button>
            </Link>
        </div>
    </div>
</div>
  );
}

export default HomePage