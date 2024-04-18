import axios from "axios";

class AuthorService {

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

    // POST /authors
    createAuthor = (requestBody) => {
        return this.api.post("/authors", requestBody)
    }

    // GET /authors
    getAuthors = () => {
        return this.api.get("/authors");
    };

    // GET /authors/:authorId
    getAuthor = (authorId) => {
        return this.api.get(`/authors/${authorId}`);
    };

    // PUT /authors/:authorId
    updateAuthor = (authorId, requestBody) => {
        return this.api.put(`/authors/${authorId}`, requestBody);
    };

    // DELETE /authors/:authorId
    deleteAuthor = (authorId) => {
        return this.api.delete(`/authors/${authorId}`);
    };

}

const authorsService = new AuthorService();

export default authorsService