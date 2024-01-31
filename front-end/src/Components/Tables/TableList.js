import { useEffect, useState } from "react";
import { listTables } from "../../utils/api";
import TableView from "./TableView"

function TableList({ tables, setTables }) {

    useEffect(() => {
        listTables().then(setTables);
    }, []);
    console.log("These tables:", tables);
//     const expectedOutput = 
//     tables.map((table, index) => {
//         <TableView table={table} index={index} key={index} />
//     });
// console.log("Expected output:", expectedOutput);


    return (
        <div>
            {tables.map((table, index) => {
        <TableView table={table} index={index} key={index} />
    })}
        </div>
    );
}

// export default TableList;