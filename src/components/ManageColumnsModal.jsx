// ✅ Updated ManageColumnsModal.jsx - Only for column management
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateColumnVisibility, addColumn } from "../store/tableSlice";

const ManageColumnsModal = ({ open, onClose, onAddColumn }) => {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.table.columns);

  const [newColId, setNewColId] = useState("");
  const [newColLabel, setNewColLabel] = useState("");

  const handleToggle = (id, visible) => {
    dispatch(updateColumnVisibility({ id, visible }));
  };

  const handleAddColumn = () => {
    if (!newColId.trim() || !newColLabel.trim()) return;
    onAddColumn(newColId.trim(), newColLabel.trim());
    setNewColId("");
    setNewColLabel("");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Manage Columns</DialogTitle>
      <DialogContent>
        <div style={{ marginBottom: "1rem" }}>
          <h4 style={{ marginBottom: "0.5rem" }}>Column Visibility</h4>
          {columns.map((col) => (
            <FormControlLabel
              key={col.id}
              control={
                <Checkbox
                  checked={col.visible}
                  onChange={(e) => handleToggle(col.id, e.target.checked)}
                />
              }
              label={col.label}
            />
          ))}
        </div>

        <Divider style={{ margin: "1rem 0" }} />

        <div style={{ marginBottom: "1rem" }}>
          <h4 style={{ marginBottom: "0.5rem" }}>Add New Column</h4>
          <TextField
            label="Column ID"
            value={newColId}
            onChange={(e) => setNewColId(e.target.value)}
            size="small"
            fullWidth
            style={{ marginBottom: "0.5rem" }}
          />
          <TextField
            label="Column Label"
            value={newColLabel}
            onChange={(e) => setNewColLabel(e.target.value)}
            size="small"
            fullWidth
            style={{ marginBottom: "0.5rem" }}
          />
          <Button variant="outlined" onClick={handleAddColumn} fullWidth>
            Add Column
          </Button>
        </div>

        <div style={{ textAlign: "right", marginTop: "1rem" }}>
          <Button onClick={onClose} variant="contained">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageColumnsModal;
