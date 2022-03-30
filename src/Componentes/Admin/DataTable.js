import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";

// DATA GRID
const columns = [
  { field: "nome", headerName: "Nome", width: 167 },
  { field: "morada", headerName: "Morada", width: 527 },
  { field: "ativo", headerName: "Estado", width: 121 },
];

const DataTable = () => {
  const [tableData, setTableData] = useState([]);

  const [rows, setRows] = useState(tableData);
  const [deletedRows, setDeletedRows] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/getEditoras")
      .then((data) => data.json())
      .then((data) => setTableData(data));
  }, []);

  console.log(tableData);

  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={50}
        checkboxSelection
        onSelectionModelChange={({ selectionModel }) => {
          const rowIds = selectionModel.map((rowId) =>
            parseInt(String(rowId), 10)
          );
          const rowsToDelete = tableData.filter((row) =>
            rowIds.includes(row.id)
          );
          setDeletedRows(rowsToDelete);
          console.log(deletedRows);
          <DataGrid />;
        }}
      />
    </div>
  );
};

export default DataTable;
// DATA GRID
