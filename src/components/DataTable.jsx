// ✅ Updated DataTable.jsx with separate Add Row and Delete Rows buttons
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  updateSearch,
  updateSort,
  updateRowData,
  replaceData,
  addColumn,
  addRow,
  deleteRow,
} from "../store/tableSlice";
import ManageColumnsModal from "./ManageColumnsModal";
import AddRowModal from "./AddRowModal";
import DeleteRowsModal from "./DeleteRowModal";
import Papa from "papaparse";
import { saveAs } from "file-saver";

const DataTable = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.table.data);
  const columns = useSelector((state) =>
    state.table.columns.filter((col) => col.visible)
  );
  const search = useSelector((state) => state.table.search);
  const sort = useSelector((state) => state.table.sort);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openColumnsModal, setOpenColumnsModal] = useState(false);
  const [openAddRowModal, setOpenAddRowModal] = useState(false);
  const [openDeleteRowsModal, setOpenDeleteRowsModal] = useState(false);
  const [editingRows, setEditingRows] = useState({});

  const handleEdit = (index, field, value) => {
    setEditingRows((prev) => ({
      ...prev,
      [index]: { ...prev[index], [field]: value },
    }));
  };

  const handleSaveAll = () => {
    Object.entries(editingRows).forEach(([index, updatedRow]) => {
      dispatch(updateRowData({ index: parseInt(index, 10), updatedRow }));
    });
    setEditingRows({});
  };

  const handleCancelAll = () => {
    setEditingRows({});
  };

  const handleExport = () => {
    const exportData = data.map((row) =>
      columns.reduce((obj, col) => {
        if (col.visible) obj[col.id] = row[col.id];
        return obj;
      }, {})
    );
    const csv = Papa.unparse(exportData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "table-data.csv");
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        if (!Array.isArray(results.data)) return;
        dispatch(replaceData(results.data));
      },
    });
  };

  const handleAddRow = () => {
    dispatch(addRow());
  };

  const handleDeleteLastRow = () => {
    if (data.length > 0) {
      dispatch(deleteRow(data.length - 1));
    }
  };

  const filtered = data.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sort.key) return 0;
    const aVal = a[sort.key];
    const bVal = b[sort.key];
    if (aVal < bVal) return sort.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sort.direction === "asc" ? 1 : -1;
    return 0;
  });

  const paginated = sorted.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper style={{ padding: "1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={(e) => dispatch(updateSearch(e.target.value))}
        />
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button variant="contained" onClick={() => setOpenColumnsModal(true)}>
            Manage Columns
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => setOpenAddRowModal(true)}
          >
            Add Row
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpenDeleteRowsModal(true)}
          >
            Delete Rows
          </Button>
        </div>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Button variant="outlined" onClick={handleExport}>
          Export CSV
        </Button>
        <label htmlFor="csvUpload">
          <input
            id="csvUpload"
            type="file"
            accept=".csv"
            style={{ display: "none" }}
            onChange={handleImport}
          />
          <Button variant="outlined" component="span">
            Import CSV
          </Button>
        </label>
      </div>

      {Object.keys(editingRows).length > 0 && (
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <Button variant="outlined" color="success" onClick={handleSaveAll}>
            Save All
          </Button>
          <Button variant="outlined" color="error" onClick={handleCancelAll}>
            Cancel All
          </Button>
        </div>
      )}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  onClick={() => dispatch(updateSort(col.id))}
                  style={{ cursor: "pointer" }}
                >
                  {col.label}{" "}
                  {sort.key === col.id
                    ? sort.direction === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((row, idx) => {
              const absoluteIndex = page * rowsPerPage + idx;
              const isEditing = editingRows[absoluteIndex];
              return (
                <TableRow key={absoluteIndex}>
                  {columns.map((col) => (
                    <TableCell key={col.id}>
                      {isEditing ? (
                        <TextField
                          value={
                            isEditing[col.id] !== undefined
                              ? isEditing[col.id]
                              : row[col.id] || ""
                          }
                          onChange={(e) =>
                            handleEdit(absoluteIndex, col.id, e.target.value)
                          }
                          size="small"
                        />
                      ) : (
                        <span
                          onDoubleClick={() =>
                            setEditingRows((prev) => ({
                              ...prev,
                              [absoluteIndex]: { ...row },
                            }))
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {row[col.id]}
                        </span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={sorted.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />

      {/* Modals */}
      <ManageColumnsModal
        open={openColumnsModal}
        onClose={() => setOpenColumnsModal(false)}
        onAddColumn={(id, label) => dispatch(addColumn({ id, label }))}
      />

      <AddRowModal
        open={openAddRowModal}
        onClose={() => setOpenAddRowModal(false)}
      />

      <DeleteRowsModal
        open={openDeleteRowsModal}
        onClose={() => setOpenDeleteRowsModal(false)}
      />
    </Paper>
  );
};

export default DataTable;
