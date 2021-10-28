package com.nftking.app.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Portfolio")
public class Portfolio {
    @Id
    private String id;
    private String title;
    private String description;
    private boolean active;

    public Portfolio() {

    }

    public Portfolio(String title, String description, boolean active) {
        this.title = title;
        this.description = description;
        this.active = active;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    @Override
    public String toString() {
        return "Portfolio [id=" + id + ", title=" + title + ", description=" + description
                + ", active=" + active + "]";
    }

}
