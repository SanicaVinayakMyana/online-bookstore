package com.bookstore.service;

import com.bookstore.model.User;
import com.bookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ROLE_USER");
        return userRepository.save(user);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public Optional<User> updateUser(String username, User userDetails) {
        return userRepository.findByUsername(username)
                .map(existingUser -> {
                    existingUser.setEmail(userDetails.getEmail());
                    // Do not update password here, should be a separate endpoint
                    return userRepository.save(existingUser);
                });
    }

    public void changePassword(String username, String newPassword) {
        userRepository.findByUsername(username)
                .ifPresent(user -> {
                    user.setPassword(passwordEncoder.encode(newPassword));
                    userRepository.save(user);
                });
    }

    public void updateProfilePicture(String username, String imageUrl) {
        userRepository.findByUsername(username)
                .ifPresent(user -> {
                    user.setImageUrl(imageUrl);
                    userRepository.save(user);
                });
    }
} 