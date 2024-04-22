/* eslint-disable react/prop-types */
// AddNote.jsx

import { useState } from "react";
import notesService from "../services/notes.service";
import { Button } from "@chakra-ui/react";

function AddNote({ bookId }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Ensure that the content field is provided in the request body
      if (!content) {
        console.error("Content is required");
        return;
      }

      // Create a new note by sending a POST request to the backend
      await notesService.createNote({ content, bookId });

      // Clear the content field after successfully creating the note
      setContent("");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Notes:</span>
        </label>
        <textarea
          cols={"30"}
          rows={"10"}
          type="text"
          placeholder="Add your notes"
          className="input input-bordered"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </div>

      <Button
        type="submit"
        px={6}
        py={3}
        fontWeight="bold"
        className="btn btn-primary"
      >
        Add Note
      </Button>
    </form>
  );
}

export default AddNote;
