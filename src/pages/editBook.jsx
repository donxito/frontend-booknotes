/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import booksService from "../services/book.service";
import authorsService from "../services/author.service";

function EditBook() {

    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [isbn, setIsbn] = useState("");
    const [genre, setGenre] = useState("");
    const [authors, setAuthors] = useState([]);
    const [selectedAuthor, setSelectedAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [reader, setReader] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);

    const { bookId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        booksService
            .getBook(bookId)
            .then((response) => {
                setTitle(response.data.title);
                setYear(response.data.year);
                setIsbn(response.data.isbn);
                setGenre(response.data.genre);
                setDescription(response.data.description);
                setReader(response.data.reader);
                setSelectedAuthor(response.data.author._id);
            })
            .catch((error) => {
                console.log(error);
            });

        authorsService
            .getAuthors()
            .then((response) => {
                setAuthors(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [bookId]);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const requestBody = {
            title,
            year,
            isbn,
            genre,
            author: selectedAuthor,
            description,
        
        };
        booksService
            .updateBook(bookId, requestBody)
            .then((response) => {
                console.log("Book updated successfully:", response);
                setFormSubmitted(true)
                navigate(`/books/${bookId}`);
            })
            .catch((error) => {
                console.log(error);
            });
    }



    return (
        <div className="flex justify-center items-center min-h-screen my-40">
            <div className="card w-96 bg-base-100 shadow-xl my-8">
                <div className="card-body">
                    <h2 className="card-title">Edit Book</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-control">
                            <label className="label">

                                <span className="label-text">Title</span>
                            </label>
                            <input
                                required
                                type="text"
                                placeholder="Title"
                                className="input input-bordered"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Year</span>
                            </label>
                            <input
                                type="number"
                                placeholder="1000"
                                className="input input-bordered"
                                value={year}
                                onChange={(event) => setYear(event.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">ISBN</span>
                            </label>
                            <input
                                required
                                type="text"
                                placeholder="ISBN"
                                className="input input-bordered"
                                value={isbn}
                                onChange={(event) => setIsbn(event.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Genre</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Genre"
                                className="input input-bordered"
                                value={genre}
                                onChange={(event) => setGenre(event.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Author</span>
                            </label>
                            <select
                                className="select select-bordered"
                                required
                                value={selectedAuthor}
                                onChange={(event) => setSelectedAuthor(event.target.value)}
                            >
                                <option value="">Select Author</option>
                                {authors.map((author) => (
                                    <option key={author._id} value={author._id}>
                                        {author.name}
                                    </option>
                                ))}
                            </select>
                
                            <p className="mt-2 text-sm">
                                Don't see the author you're looking for?{" "}
                                <Link to="/authors/add" className="text-secondary text-sm underline">
                                    Add a new author
                                </Link>
                            </p>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Review</span>
                            </label>
                            <textarea
                                type="text"
                                placeholder="Review this book"
                                className="input input-bordered"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>


                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Edit Book</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="spacer" style={{ height: '500px' }}></div> {/* Placeholder element */}
        </div>
    );
}




export default EditBook
