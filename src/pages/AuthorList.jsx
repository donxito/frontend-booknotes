import { useState, useEffect } from "react";

import authorService from "../services/author.service";
import AuthorCard from "../components/authorCard";



function AuthorList() {

    const [author, setAuthor] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // fetch the authors from the server using the authorService
        const fetchAuthors = async () => {
            try {
                const response = await authorService.getAuthors();
                setAuthor(response.data);
                console.log("Response from server:", response);
            } catch (error) {
                console.log("error fetching authors:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAuthors();
    }, [])

  return (
    <div>
        <h1 className="text-4xl font-bold underline">My Book Notes</h1>
        <h2 className="text-quick font-bold">Authors</h2>

        <ul>
            {loading ? (
                <li>Loading...</li>
            ) : (
                author && Array.isArray(author) ? (
                    author.map((author) => (
                        <li key={author._id}>
                            <AuthorCard author={author} /> {/* Pass the book object as a prop */}
                        </li>
                    ))
                ) : (
                    <li>No authors found</li>
                )
            )}
        </ul>



    </div>
  )
}

export default AuthorList