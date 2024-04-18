// AddBook.jsx

/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import booksService from "../services/book.service";
import authorService from "../services/author.service";

function AddBook() {
    const [title, setTitle] = useState("");
    const [year, setYear] = useState(0);
    const [isbn, setIsbn] = useState("");
    const [genre, setGenre] = useState("");
    const [authors, setAuthors] = useState([]);
    const [selectedAuthor, setSelectedAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [reader, setReader] = useState("");
    const [notes, setNotes] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        authorService
            .getAuthors()
            .then((response) => {
                setAuthors(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const newBook = {
            title,
            year,
            isbn,
            genre,
            author: selectedAuthor,
            description,
            notes
        };
        booksService
            .createBook(newBook)
            .then((response) => {
                console.log(response);
                navigate("/books");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Add Book</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Title"
                                className="input input-bordered"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Year</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Year"
                                className="input input-bordered"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">ISBN</span>
                            </label>
                            <input
                                type="text"
                                placeholder="ISBN"
                                className="input input-bordered"
                                value={isbn}
                                onChange={(e) => setIsbn(e.target.value)}
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
                                onChange={(e) => setGenre(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Author</span>
                            </label>
                            <select
                                className="select select-bordered"
                                value={selectedAuthor}
                                onChange={(e) => setSelectedAuthor(e.target.value)}
                            >
                                <option disabled>Select Author</option>
                                {authors.map((author) => (
                                    <option key={author._id} value={author._id}>
                                        {author.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Description"
                                className="input input-bordered"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                       
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Notes</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Notes"
                                className="input input-bordered"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Add Book</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddBook;
