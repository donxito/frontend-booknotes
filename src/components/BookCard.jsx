/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

import { Button } from "@chakra-ui/react";


function BookCard({ book }) {
  const navigate = useNavigate();


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
            {book.reader?.name}
          </p>
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
