import { createTable, queryTables } from "@/api/table";
import { useUserStore } from "@/store/user";
import { useEffect, useState } from "react";
import { ITable } from "tracker-config";
import Table from "./table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

function Tables() {
  const [tables, setTables] = useState<ITable[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getTables() {
      const { user } = useUserStore.getState();
      if (user) {
        try {
          const response = await queryTables({ options: { limit: 10 } });
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
      <h1>Tables</h1>
      <h3>
        Add Table
        <FontAwesomeIcon icon={faPlusSquare} size="lg" onClick={addTable} />
      </h3>
      <div className="container table-grid">
        {tables.length
          ? tables.map((table, index) => (
              <div
                className="card border-primary mb-3 btn btn-outline-primary col"
                onClick={() =>
                  navigate("/app/view-table", { state: { table } })
                }
                key={index}
              >
                <div className="card-body">
                  <h4 className="card-title">{table.name}</h4>
                </div>
              </div>
            ))
          : "No Tables"}
      </div>
    </>
  );
  async function addTable() {
    const response = await createTable({
      name: "New Table",
      headerColumns: ["A", "B", "C", "D", "E"],
    });
    if (!response.isError) {
      setTables([...tables, response.result as ITable]);
    }
  }
}

export default Tables;
