/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react";
import booksService from "../services/book.service";
import BookSummary from "../components/bookSummary";
import PacmanLoader from "react-spinners/PacmanLoader";

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    // fetch the books from the server using the booksService
    const fetchBooks = async () => {
      try {
        const response = await booksService.getBooks();
        setBooks(response.data);
        console.log("Response from server:", response);
      } catch (error) {
        console.log("error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="flex flex-col items-center my-40">
      <h2 className="text-3xl font-bold underline my-8">Books</h2>

      {loading ? (
        <PacmanLoader show={loader} heightUnit={150} />
      ) : books && Array.isArray(books) ? (
        <div className="flex flex-wrap justify-center ">
          {books.map((book) => (
            <div key={book._id} className="m-4">
              <BookSummary book={book} /> {/* Pass the book object as a prop */}
            </div>
          ))}
        </div>
      ) : (
        <p>No books found</p>
      )}
      <div className="spacer" style={{ height: '500px' }}></div> {/* Placeholder element */}
    </div>
    
  );
}

export default BookList;
