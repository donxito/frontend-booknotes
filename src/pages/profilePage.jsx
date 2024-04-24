/* eslint-disable no-unused-vars */
import {useContext, useState} from 'react'
import { AuthContext } from '../context/auth.context'
import { Button } from "react-daisyui";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import booksService from '../services/book.service';
import notesService from '../services/notes.service';

import BookSummary from '../components/bookSummary';

function ProfilePage() {

    const { user, logOutUser } = useContext(AuthContext);

    const [isLoggingOut, setIsloggingOut] = useState(false)
    const [books, setBooks] = useState([]);
 

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const booksResponse = await booksService.getBooks();
                const userBooks = booksResponse.data.filter(book => book.reader?._id === user._id);
                setBooks(userBooks);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        if (user) {
            fetchBooks();

        }
        
    }, [user])    
    
    
    
    const handleLogOut = () => {
        logOutUser();
        navigate("/")
    };

    if (!user) {
        return <div>Loading...</div>
    }



  return (
    <div className="ProfilePage my-40 flex justify-center items-center">
    <div className="flex">
    <section className="profile p-6 bg-white shadow-md rounded-md max-w-md mx-auto mr-4 ">
    <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h2>
    <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Email:</h2>
        <p>{user.email}</p>
    </div>

    {user.username && (
        <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Username:</h2>
            <p>{user.username}</p>
        </div>
    )}
    
    <Button
        className="btn btn-active btn-primary"
        onClick={handleLogOut}
        disabled={isLoggingOut} 
    >
        {isLoggingOut ? "Logging Out..." : "Logout"}
    </Button>
    </section>

        <section className="events p-6 bg-white shadow-md rounded-md  mx-auto mr-4 ">
    <h2 className="text-lg font-semibold mb-2">My Books:</h2>
    {books.length > 0 && (
        <div className="user-books">  
        {books.map((book) => (
            <BookSummary key={book._id} book={book} /> 
        ))}
        </div>
       
     )}
      </section>
      </div>
      <div className="spacer" style={{ height: '500px' }}></div> {/* Placeholder element */}
      </div>
      
)}

export default ProfilePage