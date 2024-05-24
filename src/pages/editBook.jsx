import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookService, AuthorService } from "../services";
import { validateBookData } from "../utils/formValidation";
import BookForm from "./BookForm";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";

function EditBook() {
  const [book, setBook] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { bookId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookData, authorsData] = await Promise.all([
          BookService.getBook(bookId),
          AuthorService.getAuthors(),
        ]);
        setBook(bookData);
        setAuthors(authorsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [bookId]);

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    const errors = validateBookData(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        await BookService.updateBook(bookId, formData);
        navigate(`/books/${bookId}`);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen my-40">
      <div className="card w-96 bg-base-100 shadow-xl my-8">
        <div className="card-body">
          <h2 className="card-title">Edit Book</h2>
          <BookForm
            book={book}
            authors={authors}
            formErrors={formErrors}
            isSubmitting={isSubmitting}
            onSubmit={handleFormSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default EditBook;