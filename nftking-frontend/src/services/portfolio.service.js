import http from "../http-common";

class PortfolioDataService {
    getAll() {
        return http.get("/portfolios");
    }

    get(id) {
        return http.get(`/portfolios/${id}`);
    }

    create(data) {
        return http.post("/portfolios", data);
    }

    update(id, data) {
        return http.put(`/portfolios/${id}`, data);
    }

    delete(id) {
        return http.delete(`/portfolios/${id}`);
    }

    deleteAll() {
        return http.delete(`/portfolios`);
    }

    findByTitle(title) {
        return http.get(`/portfolios?title=${title}`);
    }
}

export default new PortfolioDataService();