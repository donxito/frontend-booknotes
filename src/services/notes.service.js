import axios from "axios";

class NoteService {

    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_URL
        })
         // Set JWT token in the headers for every request
         this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = {Authorization:`Bearer ${storedToken}`};
            }
            return config;
        });

    }

    // POST /notes
    createNote = (requestBody) => {
        return this.api.post("/notes", requestBody)
    }

    // GET /notes
    getNotes = () => {
        return this.api.get("/notes");
    }

    // GET /notes/:noteId
    getNote = (noteId) => {
        return this.api.get(`/notes/${noteId}`);
    }

    // PUT /notes/:noteId
    updateNote = (noteId, requestBody) => {
        return this.api.put(`/notes/${noteId}`, requestBody);
    }

    // DELETE /notes/:noteId
    deleteNote = (noteId) => {
        return this.api.delete(`/notes/${noteId}`);
    }

}

const notesService = new NoteService();

export default notesService;