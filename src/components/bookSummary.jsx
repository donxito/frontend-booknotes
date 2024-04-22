/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

function BookSummary({ book }) {

  const navigate = useNavigate();




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
