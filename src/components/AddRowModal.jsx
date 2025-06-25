// ✅ AddRowModal.jsx - Dedicated modal for adding new rows
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addRow } from "../store/tableSlice";

const AddRowModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.table.columns);
  const [newRow, setNewRow] = useState({});

  const handleAddRow = () => {
    // Check if at least one field is filled
    const hasData = Object.values(newRow).some(
      (value) => value && value.trim() !== ""
    );

    if (hasData) {
      // Pass the newRow data to the Redux action
      dispatch(addRow(newRow));
      // Reset the form and close modal
      setNewRow({});
      onClose();
    } else {
      // If no data is provided, create an empty row
      dispatch(addRow());
      onClose();
    }
  };

  const handleNewRowChange = (colId, value) => {
    setNewRow((prev) => ({ ...prev, [colId]: value }));
  };

  const handleCancel = () => {
    setNewRow({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Row</DialogTitle>
      <DialogContent>
        <div style={{ paddingTop: "1rem" }}>
          {columns.map((col) => (
            <TextField
              key={col.id}
              label={col.label}
              value={newRow[col.id] || ""}
              onChange={(e) => handleNewRowChange(col.id, e.target.value)}
              size="small"
              fullWidth
              style={{ marginBottom: "1rem" }}
            />
          ))}

          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <Button
              variant="contained"
              onClick={handleAddRow}
              fullWidth
              color="primary"
            >
              Add Row
            </Button>
            <Button variant="outlined" onClick={handleCancel} fullWidth>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddRowModal;
