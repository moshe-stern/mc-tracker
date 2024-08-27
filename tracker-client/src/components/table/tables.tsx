import { createTable, queryTables } from "@/api/table";
import { useUserStore } from "@/store/user";
import { useEffect, useState } from "react";
import { ITable } from "tracker-config";
import Table from "./table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

function Tables() {
  const [tables, setTables] = useState<ITable[]>([]);
  const state = useUserStore.getState();
  useEffect(() => {
    async function getTables() {
      const { user } = useUserStore.getState();
      if (user) {
        try {
          const response = await queryTables({ userId: user.id, options: {} });
          if (response.isError) {
            throw new Error((response.result as Error).message);
          } else {
            setTables(response.result as ITable[]);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    getTables();
  }, []);
  return (
    <>
      <h3>
        Add Tables
        <FontAwesomeIcon icon={faPlusSquare} size="lg" onClick={addTable} />
      </h3>

      {tables.length
        ? tables.map((table) => <Table table={table}></Table>)
        : "No Tables"}
    </>
  );
  async function addTable() {
    const response = await createTable({
      userId: state.user!.id,
      name: "New Table",
    });
    if (!response.isError) {
      setTables([...tables, response.result as ITable]);
    }
  }
}

export default Tables;
