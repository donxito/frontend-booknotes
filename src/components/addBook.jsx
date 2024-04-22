/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { AuthContext } from '../context/auth.context'
import booksService from "../services/book.service";
import authorService from "../services/author.service";
import userService from "../services/user.service";

function AddBook() {

    const { user } = useContext(AuthContext);

    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [isbn, setIsbn] = useState("");
    const [genre, setGenre] = useState("");
    const [authors, setAuthors] = useState([]);
    const [selectedAuthor, setSelectedAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [reader, setReader] = useState("");


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

        // fetch logged in user info
        userService
            .getUser()
            .then((response) => {
                setReader(response.data.name);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if(!selectedAuthor) {
            console.log("Please select an author or create a new one.");
            return;
        }

        const newBook = {
            title,
            year,
            isbn,
            genre,
            author: selectedAuthor,
            description,
            reader: user.id,
            notes: []
            
        };
        booksService
            .createBook(newBook)
            .then((response) => {
                console.log(response);
                navigate("/books/" + response.data._id);
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
                                value={selectedAuthor}
                                onChange={(event) => setSelectedAuthor(event.target.value)}
                            >
                                <option>Select Author</option>
                                {authors.map((author) => (
                                    <option key={author._id} value={author._id}>
                                        {author.name}
                                    </option>
                                ))}
                            </select>
                
                            <p className="mt-2 text-sm">
                                Don't see the author you're looking for?{" "}
                                <Link to="/authors/add" className="text-primary text-sm underline">
                                    Add a new author
                                </Link>
                            </p>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea
                                type="text"
                                placeholder="Describe this book"
                                className="input input-bordered"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
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
