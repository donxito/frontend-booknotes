/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react";

import booksService from "../services/book.service";
import BookSummary from "../components/bookSummary";

function BookList() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

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
        <div>
           <h2 className="text-4xl font-bold underline" >Books:</h2>

            <ul>
                {loading ? (
                    <li>Loading...</li>
                ) : (
                    books && Array.isArray(books) ? (
                        books.map(book => (
                            <li key={book._id}> 
                                <BookSummary book={book} /> {/* Pass the book object as a prop */}
                            </li>

                            
                        ))
                    ) : (
                        <li>No books found</li>
                    )
                )}
            </ul>
        </div>
    );
}

export default BookList;
