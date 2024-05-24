import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import booksService from "../services/book.service";
import authorsService from "../services/author.service";

function EditBook() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { bookId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookData, authorsData] = await Promise.all([
          booksService.getBook(bookId),
          authorsService.getAuthors(),
        ]);
        
        // Extracting book details from response data
        const { title, description, authorId } = bookData.data;
        setTitle(title);
        setDescription(description);
        setAuthorId(authorId);
        
        // Setting authors data
        setAuthors(authorsData.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [bookId]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Construct the form data
      const formData = {
        title,
        description,
        authorId
      };
      
      // Send a request to update the book
      await booksService.updateBook(bookId, formData);
      
      // Redirect to the book details page
      navigate(`/books/${bookId}`);
    } catch (error) {
      setError(error.message);
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Placeholder for loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Placeholder for error state
  }

  return (
    <div className="flex justify-center items-center min-h-screen my-40">
      <div className="card w-96 bg-base-100 shadow-xl my-8">
        <div className="card-body">
          <h2 className="card-title">Edit Book</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-control">
              <label htmlFor="title" className="label">
                <span className="label-text">Title:</span>
              </label>
              <input
                type="text"
                id="title"
                className="input input-bordered"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="description" className="label">
                <span className="label-text">Description:</span>
              </label>
              <textarea
                id="description"
                className="textarea textarea-bordered"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="form-control">
              <label htmlFor="authorId" className="label">
                <span className="label-text">Author:</span>
              </label>
              <select
                id="authorId"
                className="select select-bordered"
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
              >
                <option value="">Select an author</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditBook;
