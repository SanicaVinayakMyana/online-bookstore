package com.bookstore.controller;

import com.bookstore.model.Book;
import com.bookstore.model.Review;
import com.bookstore.model.User;
import com.bookstore.repository.BookRepository;
import com.bookstore.repository.UserRepository;
import com.bookstore.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import com.bookstore.dto.ReviewDTO;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/book/{bookId}")
    public List<ReviewDTO> getReviewsForBook(@PathVariable Long bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow();
        return reviewService.findByBook(book).stream()
                .map(ReviewDTO::new)
                .collect(Collectors.toList());
    }

    @PostMapping("/book/{bookId}")
    public ResponseEntity<ReviewDTO> addReview(@PathVariable Long bookId, @RequestBody Review review, @AuthenticationPrincipal UserDetails userDetails) {
        Book book = bookRepository.findById(bookId).orElseThrow();
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        review.setBook(book);
        review.setUser(user);
        review.setCreatedAt(LocalDateTime.now());
        Review savedReview = reviewService.save(review);
        return ResponseEntity.ok(new ReviewDTO(savedReview));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        Review review = reviewService.findById(id).orElseThrow();
        if (!review.getUser().getUsername().equals(userDetails.getUsername())) {
            return ResponseEntity.status(403).build();
        }
        reviewService.deleteById(id);
        return ResponseEntity.ok().build();
    }
} 