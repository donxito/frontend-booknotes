/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

function BookCard({ book }) {
  const navigate = useNavigate();

  return (
    <div className="p-6 border-2 border-gray-300 rounded-md shadow-md bg-white max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{book.title}</h2>

      <img
        src={book.coverURL}
        alt={book.title}
        className="w-full h-48 object-cover mb-2 rounded-md"
      />

      <p className="text-lg mb-2">
        <strong>Genre: </strong>
        {book.genre.join(", ")}
      </p>
      <p className="text-lg mb-2">
        <strong>Year: </strong>
        {book.year}
      </p>
      <p className="text-lg mb-2">
        <strong>Description: </strong>
        {book.description}
      </p>

      <p className="text-lg mb-2">
        <strong>Author: </strong>
        {book.author?.name}
      </p>

      <p className="text-lg mb-2">
        <strong>Notes: </strong>
        {book.notes}
      </p>

      <p className="text-lg mb-2">
        <strong>User: </strong>
        {book.user?.name}
      </p>

      <Button
        px={6}
        py={3}
        fontWeight="bold"
        className="text-fuchsia-600"
        onClick={() => navigate(`/authors/${book.author?._id}`)}
      >
        Author Details
      </Button>
    </div>
  );
}

export default BookCard;
