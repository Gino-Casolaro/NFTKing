import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createPortfolio } from "../actions/portfolios";

const AddPortfolio = (props) => {
    const [id, setId] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [active, setActive] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const savePortfolio = () => {
        props
            .createPortfolio(title, description)
            .then((data) => {
                setId(data.id);
                setTitle(data.title);
                setDescription(data.description);
                setActive(data.active);
                setSubmitted(true);

                console.log(data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const newPortfolio = () => {
        setId(null);
        setTitle("");
        setDescription("");
        setActive(false);
        setSubmitted(false);
    }

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newPortfolio}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={title}
                            onChange={onChangeTitle}
                            name="title"
                        />
                    </div>  

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={description}
                            onChange={onChangeDescription}
                            name="description"
                        />
                    </div>

                    <button onClick={savePortfolio} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
}

export default connect(null, { createPortfolio })(AddPortfolio);