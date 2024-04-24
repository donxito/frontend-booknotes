import { Link } from "react-router-dom";
import { IoLogoLinkedin, IoLogoGithub, IoPersonCircle } from "react-icons/io5";

function Footer() {
  const date = new Date().getFullYear();

  return (
    
    <footer className="footer p-2 bg-neutral text-neutral-content flex justify-center items-center" style={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 1000, marginTop: '600px' }}>
    
      <p className="mr-4">
       
        <Link
          to={"https://mchito.netlify.app"}
          className="text-xs  font-bold text-neutral-content"
        >
          Copyright © Miguel Chito {date}
        </Link>
      </p>
      <div className="flex items-center">
        <Link
          to={"https://www.linkedin.com/in/miguelchito-reactdeveloper"}
          className="link link-hover text-xl"
        >
          <IoLogoLinkedin />
        </Link>

        <Link
          to={"https://github.com/donxito"}
          className="link link-hover text-xl ml-2"
        >
          <IoLogoGithub />
        </Link>

        <Link
          to={"https://mchito.netlify.app"}
          className="link link-hover text-xl ml-2"
        >
          <IoPersonCircle />
        </Link>

      </div>

      
  
    </footer>
  );
}

export default Footer;
