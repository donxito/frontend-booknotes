/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"

import booksService from "../services/book.service";
import authorsService from "../services/author.service";



function EditAuthor() {

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [books, setBooks] = useState([]);

    const navigate = useNavigate();

    const { authorId } = useParams();
    
    useEffect(() => {
        authorsService
        .getAuthor(authorId)
        .then((response) => {
            const author = response.data;
            setName(author.name);
            setBio(author.bio);
        })
        .catch((error) => {
            console.log(error);
        });

        booksService
        .getBooks()
        .then((response) => {
            const books = response.data;
            setBooks(books);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [authorId])

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const requestBody = {
            name,
            bio
        };
        authorsService
            .updateAuthor(authorId, requestBody)
            .then((response) => {
                console.log("Author updated successfully:", response);
                navigate(`/authors/${authorId}`);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Edit Author</h2>
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
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Edit Author</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }

export default EditAuthor
