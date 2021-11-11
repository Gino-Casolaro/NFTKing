import {
    CREATE_PORTFOLIO,
    RETRIEVE_PORTFOLIOS,
    UPDATE_PORTFOLIO,
    DELETE_PORTFOLIO,
    DELETE_ALL_PORTFOLIOS
} from "./types";

import PortfolioDataService from "../services/portfolio.service";

export const createPortfolio = (title, description) => async (dispatch) => {
    try {
        const res = await PortfolioDataService.create({ title, description });

        dispatch({
            type: CREATE_PORTFOLIO,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const retrievePortfolios = () => async (dispatch) => {
    try {
        const res = await PortfolioDataService.getAll();

        dispatch({
            type: RETRIEVE_PORTFOLIOS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const updatePortfolio = (id, data) => async (dispatch) => {
    try {
        console.log("updatePortfolio: " + id);
        const res = await PortfolioDataService.update(id, data);

        dispatch({
            type: UPDATE_PORTFOLIO,
            payload: data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deletePortfolio = (id) => async (dispatch) => {
    try {
        await PortfolioDataService.delete(id);

        dispatch({
            type: DELETE_PORTFOLIO,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};

export const deleteAllPortfolios = () => async (dispatch) => {
    try {
        const res = await PortfolioDataService.deleteAll();

        dispatch({
            type: DELETE_ALL_PORTFOLIOS,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const findPortfoliosByTitle = (title) => async (dispatch) => {
    try {
        const res = await PortfolioDataService.findByTitle(title);

        dispatch({
            type: RETRIEVE_PORTFOLIOS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};
