import React from "react";
import DataTable from "./components/DataTable";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "./store/themeSlice";

function App() {
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  return (
    <main style={{ padding: "1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Dynamic Data Table Manager
        </h1>
        <Button variant="outlined" onClick={() => dispatch(toggleTheme())}>
          Switch to {mode === "light" ? "Dark" : "Light"} Mode
        </Button>
      </div>
      <DataTable />
    </main>
  );
}

export default App;
