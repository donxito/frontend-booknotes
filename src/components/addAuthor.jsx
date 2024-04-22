
import { useState } from "react"
import { useNavigate } from "react-router-dom";

import authorService from "../services/author.service"





function AddAuthor() {

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");

    const navigate = useNavigate();

    function handleFormSubmit(event) {
        event.preventDefault();

        const newAuthor = {
            name: name,
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

            navigate("/authors");
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