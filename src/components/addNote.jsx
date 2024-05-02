/* eslint-disable react/prop-types */
import { useState } from "react";
import { Textarea, useToast } from "@chakra-ui/react";
import notesService from "../services/notes.service";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function AddNote({ bookId, onNoteAdded }) {
  const [content, setContent] = useState("");
  const toast = useToast();
  const [isExpanded, setIsExpanded] = useState(false)

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

  const handleClick = () => {
    setIsExpanded(true)
  }

  return (
    <form  className="space-y-4 mb-20 my-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text my-4 font-bold">Add a note:</span>
        </label>
        <Textarea
          style={isExpanded ? { minHeight: "200px" } : { minHeight: "50px" }} 
          type="text"
          placeholder="Add your notes"
          className="input input-bordered"
          value={content}
          onClick={handleClick}
          onChange={(event) => setContent(event.target.value)}
        />
      </div>

      <Zoom in={isExpanded}>
            <Fab onClick={handleAddNote}>
              <AddIcon />
            </Fab>
          </Zoom>
    </form>
  );
}

export default AddNote;
