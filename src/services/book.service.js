import axios from "axios";

class BooksService {
    
    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_URL 
        });
        // Set JWT token in the headers for every request
        this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = {Authorization:`Bearer ${storedToken}`};
            }
            return config;
        });
    }

    // POST /books
    createBook = (requestBody) => {
        return this.api.post("/books", requestBody)
    };

    // GET /books
    getBooks = () => {
        return this.api.get("/books");
    };

    // GET /books/:bookId
    getBook = (bookId) => {
        return this.api.get(`/books/${bookId}`);
    };

    // GET /books/:bookId/notes
    getNotesByBookId = (bookId) => {
        return this.api.get(`/books/${bookId}/notes`);
    };

    // PUT /books/:bookId
    updateBook = (bookId, requestBody) => {
        return this.api.put(`/books/${bookId}`, requestBody);
    };

    // DELETE /books/:bookId
    deleteBook = (bookId) => {
        return this.api.delete(`/books/${bookId}`);
    };


}

const booksService = new BooksService();

export default booksService;