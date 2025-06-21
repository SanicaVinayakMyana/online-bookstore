package com.bookstore.repository;

import com.bookstore.model.Order;
import com.bookstore.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
    Optional<Order> findByUserAndStatus(User user, String status);
} 