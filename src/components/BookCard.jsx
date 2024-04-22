/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useState, useContext  } from "react";
import { AuthContext } from "../context/auth.context";
import { Button, } from "@chakra-ui/react";
import iconStarEmpty from "../assets/star_empty.svg";
import iconStarFull from "../assets/star_full.svg";


function BookCard({ book }) {

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  // rating
  const [bookRating, setBookRating] = useState(() => {
    const storedRating = localStorage.getItem(`bookRating_${book._id}`);
    return storedRating ? parseInt(storedRating) : (book.rating || 0);
  })

  const handleRatingChange = (newRating) => {
    // Allow only the user who posted the book to change the rating
    if (book.reader && book.reader._id === user._id) {
      setBookRating(newRating);
      localStorage.setItem(`bookRating_${book._id}`, newRating);
    }
  }

  console.log("Book data:", book);
  console.log("the book reader", book.reader)
  console.log("the user", user)

  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <div className="md:flex">
        {/* Image Container */}
        <figure>
          <img
            src={book.coverURL}
            alt={book.title}
            className="h-48 w-full object-cover md:h-full md:w-48"
          />
        </figure>
        {/* Text Content */}
        <div className="card-body">
          <h2 className="card-title">{book.title}</h2>
          <p className="text-sm mb-2">
            <strong>Genre: </strong>
            {book.genre}
          </p>
          <p className="text-sm mb-2">
            <strong>Year: </strong>
            {book.year}
          </p>
          <p className="text-sm mb-2">
            <strong>Description: </strong>
            {book.description}
          </p>
          <p className="text-sm mb-2">
            <strong>Author: </strong>
            {book.author?.name}
          </p>

          <p className="text-sm mb-2">
            <strong>Reader: </strong>
            {book.reader?.name || "No reader assigned"}
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
            <Button
              px={6}
              py={3}
              fontWeight="bold"
              className="btn btn-primary"
              onClick={() => navigate(`/authors/${book.author?._id}`)}
            >
              Author Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
