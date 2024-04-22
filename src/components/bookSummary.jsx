/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext} from "../context/auth.context";
import iconStarEmpty from "../assets/star_empty.svg";
import iconStarFull from "../assets/star_full.svg";

function BookSummary({ book }) {

  const { user } = useContext(AuthContext);

  // Rating
  const [bookRating, setBookRating] = useState(() => {
    const storedRating = localStorage.getItem(`bookRating_${book._id}`);
    return storedRating ? parseInt(storedRating) : (book.rating || 0);
  });

  const navigate = useNavigate();

  // Rating
  const handleRatingChange = (newRating) => {
    // Allow only the user who posted the book to change the rating
    if (book.reader && book.reader._id === user._id) {
      setBookRating(newRating);
      localStorage.setItem(`bookRating_${book._id}`, newRating);
    }
  }

  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <div className="md:flex">
        <figure>
          <img
            src={book.coverURL}
            alt={book.title}
            className="h-48 w-full object-cover md:h-full md:w-48"
          />
        </figure>
        <div className="card-body">
          <h1 className="card-title">{book.title}</h1>
          
          <p className="text-sm mb-2">
            <strong>Author: </strong>
            {book.author?.name}
          </p>

          <p className="text-sm mb-2">
            <strong>Genre: </strong>
            {book.genre}
          </p>

          <p className="text-sm mb-2">
            <strong>Year: </strong>
            {book.year}
          </p>
          <p className="text-sm mb-2">
            <strong>Reader: </strong>
            {book.reader?.name}
          </p>

          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src={index < bookRating ? iconStarFull : iconStarEmpty}
                alt={index < bookRating ? "Full Star" : "Empty Star"}
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleRatingChange(index + 1)}
              />
            ))}
          </div>

          <div className="card-actions justify-end">
            <button
              fontWeight="bold"
              className="btn btn-primary"
              onClick={() => navigate(`/books/${book._id}`)}
            >
              Book Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookSummary;
