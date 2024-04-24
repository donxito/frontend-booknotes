/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Textarea, useToast } from "@chakra-ui/react";
import notesService from "../services/notes.service";

function AddNote({ bookId, onNoteAdded }) {
  const [content, setContent] = useState("");
  const toast = useToast();

  const handleAddNote = async () => {
    try {
      const response = await notesService.createNote({
        bookId,
        content
      });
      // Call the callback function to update the notes state
      onNoteAdded(response.data);
      // Reset the content
      setContent("");
      // Show success toast
      toast({
        title: "Note added",
        status: "success",
        duration: 3000,
        isClosable: true
      });
    } catch (error) {
      console.error("Error adding note:", error);
      // Show error toast
      toast({
        title: "Error",
        description: "Failed to add note",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
  };

  return (
    <form onSubmit={handleAddNote} className="space-y-4 mb-20 my-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text my-4 font-bold">Add a note:</span>
        </label>
        <Textarea
          style={{ minHeight: "200px" }} 
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
