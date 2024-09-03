import { updateTable } from "@/api/table";
import { width } from "@fortawesome/free-regular-svg-icons/faAddressBook";
import { ActiveTable } from "active-table-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ITable } from "tracker-config";

function Table() {
  const { state } = useLocation();
  const [table, setTable] = useState<ITable>(state.table as ITable);
  // useEffect(() => {
  //   updateTable({ tableId: table.id, updateBody: table });
  // }, [table]);
  return (
    <>
      <h1 contentEditable>
        {table.name}
      </h1>
      <ActiveTable
        onCellUpdate={handleCellUpdate}
        pagination={true}
        tableStyle={{
          borderRadius: "10px",
          boxShadow: "rgb(172 172 172 / 17%) 0px 0.5px 1px 0px",
          width: "100%",
          height: "100%",
        }}
        data={[
          table.headerColumns,
          ["Mars", 6792, 0.642, 2, 3934],
          ["Saturn", 120536, 568, 82, 687],
          ["Neptune", 49528, 102, 14, 1638],
        ]}
      />
    </>
  );
  function handleCellUpdate(val: unknown) {
    console.log(val);
  }
}
export default Table;
