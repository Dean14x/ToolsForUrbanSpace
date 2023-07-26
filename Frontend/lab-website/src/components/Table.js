import React from "react";

import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import "./Table.css";

export const Table = ({ rows, deleteRow, editRow }) => {
    return (
        <div className="table-wrapper">
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Rating</th>
                    <th>Edit</th>
                </tr>
                </thead>
                <tbody>
                {rows.map((row, idx) => {
                    const statusText =
                        row.type.charAt(0).toUpperCase() + row.type.slice(1);

                    return (
                        <tr key={idx}>
                            <td>{row.name}</td>
                            <td>
                                <span className={`label label-${row.type}`}>
                                    {statusText}
                                </span>
                            </td>
                            <td>{row.description}</td>
                            <td>{row.email}</td>
                            <td>{row.contact}</td>
                            <td >{row.rating}</td>
                            <td className={"expand"}>

                  <span className="actions">
                    <BsFillTrashFill
                        className="delete-btn"
                        onClick={() => deleteRow(idx)}
                    />
                    <BsFillPencilFill
                        className="edit-btn"
                        onClick={() => editRow(idx)}
                    />
                  </span>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};