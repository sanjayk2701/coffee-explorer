/* eslint-disable no-unused-vars */
import React, { useState } from "react";
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
import "./addModal.scss";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";

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

const AddModal = ({ open, onClose, onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    if (!title || !description || ingredients.length === 0) {
    toast.error("Please fill all fields before adding coffee!");
    return;
  }
    setLoading(true);

    setTimeout(() => {
      const newCoffee = {
        id: Date.now(),
        title,
        description,
        ingredients,
        image: null,
      };
      onAdd(newCoffee);
      onClose();
      setTitle("");
      setDescription("");
      setIngredients([]);
      setLoading(false);
       toast.success("Coffee added successfully!");
    }, 2000); // 2s loader
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
          <h2 style={{margin:"0"}}>Add Coffee</h2>
          <IconButton onClick={onClose}>
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
            className="add-coffee"
            onClick={handleAdd}
            disabled={loading}
          >
         {loading ? <Loader size={20} color="#fff" /> : "Add Coffee"}
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default AddModal;
