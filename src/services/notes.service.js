import axios from "axios";

class NoteService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getNotesByBookId = (bookId) => {
    return this.api.get(`/books/${bookId}/notes`);
  };

  createNote = (bookId, noteData) => {
    return this.api.post(`/books/${bookId}/notes`, noteData);
  };

  updateNote = (noteId, noteData) => {
    return this.api.put(`/notes/${noteId}`, noteData);
  };

  deleteNote = (noteId) => {
    return this.api.delete(`/notes/${noteId}`);
  };
}

const notesService = new NoteService();

export default notesService;