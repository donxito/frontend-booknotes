
import { useState, useEffect } from "react"

import authorService from "../services/author.service"
import booksService from "../services/book.service"




function AddAuthor() {

    const [name, setName] = useState("");
    const [authorBooks, setAuthorBooks] = useState([]);
    const [bio, setBio] = useState("");

    useEffect(() => {
        booksService
            .getBooks()
            .then((response) => {
                setAuthorBooks(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    function handleFormSubmit(event) {
        event.preventDefault();

        const newAuthor = {
            name: name,
            books: authorBooks,
            bio
        };
        authorService
            .createAuthor(newAuthor)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }


  return (
    <div className="flex justify-center items-center min-h-screen">
    <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">

            <h2 className="card-title">Add Author</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name:</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Author Name"
                        className="input input-bordered"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Bio:</span>
                    </label>
                    <textarea
                        type="text"
                        placeholder="Write a short bio"
                        className="input input-bordered"
                        value={bio}
                        onChange={(event) => setBio(event.target.value)}
                    />
                </div>
                
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Books:</span>
                    </label>
                    <select
                        className="select select-bordered"
                        value={authorBooks}
                        onChange={(event) => setAuthorBooks(event.target.value)}
                    >
                        <option disabled>Select Books</option>
                        {authorBooks.map((book) => (
                            <option key={book._id} value={book._id}>
                                {book.name}
                            </option>
                        ))}
                    </select>
                </div>
               

               
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Add Author</button>
                </div>
            </form>
        </div>
    </div>
</div>
);
}

export default AddAuthor