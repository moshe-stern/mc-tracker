import { queryTables } from "@/api/table"
import { useUserStore } from "@/store/user"
import { useEffect, useState } from "react"
import { ITable } from "tracker-config"
import Table from "./table"

function Tables () {

    const [tables, setTables] = useState<ITable[] | undefined>()
    const state = useUserStore.getState()
    useEffect(() => {
        getTables()
    })
    return (
        <>
            {tables?.length ? tables.map(table => <Table table={table}></Table>) : 'No Tables'}
        </>
    )
    async function getTables () {
        const { user } = state
        if (user) {
            const tables = await queryTables({ userId: user.id, options: {} })
            if (tables) {
                setTables(tables)
            }
        }
    }
}


export default Tables