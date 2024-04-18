import notesService from "../services/notes.service";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function NotesCard() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await notesService.getNotes();
                setNotes(response.data);
                console.log("Response from server:", response);
            } catch (error) {
                console.log("Error fetching notes:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
    }, []);

    return (
        <div className="p-6 border-2 border-gray-300 rounded-md shadow-md bg-white max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">Notes</h2>
            <ul>
                {loading ? (
                    <li>Loading...</li>
                ) : (
                    notes.map((note) => (
                        <li key={note._id}>
                            <Link to={`/notes/${note._id}`}>
                                {note.content}  {note.book.title} {note.reader ? note.reader.name : 'Unknown'}
                            </Link>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default NotesCard;
