package com.nftking.app.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.nftking.app.model.Portfolio;

public interface PortfolioRepository extends MongoRepository<Portfolio, String> {
    List<Portfolio> findByTitleContaining(String title);

    List<Portfolio> findByActive(boolean active);
}
