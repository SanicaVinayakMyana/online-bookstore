package com.bookstore.repository;

import com.bookstore.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;
 
public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Book> findByTitle(String title);
    
    List<Book> findByCategory(String category);
    
    List<Book> findByIsBestsellerTrue();
    
    List<Book> findByPriceBetween(Integer minPrice, Integer maxPrice);
    
    List<Book> findByRatingGreaterThanEqual(Double rating);
    
    @Query("SELECT b FROM Book b WHERE " +
           "LOWER(b.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(b.author) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "b.description LIKE CONCAT('%', :searchTerm, '%') OR " +
           "LOWER(b.category) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(b.tags) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Book> searchBooks(@Param("searchTerm") String searchTerm);
    
    @Query("SELECT DISTINCT b.category FROM Book b WHERE b.category IS NOT NULL")
    List<String> findAllCategories();
    
    @Query("SELECT b FROM Book b ORDER BY b.rating DESC, b.reviewCount DESC")
    List<Book> findTopRatedBooks();
} 