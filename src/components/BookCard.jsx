/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Button } from "@chakra-ui/react";
import iconStarEmpty from "../assets/star_empty.svg";
import iconStarFull from "../assets/star_full.svg";
import booksService from "../services/book.service";

function BookCard({ book }) {
  const { user } = useContext(AuthContext);

  const { bookId } = useParams();

  const navigate = useNavigate();

  // rating
  const [bookRating, setBookRating] = useState(() => {
    const storedRating = localStorage.getItem(`bookRating_${book._id}`);
    return storedRating ? parseInt(storedRating) : book.rating || 0;
  });

  const handleRatingChange = (newRating) => {
    // Allow only the user who posted the book to change the rating
    if (book.reader && book.reader._id === user._id) {
      setBookRating(newRating);
      localStorage.setItem(`bookRating_${book._id}`, newRating);
    }
  };

  // is book owner
  const isBookOwner = book.reader && user && book.reader._id === user._id;

  const handleDeleteBook = async () => {
    try {
      await booksService.deleteBook(bookId);
      navigate("/books");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  console.table("Book data:", book);
  console.table("the book reader", book.reader);
  console.table("the user", user);

  return (
    <div className="card card-side bg-base-200 border border-gray-300 shadow-md rounded-md max-w-4xl mx-auto" style={{ borderRadius: "20px" }}>
      <div className="md:flex">
        {/* Image Container */}
        <figure className="md:w-1/2">
          <img
            src={book.coverURL}
            alt={book.title}
            className="h-96 w-full object-cover md:h-full md:w-full"
          />
        </figure>
        {/* Text Content */}
        <div className="card-body w-full md:w-1/2 p-6">
          <h2 className="card-title text-2xl my-2">{book.title}</h2>
          <p className="text-sm mb-2">
            <strong>Genre: </strong>
            {book.genre}
          </p>
          <p className="text-sm mb-2">
            <strong>Year: </strong>
            {book.year}
          </p>
          <p className="text-sm mb-2">
            <strong>Review: </strong>
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
          {/* Button to author details */}
          <div className="card-actions justify-end my-4">
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

          {/* Button to edit the book */}
          {isBookOwner && (
            <div className="card-actions justify-end my-4">
              <Button
                px={6}
                py={3}
                fontWeight="bold"
                className="btn btn-secondary"
                onClick={() => navigate(`/books/${book._id}/edit`)}
              >
                Edit
              </Button>

              {/* Button to delete the book */}
              <Button
                px={6}
                py={3}
                fontWeight="bold"
                className="btn btn-secondary"
                onClick={() => handleDeleteBook(book._id)}
              >
                Delete
              </Button>
            </div>
          )}

          {/* Button to go back */}
          <div className="card-actions justify-start my-4">
            <Button
              px={6}
              py={3}
              fontWeight="bold"
              className="btn btn-secondary"
              onClick={() => navigate(`/books`)}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
