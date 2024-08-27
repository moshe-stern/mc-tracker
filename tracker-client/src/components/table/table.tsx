import { updateTable } from "@/api/table";
import { ActiveTable } from "active-table-react";
import { useEffect, useState } from "react";
import { ITable } from "tracker-config";

function Table(props: { table: ITable }) {
  const [table, setTable] = useState<ITable>(props.table);
  useEffect(() => {
    updateTable({ tableId: table.id, updateBody: table });
  }, [table]);
  return (
    <>
      <ActiveTable
        pagination={true}
        tableStyle={{
          borderRadius: "10px",
          boxShadow: "rgb(172 172 172 / 17%) 0px 0.5px 1px 0px",
          width: "100%",
        }}
        data={[
          table.headerColumns,
          ...table.tableItems.map(ti => ti.values),
          ["Mars", 6792, 0.642, 2, 3934],
          ["Saturn", 120536, 568, 82, 687],
          ["Neptune", 49528, 102, 14, 1638],
        ]}
      />
    </>
  );
}
export default Table;
