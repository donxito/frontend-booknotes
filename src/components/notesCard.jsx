/* eslint-disable react/prop-types */
import notesService from "../services/notes.service";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";



function NotesCard({ bookId }) {
    const [notes, setNotes] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            if (!bookId) {
                // If bookId is undefined or falsy, return early
                return;
            }
    
            try {
                const response = await notesService.getNotesByBookId(bookId);
                setNotes(response.data);
                setLoading(false);
            } catch (error) {
                console.log("Error fetching notes:", error);
                setLoading(false);
            }
        };
        
        fetchNotes();
    }, [bookId]);
    

    return (
        <div className="p-6 border-2 border-gray-300 rounded-md shadow-md bg-white max-w-xl mx-auto my-8">
            <h2 className="text-2xl font-bold mb-2">Notes:</h2>
           
            <ul>
                {loading ? (
                    <li>Loading...</li>
                ) : (
                    notes.map((note) => (
                        <li key={note._id}>
                            <Link to={`/notes/${note._id}`}>
                                {note.content} - {note.bookId?.title || 'Unknown'}  - {note.reader ? note.reader.name : 'Unknown'}
                            </Link>
                        </li>
                    ))
                )}
            </ul>
          
        </div>
    );
}

export default NotesCard;
