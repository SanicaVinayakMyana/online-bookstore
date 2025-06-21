package com.bookstore.dto;

import com.bookstore.model.OrderItem;

public class OrderItemDTO {
    private Long id;
    private int quantity;
    private double price;
    private BookDTO book;

    public OrderItemDTO(OrderItem orderItem) {
        this.id = orderItem.getId();
        this.quantity = orderItem.getQuantity();
        this.price = orderItem.getPrice();
        this.book = new BookDTO(orderItem.getBook());
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public BookDTO getBook() { return book; }
    public void setBook(BookDTO book) { this.book = book; }
} 