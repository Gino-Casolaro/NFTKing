import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { updatePortfolio, deletePortfolio } from "../actions/portfolios";
import PortfolioDataService from "../services/portfolio.service";

const Portfolio = (props) => {

    const [currentPortfolio, setCurrentPortfolio] = useState({
        id: null,
        title: "",
        description: "",
        active: false,
    });
    const [message, setMessage] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getPortfolio(params.id);
    }, []);

    const onChangeTitle = (e) => {
        const title = e.target.value;

        setCurrentPortfolio({
            ...currentPortfolio,
            title: title,
        });
    }

    const onChangeDescription = (e) => {
        const description = e.target.value;

        setCurrentPortfolio({
            ...currentPortfolio,
            description: description,
        });
    }

    const getPortfolio = (id) => {
        PortfolioDataService.get(id)
            .then((response) => {
                setCurrentPortfolio(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const updateStatus = (status) => {
        var data = {
            id: currentPortfolio.id,
            title: currentPortfolio.title,
            description: currentPortfolio.description,
            active:status,
        };

        props
            .updatePortfolio(currentPortfolio.id, data)
            .then((response) => {
                console.log(response);

                const newPortfolio = {
                    ...currentPortfolio,
                    active:status,
                }
                setCurrentPortfolio(newPortfolio);
                setMessage("The status was updated successfully!");
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const updateContent = () => {
        console.log("updateContent: " + currentPortfolio.id);
        props
            .updatePortfolio(currentPortfolio.id, currentPortfolio)
            .then((response) => {
                console.log(response);

                setMessage("The tutorial was updated successfully!");
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const removePortfolio = () => {
        props
            .deletePortfolio(currentPortfolio.id)
            .then(() => {
                navigate("/portfolios");
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <div>
            {currentPortfolio ? (
                <div className="edit-form">
                    <h4>Portfolio</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={currentPortfolio.title}
                                onChange={onChangeTitle}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                value={currentPortfolio.description}
                                onChange={onChangeDescription}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentPortfolio.active ? "Active" : "Pending"}
                        </div>
                    </form>

                    {currentPortfolio.active ? (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updateStatus(false)}    
                        >
                            UnActivate
                        </button>
                    ) : (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updateStatus(true)}
                        >
                            Active
                        </button>
                    )}

                    <button
                        className="badge badge-danger mr-2"
                        onClick={removePortfolio}
                    >
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateContent}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Portfolio...</p>
                </div>
            )}
        </div>
    );
}


export default connect(null, { updatePortfolio, deletePortfolio })(Portfolio);