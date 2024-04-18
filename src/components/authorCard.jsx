/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import booksService from "../services/book.service";

function AuthorCard({ author }) {

  
  const [books, setBooks] = useState([]);
  const {authorId} = useParams();

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await booksService.getBooks();
        const filteredBooks = response.data.filter(
          (book) => book.author._id && book.author._id === author._id
        );
        setBooks(filteredBooks);
        console.log("Response from server:", response);
      } catch (error) {
        console.log("Error fetching books:", error);
      }
    };
  
    getBooks();
  }, [authorId]);
  



  return (
    <div className="card card-side bg-base-100 shadow-xl">
    <div className="card-body">
      <h2 className="card-title">{author.name}</h2>
      <p className="text-lg mb-2">
        <strong>Bio: </strong>
        {author.bio}
      </p>
      <div className="books-list">
        <strong>Books: </strong>
        <ul>
          {books.map((book) => (
            <li key={book._id}>
            <Link to={`/books/${book._id}`}>{book.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
  );
}

export default AuthorCard;
