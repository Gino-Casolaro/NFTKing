package com.nftking.app.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.nftking.app.model.Portfolio;
import com.nftking.app.repository.PortfolioRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class RepositoryController {

    @Autowired
    PortfolioRepository portfolioRepository;

    @GetMapping("/portfolios")
    public ResponseEntity<List<Portfolio>> getAllPortfolios(
            @RequestParam(required = false) String title) {
        try {
            List<Portfolio> portfolios = new ArrayList<Portfolio>();

            if (title == null) {
                portfolioRepository.findAll().forEach(portfolios::add);
            } else {
                portfolioRepository.findByTitleContaining(title).forEach(portfolios::add);
            }

            if (portfolios.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(portfolios, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/portfolios/{id}")
    public ResponseEntity<Portfolio> getPortfolioById(@PathVariable("id") String id) {
        Optional<Portfolio> portfolioData = portfolioRepository.findById(id);

        if (portfolioData.isPresent()) {
            return new ResponseEntity<>(portfolioData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/portfolios")
    public ResponseEntity<Portfolio> createPortfolio(@RequestBody Portfolio portfolio) {
        try {
            Portfolio _portfolio = portfolioRepository.save(new Portfolio(portfolio.getTitle(), portfolio.getDescription(), false));)
            return new ResponseEntity<>(_portfolio, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/portfolios/{id}")
    public ResponseEntity<Portfolio> updatePortfolio(@PathVariable("id") String id,
            @RequestBody Portfolio portfolio) {

        return null;
    }

    @DeleteMapping("/portfolios/{id}")
    public ResponseEntity<HttpStatus> deletePortfolio(@PathVariable("id") String id) {
        try {
            portfolioRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/portfolios")
    public ResponseEntity<HttpStatus> deleteAllPortfolio() {
        try {
            portfolioRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/portfolio/active")
    public ResponseEntity<List<Portfolio>> findByActive() {
        try {
            List<Portfolio> portfolios = portfolioRepository.findByActive(true);

            if (portfolios.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(portfolios, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
