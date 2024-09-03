import { updateTable } from "@/api/table";
import { ActiveTable } from "active-table-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ITable } from "tracker-config";

function Table() {
  const { state } = useLocation();
  const [table, setTable] = useState<ITable>(state.table as ITable);
  return (
    <>
      <h1>{table.name}</h1>
      <ActiveTable
        onCellUpdate={handleCellUpdate}
        pagination={true}
        tableStyle={{
          borderRadius: "10px",
          boxShadow: "rgb(172 172 172 / 17%) 0px 0.5px 1px 0px",
        }}
        data={[
          table.headerColumns,
          ...table.tableItems.map((item) => item.values),
        ]}
      />
      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={() => updateTable({ tableId: table.id, updateBody: table })}
      >
        Save Changes
      </button>
    </>
  );

  function handleCellUpdate(vals: {
    text: string;
    rowIndex: number;
    columnIndex: number;
    updateType: string;
  }) {
    console.log(vals);
    switch (vals.updateType) {
      case "Updated":
        update(vals);
        break;
      case "Add":
        add(vals);
        break;
      case "Removed":
        remove(vals);
    }
  }

  function update(vals: {
    text: string;
    rowIndex: number;
    columnIndex: number;
  }) {
    if (vals.rowIndex === 0) {
      const updatedHeaders = [...table.headerColumns];
      updatedHeaders[vals.columnIndex] = vals.text;
      setTable({ ...table, headerColumns: updatedHeaders });
    } else {
      const updatedTableItems = [...table.tableItems];
      updatedTableItems[vals.rowIndex].values[vals.columnIndex] = vals.text;
      setTable({ ...table, tableItems: updatedTableItems });
    }
  }

  function remove(vals: {
    text: string;
    rowIndex: number;
    columnIndex: number;
  }) {
    if (vals.rowIndex === 0) {
      const updatedHeaders = [...table.headerColumns];
      updatedHeaders.splice(vals.columnIndex);
      setTable({ ...table, headerColumns: updatedHeaders });
    } else {
      const updatedTableItems = [...table.tableItems];
      updatedTableItems.splice(vals.columnIndex);
      setTable({ ...table, tableItems: updatedTableItems });
    }
  }

  function add(vals: { text: string; rowIndex: number; columnIndex: number }) {
    if (vals.rowIndex === 0) {
      const updatedHeaders = [...table.headerColumns];
      updatedHeaders.push(vals.text);
      setTable({ ...table, headerColumns: updatedHeaders });
    } else {
      const updatedTableItems = [...table.tableItems];
      updatedTableItems[vals.rowIndex].values.push(vals.text);
      setTable({ ...table, tableItems: updatedTableItems });
    }
  }
}
export default Table;
