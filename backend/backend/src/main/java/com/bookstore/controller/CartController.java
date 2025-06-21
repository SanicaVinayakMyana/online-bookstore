package com.bookstore.controller;

import com.bookstore.dto.CartDTO;
import com.bookstore.model.Book;
import com.bookstore.model.Order;
import com.bookstore.model.OrderItem;
import com.bookstore.model.User;
import com.bookstore.repository.BookRepository;
import com.bookstore.repository.OrderItemRepository;
import com.bookstore.repository.OrderRepository;
import com.bookstore.repository.UserRepository;
import com.bookstore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private OrderService orderService;

    private Order getOrCreateCart(User user) {
        return orderRepository.findByUserAndStatus(user, "PENDING")
                .orElseGet(() -> {
                    Order newCart = new Order();
                    newCart.setUser(user);
                    newCart.setOrderDate(LocalDateTime.now());
                    newCart.setStatus("PENDING");
                    newCart.setTotal(0.0);
                    return orderRepository.save(newCart);
                });
    }

    private void recalculateCartTotal(Order cart) {
        cart.setTotal(cart.getItems().stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum());
        orderRepository.save(cart);
    }

    @GetMapping
    @Transactional(readOnly = true)
    public ResponseEntity<CartDTO> getCart(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));
        Order cart = getOrCreateCart(user);
        return ResponseEntity.ok(new CartDTO(cart));
    }

    @PostMapping("/add")
    @Transactional
    public ResponseEntity<CartDTO> addToCart(@RequestBody AddToCartRequest request, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));
        Book book = bookRepository.findById(request.getBookId()).orElseThrow(() -> new RuntimeException("Book not found"));
        Order cart = getOrCreateCart(user);

        cart.getItems().stream()
                .filter(item -> item.getBook().getId().equals(book.getId()))
                .findFirst()
                .ifPresentOrElse(
                        item -> item.setQuantity(item.getQuantity() + request.getQuantity()),
                        () -> {
                            OrderItem newItem = new OrderItem();
                            newItem.setBook(book);
                            newItem.setQuantity(request.getQuantity());
                            newItem.setPrice(book.getPrice().doubleValue());
                            newItem.setOrder(cart);
                            cart.getItems().add(newItem);
                        }
                );

        recalculateCartTotal(cart);

        return ResponseEntity.ok(new CartDTO(cart));
    }
    
    @PutMapping("/update")
    @Transactional
    public ResponseEntity<CartDTO> updateCartItem(@RequestBody UpdateCartItemRequest request, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));
        Order cart = getOrCreateCart(user);
        OrderItem item = orderItemRepository.findById(request.getOrderItemId()).orElseThrow(() -> new RuntimeException("Item not found"));

        if (!item.getOrder().getId().equals(cart.getId())) {
            return ResponseEntity.status(403).build();
        }

        item.setQuantity(request.getQuantity());
        orderItemRepository.save(item);
        recalculateCartTotal(cart);
        return ResponseEntity.ok(new CartDTO(cart));
    }

    @DeleteMapping("/remove/{orderItemId}")
    @Transactional
    public ResponseEntity<CartDTO> removeCartItem(@PathVariable Long orderItemId, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));
        Order cart = getOrCreateCart(user);
        
        boolean removed = cart.getItems().removeIf(item -> item.getId().equals(orderItemId));

        if (!removed) {
            return ResponseEntity.notFound().build();
        }

        recalculateCartTotal(cart);

        return ResponseEntity.ok(new CartDTO(cart));
    }

    @PostMapping("/checkout")
    @Transactional
    public ResponseEntity<?> checkout(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));
        Order cart = orderRepository.findByUserAndStatus(user, "PENDING").orElseThrow(() -> new RuntimeException("Cart not found"));

        if (cart.getItems().isEmpty()) {
            return ResponseEntity.badRequest().body("Cart is empty");
        }

        cart.setStatus("PLACED");
        cart.setOrderDate(LocalDateTime.now());
        orderRepository.save(cart);

        return ResponseEntity.ok().build();
    }
}

class AddToCartRequest {
    private Long bookId;
    private int quantity;
    public Long getBookId() { return bookId; }
    public void setBookId(Long bookId) { this.bookId = bookId; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}

class UpdateCartItemRequest {
    private Long orderItemId;
    private int quantity;
    public Long getOrderItemId() { return orderItemId; }
    public void setOrderItemId(Long orderItemId) { this.orderItemId = orderItemId; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
} 