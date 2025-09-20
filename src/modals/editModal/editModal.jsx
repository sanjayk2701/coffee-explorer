/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Chip,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./editModal.scss"; // ✅ reuse same scss for consistency

const ingredientsList = [
  "Espresso",
  "Mjölk",
  "Is",
  "Sirap",
  "Te",
  "Socker",
  "Choklad",
];

const ITEM_HEIGHT = 32;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
      width: 250,
      marginTop: 4,
    },
  },
};

const EditModal = ({ open, onClose, coffee, onUpdate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);

  // Populate fields when coffee is passed

  useEffect(() => {
  if (coffee && open) {
    setTitle(coffee.title || "");
    setDescription(coffee.description || "");
    setIngredients(coffee.ingredients || []);
  }
}, [coffee, open]); // <-- add `open` as dependency


  const handleUpdate = () => {
    setLoading(true);

    setTimeout(() => {
      const updatedCoffee = {
        ...coffee,
        title,
        description,
        ingredients,
      };
      onUpdate(updatedCoffee);
      onClose();
      setLoading(false);
    }, 2000); // mimic API update delay
  };

  const handleClose = () => {
  setTitle("");
  setDescription("");
  setIngredients([]);
  onClose();
};


  const handleDeleteIngredient = (ingredientToDelete) => {
    setIngredients((prev) =>
      prev.filter((ingredient) => ingredient !== ingredientToDelete)
    );
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box">
        {/* Header */}
        <div className="modal-header">
          <h2 style={{margin:"0"}}>Modify Coffee</h2>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>

        <TextField
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />

        <FormControl fullWidth margin="normal" className="custom-select">
          <Select
            multiple
            displayEmpty
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            input={<OutlinedInput />}
            MenuProps={MenuProps}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return (
                  <span style={{ color: "#999" }}>Select Ingredients</span>
                );
              }
              return (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      onDelete={() => handleDeleteIngredient(value)}
                      onMouseDown={(event) => event.stopPropagation()}
                    />
                  ))}
                </Box>
              );
            }}
          >
            {ingredientsList.map((ingredient) => (
              <MenuItem key={ingredient} value={ingredient}>
                {ingredient}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className="modal-actions">
          <button
            className="edit-coffee"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? <div className="loader"></div> : "Update Coffee"}
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default EditModal;
