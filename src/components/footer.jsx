import { Link } from "react-router-dom";
import { IoLogoLinkedin, IoLogoGithub } from "react-icons/io5";

function Footer() {
  const date = new Date().getFullYear();

  return (
    <footer className="footer items-center p-2 bg-neutral text-neutral-content" style={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 1000, marginTop: '50px' }}>
      <aside className="items-center grid-flow-col">
        <p>
          Copyright ©
          <Link
            to={"https://mchito.netlify.app"}
            className="font-bold text-amber-50"
          >
            {" "}
            Miguel Chito {date}{" "}
          </Link>{" "}
          - All right reserved
        </p>
      </aside>

      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <Link
          to={"https://www.linkedin.com/in/miguelchito-reactdeveloper"}
          className="link link-hover text-2xl"
        >
          {" "}
          <IoLogoLinkedin />
        </Link>

        <Link
          to={"https://github.com/donxito"}
          className="link link-hover text-2xl"
        >
          <IoLogoGithub />
        </Link>
      </nav>
    </footer>
  );
}

export default Footer;
