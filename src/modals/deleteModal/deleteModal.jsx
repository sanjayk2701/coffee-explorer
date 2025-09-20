import React, { useState } from "react";
import { Modal, Box, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./deleteModal.scss"; // reuse existing modal styles

const DeleteModal = ({ open, onClose, onDelete, coffee }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    setTimeout(() => {
      onDelete(coffee);
      setLoading(false);
      onClose();
    }, 1500); // 1.5s loader to simulate API
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box delete-modal">
        {/* Header */}
        <div className="modal-header">
          <h2 style={{margin:"0"}}>Delete Coffee</h2>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        {/* Confirmation Text */}
        <p className="delete-text">
          Are you sure you want to delete <strong>{coffee?.title}</strong>?
        </p>

        {/* Delete Button */}
        <div className="modal-actions">
          <button
            className="delete-button-modal"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? <div className="loader"></div> : "Delete"}
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
