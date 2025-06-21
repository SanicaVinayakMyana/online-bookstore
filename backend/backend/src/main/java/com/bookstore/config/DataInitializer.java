package com.bookstore.config;

import com.bookstore.model.Book;
import com.bookstore.repository.BookRepository;
import com.bookstore.model.User;
import com.bookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Check if we need to add more books (if we have less than 20 books)
        if (bookRepository.count() < 20) {
            // Modern Fiction
            if (bookRepository.findByTitle("The Alchemist").isEmpty()) {
                Book book4 = new Book();
                book4.setTitle("The Alchemist");
                book4.setAuthor("Paulo Coelho");
                book4.setPrice(15);
                book4.setStock(80);
                book4.setImageUrl("https://images.gr-assets.com/books/1483412266l/865.jpg");
                book4.setDescription("A magical story about following your dreams and listening to your heart.");
                book4.setCategory("Modern Fiction");
                book4.setTags("inspiration,adventure,philosophy");
                book4.setRating(4.2);
                book4.setReviewCount(1250);
                book4.setIsBestseller(true);
                bookRepository.save(book4);
            }

            if (bookRepository.findByTitle("The Kite Runner").isEmpty()) {
                Book book5 = new Book();
                book5.setTitle("The Kite Runner");
                book5.setAuthor("Khaled Hosseini");
                book5.setPrice(14);
                book5.setStock(60);
                book5.setImageUrl("https://images.gr-assets.com/books/1484565687l/77203.jpg");
                book5.setDescription("An unforgettable, heartbreaking story of the unlikely friendship between a wealthy boy and the son of his father's servant.");
                book5.setCategory("Modern Fiction");
                book5.setTags("friendship,redemption,afghanistan");
                book5.setRating(4.4);
                book5.setReviewCount(980);
                book5.setIsBestseller(true);
                bookRepository.save(book5);
            }

            // Science Fiction
            if (bookRepository.findByTitle("Dune").isEmpty()) {
                Book book6 = new Book();
                book6.setTitle("Dune");
                book6.setAuthor("Frank Herbert");
                book6.setPrice(18);
                book6.setStock(40);
                book6.setImageUrl("https://images.gr-assets.com/books/1555447414l/44767458.jpg");
                book6.setDescription("Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world.");
                book6.setCategory("Science Fiction");
                book6.setTags("space,adventure,politics");
                book6.setRating(4.6);
                book6.setReviewCount(2100);
                book6.setIsBestseller(true);
                bookRepository.save(book6);
            }

            if (bookRepository.findByTitle("The Martian").isEmpty()) {
                Book book7 = new Book();
                book7.setTitle("The Martian");
                book7.setAuthor("Andy Weir");
                book7.setPrice(16);
                book7.setStock(70);
                book7.setImageUrl("https://images.gr-assets.com/books/1413706054l/18007564.jpg");
                book7.setDescription("A novel about an astronaut stranded on Mars who must find a way to survive and signal Earth that he's alive.");
                book7.setCategory("Science Fiction");
                book7.setTags("mars,survival,space");
                book7.setRating(4.3);
                book7.setReviewCount(1650);
                book7.setIsBestseller(false);
                bookRepository.save(book7);
            }

            // Fantasy
            if (bookRepository.findByTitle("The Name of the Wind").isEmpty()) {
                Book book8 = new Book();
                book8.setTitle("The Name of the Wind");
                book8.setAuthor("Patrick Rothfuss");
                book8.setPrice(20);
                book8.setStock(45);
                book8.setImageUrl("https://images.gr-assets.com/books/1270352123l/186074.jpg");
                book8.setDescription("The riveting first-person narrative of a young man who grows to be the most notorious magician his world has ever seen.");
                book8.setCategory("Fantasy");
                book8.setTags("magic,adventure,coming-of-age");
                book8.setRating(4.5);
                book8.setReviewCount(1890);
                book8.setIsBestseller(true);
                bookRepository.save(book8);
            }

            if (bookRepository.findByTitle("The Way of Kings").isEmpty()) {
                Book book9 = new Book();
                book9.setTitle("The Way of Kings");
                book9.setAuthor("Brandon Sanderson");
                book9.setPrice(22);
                book9.setStock(35);
                book9.setImageUrl("https://images.gr-assets.com/books/1659905828l/7235533.jpg");
                book9.setDescription("The first book in the Stormlight Archive series, set in a world of stone and storms.");
                book9.setCategory("Fantasy");
                book9.setTags("epic fantasy,world-building,storms");
                book9.setRating(4.7);
                book9.setReviewCount(2300);
                book9.setIsBestseller(true);
                bookRepository.save(book9);
            }

            // Mystery/Thriller
            if (bookRepository.findByTitle("Gone Girl").isEmpty()) {
                Book book10 = new Book();
                book10.setTitle("Gone Girl");
                book10.setAuthor("Gillian Flynn");
                book10.setPrice(13);
                book10.setStock(65);
                book10.setImageUrl("https://images.gr-assets.com/books/1339602131l/19288043.jpg");
                book10.setDescription("A woman disappears on the day of her fifth wedding anniversary. Was she kidnapped, or did she run away?");
                book10.setCategory("Mystery/Thriller");
                book10.setTags("psychological thriller,mystery,marriage");
                book10.setRating(4.1);
                book10.setReviewCount(1450);
                book10.setIsBestseller(true);
                bookRepository.save(book10);
            }

            if (bookRepository.findByTitle("The Silent Patient").isEmpty()) {
                Book book11 = new Book();
                book11.setTitle("The Silent Patient");
                book11.setAuthor("Alex Michaelides");
                book11.setPrice(17);
                book11.setStock(55);
                book11.setImageUrl("https://images.gr-assets.com/books/1668782119l/40097951.jpg");
                book11.setDescription("A psychological thriller about a woman who shoots her husband and then never speaks again.");
                book11.setCategory("Mystery/Thriller");
                book11.setTags("psychological thriller,silence,mystery");
                book11.setRating(4.0);
                book11.setReviewCount(890);
                book11.setIsBestseller(false);
                bookRepository.save(book11);
            }

            // Contemporary Fiction
            if (bookRepository.findByTitle("The Midnight Library").isEmpty()) {
                Book book12 = new Book();
                book12.setTitle("The Midnight Library");
                book12.setAuthor("Matt Haig");
                book12.setPrice(16);
                book12.setStock(75);
                book12.setImageUrl("https://images.gr-assets.com/books/1602190253l/52578297.jpg");
                book12.setDescription("Between life and death there is a library, and within that library, the shelves go on forever.");
                book12.setCategory("Contemporary Fiction");
                book12.setTags("life choices,philosophy,library");
                book12.setRating(4.2);
                book12.setReviewCount(1100);
                book12.setIsBestseller(true);
                bookRepository.save(book12);
            }

            if (bookRepository.findByTitle("Klara and the Sun").isEmpty()) {
                Book book13 = new Book();
                book13.setTitle("Klara and the Sun");
                book13.setAuthor("Kazuo Ishiguro");
                book13.setPrice(19);
                book13.setStock(50);
                book13.setImageUrl("https://images.gr-assets.com/books/1594633119l/54120408.jpg");
                book13.setDescription("A novel about the nature of love and what it means to be human, told through the eyes of an AI.");
                book13.setCategory("Contemporary Fiction");
                book13.setTags("ai,humanity,love");
                book13.setRating(4.1);
                book13.setReviewCount(750);
                book13.setIsBestseller(false);
                bookRepository.save(book13);
            }

            // Non-Fiction
            if (bookRepository.findByTitle("Sapiens: A Brief History of Humankind").isEmpty()) {
                Book book14 = new Book();
                book14.setTitle("Sapiens: A Brief History of Humankind");
                book14.setAuthor("Yuval Noah Harari");
                book14.setPrice(21);
                book14.setStock(40);
                book14.setImageUrl("https://images.gr-assets.com/books/1420595954l/23692271.jpg");
                book14.setDescription("A groundbreaking narrative of humanity's creation and evolution that explores the ways in which biology and history have defined us.");
                book14.setCategory("Non-Fiction");
                book14.setTags("history,evolution,humanity");
                book14.setRating(4.4);
                book14.setReviewCount(3200);
                book14.setIsBestseller(true);
                bookRepository.save(book14);
            }

            if (bookRepository.findByTitle("Atomic Habits").isEmpty()) {
                Book book15 = new Book();
                book15.setTitle("Atomic Habits");
                book15.setAuthor("James Clear");
                book15.setPrice(18);
                book15.setStock(85);
                book15.setImageUrl("https://images.gr-assets.com/books/1535115320l/40121378.jpg");
                book15.setDescription("An easy and proven way to build good habits and break bad ones.");
                book15.setCategory("Self-Help");
                book15.setTags("habits,productivity,self-improvement");
                book15.setRating(4.5);
                book15.setReviewCount(2800);
                book15.setIsBestseller(true);
                bookRepository.save(book15);
            }

            // Young Adult
            if (bookRepository.findByTitle("The Fault in Our Stars").isEmpty()) {
                Book book16 = new Book();
                book16.setTitle("The Fault in Our Stars");
                book16.setAuthor("John Green");
                book16.setPrice(12);
                book16.setStock(90);
                book16.setImageUrl("https://images.gr-assets.com/books/1360206420l/11870085.jpg");
                book16.setDescription("Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal.");
                book16.setCategory("Young Adult");
                book16.setTags("romance,cancer,teen");
                book16.setRating(4.3);
                book16.setReviewCount(4500);
                book16.setIsBestseller(true);
                bookRepository.save(book16);
            }

            if (bookRepository.findByTitle("The Hunger Games").isEmpty()) {
                Book book17 = new Book();
                book17.setTitle("The Hunger Games");
                book17.setAuthor("Suzanne Collins");
                book17.setPrice(11);
                book17.setStock(100);
                book17.setImageUrl("https://images.gr-assets.com/books/1447303603l/2767052.jpg");
                book17.setDescription("In the ruins of a place once known as North America lies the nation of Panem, a shining Capitol surrounded by twelve outlying districts.");
                book17.setCategory("Young Adult");
                book17.setTags("dystopian,adventure,survival");
                book17.setRating(4.4);
                book17.setReviewCount(5200);
                book17.setIsBestseller(true);
                bookRepository.save(book17);
            }

            // Business/Self-Help
            if (bookRepository.findByTitle("Rich Dad Poor Dad").isEmpty()) {
                Book book18 = new Book();
                book18.setTitle("Rich Dad Poor Dad");
                book18.setAuthor("Robert T. Kiyosaki");
                book18.setPrice(15);
                book18.setStock(70);
                book18.setImageUrl("https://images.gr-assets.com/books/1388211242l/69571.jpg");
                book18.setDescription("What the rich teach their kids about money that the poor and middle class do not!");
                book18.setCategory("Business");
                book18.setTags("finance,wealth,money");
                book18.setRating(4.0);
                book18.setReviewCount(1800);
                book18.setIsBestseller(false);
                bookRepository.save(book18);
            }

            if (bookRepository.findByTitle("Think and Grow Rich").isEmpty()) {
                Book book19 = new Book();
                book19.setTitle("Think and Grow Rich");
                book19.setAuthor("Napoleon Hill");
                book19.setPrice(9);
                book19.setStock(80);
                book19.setImageUrl("https://images.gr-assets.com/books/1634158558l/30186948.jpg");
                book19.setDescription("Based on the author's famed Law of Success Philosophy, this masterwork presents thirteen powerful principles that form a philosophy of personal achievement.");
                book19.setCategory("Self-Help");
                book19.setTags("success,mindset,achievement");
                book19.setRating(4.2);
                book19.setReviewCount(2100);
                book19.setIsBestseller(false);
                bookRepository.save(book19);
            }

            // Romance
            if (bookRepository.findByTitle("The Notebook").isEmpty()) {
                Book book20 = new Book();
                book20.setTitle("The Notebook");
                book20.setAuthor("Nicholas Sparks");
                book20.setPrice(10);
                book20.setStock(95);
                book20.setImageUrl("https://images.gr-assets.com/books/1385738917l/3488.jpg");
                book20.setDescription("A story of miracles and emotions that will stay with you forever.");
                book20.setCategory("Romance");
                book20.setTags("love,romance,emotions");
                book20.setRating(4.1);
                book20.setReviewCount(3400);
                book20.setIsBestseller(true);
                bookRepository.save(book20);
            }
        }

        // Update existing books with categories and ratings
        List<Book> existingBooks = bookRepository.findAll();
        for (Book book : existingBooks) {
            boolean updated = false;
            
            if (book.getCategory() == null) {
                if (book.getTitle().equals("The Great Gatsby")) {
                    book.setCategory("Classic Literature");
                    book.setTags("classic,america,wealth");
                    book.setRating(4.3);
                    book.setReviewCount(2800);
                    book.setIsBestseller(true);
                    updated = true;
                } else if (book.getTitle().equals("To Kill a Mockingbird")) {
                    book.setCategory("Classic Literature");
                    book.setTags("classic,justice,racism");
                    book.setRating(4.5);
                    book.setReviewCount(3500);
                    book.setIsBestseller(true);
                    updated = true;
                } else if (book.getTitle().equals("1984")) {
                    book.setCategory("Classic Literature");
                    book.setTags("classic,dystopian,politics");
                    book.setRating(4.4);
                    book.setReviewCount(4200);
                    book.setIsBestseller(true);
                    updated = true;
                }
            }
            
            if (updated) {
                bookRepository.save(book);
            }
        }

        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("adminpass"));
            admin.setEmail("admin@example.com");
            admin.setRole("ADMIN");
            userRepository.save(admin);

            User user = new User();
            user.setUsername("user");
            user.setPassword(passwordEncoder.encode("userpass"));
            user.setEmail("user@example.com");
            user.setRole("USER");
            userRepository.save(user);
        }
    }
} 