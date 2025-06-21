package com.bookstore.dto;

import com.bookstore.model.Book;

public class BookDTO {
    private Long id;
    private String title;
    private String imageUrl;

    public BookDTO(Book book) {
        this.id = book.getId();
        this.title = book.getTitle();
        this.imageUrl = book.getImageUrl();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
} 