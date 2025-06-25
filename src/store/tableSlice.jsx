// ✅ Updated tableSlice.js with support for addRow and deleteRow and external trigger button
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    { name: "Alice", email: "alice@example.com", age: 24, role: "Admin" },
    { name: "Bob", email: "bob@example.com", age: 30, role: "User" },
    { name: "Carol", email: "carol@example.com", age: 27, role: "Manager" },
    { name: "David", email: "david@example.com", age: 35, role: "User" },
  ],
  columns: [
    { id: "name", label: "Name", visible: true },
    { id: "email", label: "Email", visible: true },
    { id: "age", label: "Age", visible: true },
    { id: "role", label: "Role", visible: true },
  ],
  search: "",
  sort: { key: "", direction: "asc" },
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    updateSearch(state, action) {
      state.search = action.payload;
    },
    updateSort(state, action) {
      if (state.sort.key === action.payload) {
        state.sort.direction = state.sort.direction === "asc" ? "desc" : "asc";
      } else {
        state.sort.key = action.payload;
        state.sort.direction = "asc";
      }
    },
    updateColumnVisibility(state, action) {
      const column = state.columns.find((c) => c.id === action.payload.id);
      if (column) column.visible = action.payload.visible;
    },
    updateRowData(state, action) {
      const { index, updatedRow } = action.payload;
      state.data[index] = {
        ...state.data[index],
        ...updatedRow,
      };
    },
    replaceData(state, action) {
      state.data = action.payload;
    },
    addColumn(state, action) {
      const { id, label } = action.payload;
      state.columns.push({ id, label, visible: true });
      state.data = state.data.map((row) => ({
        ...row,
        [id]: "",
      }));
    },
    addRow(state, action) {
      // If payload is provided, use it; otherwise create empty row
      if (action.payload && Object.keys(action.payload).length > 0) {
        // Use the provided row data
        const newRow = { ...action.payload };
        // Ensure all columns have values (fill missing ones with empty strings)
        state.columns.forEach((col) => {
          if (!(col.id in newRow)) {
            newRow[col.id] = "";
          }
        });
        state.data.push(newRow);
      } else {
        // Create empty row as before
        const newRow = {};
        state.columns.forEach((col) => {
          newRow[col.id] = "";
        });
        state.data.push(newRow);
      }
    },
    deleteRow(state, action) {
      state.data.splice(action.payload, 1);
    },
  },
});

export const {
  updateSearch,
  updateSort,
  updateColumnVisibility,
  updateRowData,
  replaceData,
  addColumn,
  addRow,
  deleteRow,
} = tableSlice.actions;

export default tableSlice.reducer;