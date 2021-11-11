import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { retrievePortfolios, findPortfoliosByTitle, deleteAllPortfolios } from "../actions/portfolios";

const PortfoliosList = (props) => {
    const [currentPortfolio, setCurrentPortfolio] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        props.retrievePortfolios();
    }, []);

    const onChangeSearchTitle = ((e) => {
        const searchTitle = e.target.value;

        setSearchTitle(searchTitle);
    });

    const refreshData = (() => {
        setCurrentPortfolio(null);
        setCurrentIndex(-1);
    });

    const setActivePortfolio = ((portfolio, index) => {
        setCurrentPortfolio(portfolio);
        setCurrentIndex(index);
    });

    const removeAllPortfolios = (() => {
        props
            .deleteAllPortfolios()
            .then((response) => {
                console.log(response);
                this.refreshData();
            })
            .catch((e) => {
                console.log(e);
            });
    });

    const findByTitle = (() => {
        refreshData();

        props.findPortfoliosByTitle(searchTitle);
    });

    const { portfolios } = props;

    return (
        <div className="list-row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByTitle}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Portfolios List</h4>

                <ul className="list-group">
                    {portfolios &&
                        portfolios.map((portfolio, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActivePortfolio(portfolio, index)}
                                key={index}
                            >
                                {portfolio.title}
                            </li>
                        ))}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllPortfolios}
                >
                    Remove All
                </button>
            </div>
            <div className="col-md-6">
                {currentPortfolio ? (
                    <div>
                        <h4>Portfolio</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                            {currentPortfolio.title}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {currentPortfolio.description}
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentPortfolio.active ? "Active" : "Pending"}
                        </div>

                        <Link
                            to={"/portfolios/" + currentPortfolio.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Portolio...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        portfolios: state.portfolios,
    };
};

export default connect(mapStateToProps, { retrievePortfolios, findPortfoliosByTitle, deleteAllPortfolios })(PortfoliosList);