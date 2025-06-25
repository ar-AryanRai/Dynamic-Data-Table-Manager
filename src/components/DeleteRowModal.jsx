// ✅ DeleteRowsModal.jsx - Dedicated modal for deleting rows
import React from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteRow } from "../store/tableSlice";

const DeleteRowsModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.table.data);

  const handleDeleteRow = (index) => {
    dispatch(deleteRow(index));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Delete Rows</DialogTitle>
      <DialogContent>
        <div style={{ paddingTop: "1rem" }}>
          {data.length === 0 ? (
            <p style={{ textAlign: "center", color: "#666", padding: "2rem" }}>
              No rows available to delete
            </p>
          ) : (
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {data.map((row, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                    marginRight: "0.5rem",
                    padding: "1rem",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    backgroundColor: "##1f1f1f",
                  }}
                >
                  <div style={{ flexGrow: 1 }}>
                    <strong>Row {idx + 1}:</strong>{" "}
                    {row.name || row.email || "Empty Row"}
                    {row.name && row.email && (
                      <div style={{ fontSize: "0.9em", color: "#787e83" }}>
                        {row.email}
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteRow(idx)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div style={{ textAlign: "right", marginTop: "1rem" }}>
            <Button onClick={onClose} variant="contained">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteRowsModal;
