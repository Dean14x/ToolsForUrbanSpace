import { useState } from "react";
import "./App.css";
import "./networkTable.css";
import { Table } from "./components/Table";
import { Modal } from "./components/Modal";

function NetworkTable() {
    const [modalOpen, setModalOpen] = useState(false);
    const [rows, setRows] = useState([
        {
            name: "Name",
            type: "none",
            description: "Address",
            email:"Email",
            contact:"Contact",
            rating:"Rating",
        },

    ]);
    const [rowToEdit, setRowToEdit] = useState(null);

    const handleDeleteRow = (targetIndex) => {
        setRows(rows.filter((_, idx) => idx !== targetIndex));
    };

    const handleEditRow = (idx) => {
        setRowToEdit(idx);

        setModalOpen(true);
    };

    const handleSubmit = (newRow) => {
        rowToEdit === null
            ? setRows([...rows, newRow])
            : setRows(
                rows.map((currRow, idx) => {
                    if (idx !== rowToEdit) return currRow;

                    return newRow;
                })
            );
    };

    return (
        <div className={"tabelle"}>
            <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
            <button onClick={() => setModalOpen(true)} className="btn">
                Add
            </button>
            {modalOpen && (
                <Modal
                    closeModal={() => {
                        setModalOpen(false);
                        setRowToEdit(null);
                    }}
                    onSubmit={handleSubmit}
                    defaultValue={rowToEdit !== null && rows[rowToEdit]}
                />
            )}
        </div>
    );
}

export default NetworkTable;