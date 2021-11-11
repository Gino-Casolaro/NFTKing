import {
    CREATE_PORTFOLIO,
    RETRIEVE_PORTFOLIOS,
    UPDATE_PORTFOLIO,
    DELETE_PORTFOLIO,
    DELETE_ALL_PORTFOLIOS,
} from "../actions/types";

const initialState = [];

function portfolioReducer(portfolios = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CREATE_PORTFOLIO:
            return [...portfolios, payload];
        
        case RETRIEVE_PORTFOLIOS:
            return payload;
        
        case UPDATE_PORTFOLIO:
            return portfolios.map((portfolio) => {
                if (portfolio.id === payload.id) {
                    return {
                        ...portfolio,
                        ...payload,
                    };
                } else {
                    return portfolio;
                }
            });
        
        case DELETE_PORTFOLIO:
            return portfolios.filter(({ id }) => id !== payload.id);

        case DELETE_ALL_PORTFOLIOS:
            return [];

        default:
            return portfolios;
    }
};

export default portfolioReducer;