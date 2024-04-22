import { Link } from 'react-router-dom'; // Import Link from React Router if you're using it

function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="display: flex gap-6">
        <button className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>
   
      <div className="flex-none">
        <Link to="/login" className="btn btn-square btn-ghost">Login</Link>
        <Link to="/signup" className="btn btn-square btn-ghost">Sign Up</Link>
        <Link to="/profile" className="btn btn-square btn-ghost">Profile</Link>
        <Link to="/books" className='btn btn-square btn-ghost'>Books</Link>
        <Link to="/authors" className='btn btn-square btn-ghost'>Authors</Link>
        <Link to="/books/add" className="btn btn-square btn-ghost">Add Book</Link>
        <Link to="/authors/add" className="btn btn-square btn-ghost">Add Author</Link>
      </div>
      <div className="flex-1">
        <Link to="/" className="text-3xl font-bold"><h1>MiniBookClub</h1></Link>
      </div> 
    </div>
  );
}

export default Navbar;
 