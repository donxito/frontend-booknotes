/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react";

import booksService from "../services/book.service";

function BookList() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await booksService.getBooks();
                console.log("response object:", response);
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
            <ul>
                {loading ? (
                    <li>Loading...</li>
                ) : (
                    books && Array.isArray(books) ? (
                        books.map(book => (
                            <li key={book._id}>{book.title} </li>

                            
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
