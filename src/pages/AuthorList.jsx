import { useState, useEffect } from "react";
import authorService from "../services/author.service";
import AuthorCard from "../components/authorCard";

function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await authorService.getAuthors();
        setAuthors(response.data);
        console.log("Response from server:", response);
      } catch (error) {
        console.log("Error fetching authors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthors();
  }, []);

  const handleDeleteAuthor = async (authorId) => {
    try {
      // Remove the deleted author from the list
      setAuthors(authors.filter((author) => author._id !== authorId));
      console.log("Author deleted successfully:", authorId);
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold underline my-4">Authors</h2>

      {loading ? (
        <li>Loading...</li>
      ) : authors && Array.isArray(authors) && authors.length ? (
        <div className="flex flex-wrap justify-center ">
          {authors.map((author) => (
            <div key={author._id} className="m-4">
              <AuthorCard author={author} onDelete={handleDeleteAuthor} />
            </div>
          ))}
        </div>
      ) : (
        <li>No authors found</li>
      )}
    </div>
  );
}

export default AuthorList;
