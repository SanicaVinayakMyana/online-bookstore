package com.bookstore.dto;

import com.bookstore.model.Order;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class CartDTO {
    private Long id;
    private LocalDateTime orderDate;
    private String status;
    private Double total;
    private List<OrderItemDTO> items;

    public CartDTO(Order order) {
        this.id = order.getId();
        this.orderDate = order.getOrderDate();
        this.status = order.getStatus();
        this.total = order.getTotal();
        this.items = order.getItems().stream().map(OrderItemDTO::new).collect(Collectors.toList());
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LocalDateTime getOrderDate() { return orderDate; }
    public void setOrderDate(LocalDateTime orderDate) { this.orderDate = orderDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }
    public List<OrderItemDTO> getItems() { return items; }
    public void setItems(List<OrderItemDTO> items) { this.items = items; }
} 