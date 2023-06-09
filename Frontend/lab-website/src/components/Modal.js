import React, { useState } from "react";

import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
    const [formState, setFormState] = useState(
        defaultValue || {
            name: "",
            type: "",
            description: "",
            email: "",
            contact: "",
            rating: "",


        }
    );
    const [errors, setErrors] = useState("");

    const validateForm = () => {
        if (formState.name && formState.description && formState.type && formState.email && formState.contact && formState.rating) {
            setErrors("");
            return true;
        } else {
            let errorFields = [];
            for (const [key, value] of Object.entries(formState)) {
                if (!value) {
                    errorFields.push(key);
                }
            }
            setErrors(errorFields.join(", "));
            return false;
        }
    };

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;
        onSubmit(formState);
        closeModal();
    };

    return (
        <div
            className="modal-container"
            onClick={(e) => {
                if (e.target.className === "modal-container") closeModal();
            }}
        >
            <div className="modal">
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input name="name" onChange={handleChange} value={formState.name} />
                    </div>
                    <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <select
                        name="type"
                        onChange={handleChange}
                        value={formState.type}
                    >
                        <option value="teacher">Teacher</option>
                        <option value="worker">Worker</option>
                        <option value="other">Other</option>
                    </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Address</label>
                        <textarea
                            name="description"
                            onChange={handleChange}
                            value={formState.description}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <textarea
                            name="email"
                            onChange={handleChange}
                            value={formState.email}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact">Contact</label>
                        <textarea
                            name="contact"
                            onChange={handleChange}
                            value={formState.contact}
                        />
                    </div>
                    <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <textarea
                        name="rating"
                        onChange={handleChange}
                        value={formState.rating}
                    />
                </div>

                    {errors && <div className="error">{`Please include: ${errors}`}</div>}
                    <button type="submit" className="btn" onClick={handleSubmit}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};