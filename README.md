# 📊 Dynamic Data Table Manager

A feature-rich, responsive **Data Table Manager** built with **React**, **Redux Toolkit**, and **Material UI**. This project simulates a real-world admin panel table with support for importing/exporting CSV data, managing columns dynamically, inline editing, row control, and theming.

🔗 **Live Demo:** [Click here to visit the project](https://table-craft.netlify.app)

---

## 🚀 Features

### ✅ Core Table Functionality

* **Sortable Columns** – Click any header to toggle ascending/descending order
* **Global Search** – Type to filter results across all visible columns
* **Pagination** – Navigate data with 10 rows per page

### 🛠 Column Management

* **Show/Hide Columns** – Toggle visibility from a modal
* **Add New Columns** – Create new columns on the fly with custom ID and label
* **Persistence** – Column visibility and table state persist via `redux-persist`

### ✍️ Inline Editing

* **Double-click cells** to edit their values
* **Save All / Cancel All** buttons to apply or discard changes
* Validations can be extended easily (e.g., Age must be a number)

### 📁 CSV Support

* **Import CSV** – Upload a `.csv` file (parsed via PapaParse)
* **Export CSV** – Downloads current view with visible columns only (via FileSaver.js)

### ➕ Row Controls

* **Add Row** – Create a new empty row for data entry
* **Delete Row** – Remove the last row or delete selectively via modal

### 🌗 Theming

* **Light/Dark Mode** toggle using Material UI theming

### 💻 Responsive Design

* Built with MUI v5, the layout adjusts gracefully for all devices

---

## 🔧 Tech Stack

| Technology      | Usage                             |
| --------------- | --------------------------------- |
| React           | UI Framework                      |
| Redux Toolkit   | State Management                  |
| Material UI     | Component Library & Theming       |
| PapaParse       | CSV Parsing                       |
| FileSaver.js    | CSV Export                        |
| Redux Persist   | LocalStorage Sync for Redux Store |
| React Hook Form | (Optional) Form state handling    |

---

## 🧭 Getting Started


# Install dependencies
```bash
npm install
```
# Start development server
```bash
npm run dev
```

> Make sure you are using Node.js v16+ and npm v7+

---

## 📸 Screenshots

> Include screenshots here showing:
>
> * Light & dark theme
> * Column modal
> * Inline editing
> * CSV import/export

---

## 📂 Folder Structure

```
src/
├── components/
│   ├── DataTable.jsx
│   ├── AddRowModal.jsx
│   ├── DeleteRowModal.jsx
│   └── ManageColumnsModal.jsx
├── store/
│   ├── index.js
│   └── tableSlice.jsx
│   └── themeSlice.jsx
├── App.jsx
└── main.jsx
```

---

## 🧠 Future Improvements

* ✅ Drag & Drop column reordering
* ✅ Cell-level validation schema with errors
* ✅ Role-based column permissions
* ✅ Multi-row selection for bulk deletion/export

---

Made with ❤️ by [Aryan Rai](https://github.com/ar-AryanRai)
