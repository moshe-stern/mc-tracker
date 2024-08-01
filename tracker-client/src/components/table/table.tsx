import { ITable } from "tracker-config";

function Table (props: {table: ITable}){
    const { table } = props
    return (
        <>
        {table}

        </>
    )
}
export default Table