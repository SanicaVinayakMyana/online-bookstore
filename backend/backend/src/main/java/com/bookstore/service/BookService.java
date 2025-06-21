package com.bookstore.service;

import com.bookstore.model.Book;
import com.bookstore.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    public Optional<Book> findById(Long id) {
        return bookRepository.findById(id);
    }

    public Book save(Book book) {
        return bookRepository.save(book);
    }

    public void deleteById(Long id) {
        bookRepository.deleteById(id);
    }

    public List<Book> searchBooks(String query) {
        return bookRepository.searchBooks(query);
    }

    public List<Book> findByCategory(String category) {
        return bookRepository.findByCategory(category);
    }

    public List<Book> findBestsellers() {
        return bookRepository.findByIsBestsellerTrue();
    }

    public List<Book> findTopRatedBooks() {
        return bookRepository.findTopRatedBooks();
    }

    public List<String> findAllCategories() {
        return bookRepository.findAllCategories();
    }

    public List<Book> filterBooks(String category, Integer minPrice, Integer maxPrice, Double minRating, String sortBy) {
        List<Book> books = bookRepository.findAll();
        
        // Apply filters
        if (category != null && !category.isEmpty()) {
            books = books.stream()
                    .filter(book -> category.equalsIgnoreCase(book.getCategory()))
                    .toList();
        }
        
        if (minPrice != null) {
            books = books.stream()
                    .filter(book -> book.getPrice() >= minPrice)
                    .toList();
        }
        
        if (maxPrice != null) {
            books = books.stream()
                    .filter(book -> book.getPrice() <= maxPrice)
                    .toList();
        }
        
        if (minRating != null) {
            books = books.stream()
                    .filter(book -> book.getRating() >= minRating)
                    .toList();
        }
        
        // Apply sorting
        if (sortBy != null) {
            switch (sortBy.toLowerCase()) {
                case "price_asc":
                    books = books.stream()
                            .sorted((b1, b2) -> b1.getPrice().compareTo(b2.getPrice()))
                            .toList();
                    break;
                case "price_desc":
                    books = books.stream()
                            .sorted((b1, b2) -> b2.getPrice().compareTo(b1.getPrice()))
                            .toList();
                    break;
                case "rating_desc":
                    books = books.stream()
                            .sorted((b1, b2) -> b2.getRating().compareTo(b1.getRating()))
                            .toList();
                    break;
                case "title_asc":
                    books = books.stream()
                            .sorted((b1, b2) -> b1.getTitle().compareToIgnoreCase(b2.getTitle()))
                            .toList();
                    break;
                default:
                    // Default sorting by ID (newest first)
                    break;
            }
        }
        
        return books;
    }
} 