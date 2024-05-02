/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import authorService from "../services/author.service";
import AuthorCard from "../components/authorCard";
import PacmanLoader from "react-spinners/PacmanLoader";

function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);

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
    <div className="flex flex-col items-center my-40">
      <h2 className="text-3xl font-bold underline my-8">Authors</h2>

      {loading ? (
        <PacmanLoader show={loader} heightUnit={150} />
      ) : authors && Array.isArray(authors) && authors.length ? (
        <div className="flex flex-wrap justify-center ">
          {authors.map((author) => (
            <div key={author._id} className="m-4">
              <AuthorCard author={author} onDelete={handleDeleteAuthor} />
            </div>
          ))}
        </div>
      ) : (
        <p>No authors found</p>
      )}
      <div className="spacer" style={{ height: '500px' }}></div> {/* Placeholder element */}
    </div>
    
  );
}

export default AuthorList;
