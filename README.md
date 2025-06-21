
# 📚 Online Bookstore

A full-stack web application for browsing, purchasing, and managing books online — built using **Spring Boot**, **React**, and **PostgreSQL**.

<img width="1220" alt="Screenshot 2025-06-21 at 5 41 29 PM" src="https://github.com/user-attachments/assets/9c9c9b78-d239-4bd9-8f8d-337b7f7e029b" />

<img width="1203" alt="Screenshot 2025-06-21 at 5 41 55 PM" src="https://github.com/user-attachments/assets/37c62aad-e10c-4d96-b53e-472b925e85fd" />

<img width="1202" alt="Screenshot 2025-06-21 at 5 42 08 PM" src="https://github.com/user-attachments/assets/7bc1e698-291e-425d-8e9b-abf64dbec069" />

<img width="1228" alt="Screenshot 2025-06-21 at 5 42 33 PM" src="https://github.com/user-attachments/assets/f64b8928-8d32-4f2b-9c3c-072576b6f513" />

<img width="1207" alt="Screenshot 2025-06-21 at 5 42 50 PM" src="https://github.com/user-attachments/assets/02be7818-6148-4c3d-8784-99678ee114ee" />

<img width="932" alt="Screenshot 2025-06-21 at 5 43 15 PM" src="https://github.com/user-attachments/assets/c3c1e0d5-02b1-4703-b882-5c6d1190c54c" />

<img width="1215" alt="Screenshot 2025-06-21 at 5 44 19 PM" src="https://github.com/user-attachments/assets/0a4d6841-3ea7-4bcf-ab90-96bed46ac939" />

<img width="1237" alt="Screenshot 2025-06-21 at 5 44 28 PM" src="https://github.com/user-attachments/assets/450f7a40-1c1c-4825-ad31-c576bb97fc5b" />

<img width="1221" alt="Screenshot 2025-06-21 at 5 48 39 PM" src="https://github.com/user-attachments/assets/58b98e9e-d208-460e-aed0-24b58bb091c9" />

<img width="1224" alt="Screenshot 2025-06-21 at 5 45 10 PM" src="https://github.com/user-attachments/assets/74cdc8f2-6303-4e0e-ac98-a00862150598" />

Perfect, Sanica! Here's the **exact full content** of your improved `README.md` that you can **copy-paste directly** into your GitHub repository:

---




## 🚀 Features

- 🔐 User authentication with role-based access (Admin/User)
- 📖 Browse, search, and filter books
- 🛒 Add to cart and checkout
- 📦 Admin panel for managing books, orders, and users
- 💳 Integration-ready for payment gateways like Stripe (via environment config)

---

## 🛠️ Tech Stack

- **Backend**: Java 17, Spring Boot, Spring Security, JPA, PostgreSQL
- **Frontend**: React, Tailwind CSS, Axios
- **Build Tools**: Maven, npm

---

## 📦 Getting Started

### ✅ Prerequisites

- Java 17+
- Maven
- Node.js v18+
- PostgreSQL (or update DB config accordingly)

---

### 🔁 1. Clone the Repository

```bash
git clone https://github.com/SanicaVinayakMyana/online-bookstore.git
cd online-bookstore
````

---

### 🧩 2. Backend Setup

1. **Database Configuration**

   * Create a PostgreSQL database (e.g., `bookstore_db`).
   * Update the DB credentials in:

     ```
     backend/backend/src/main/resources/application.properties
     ```

2. **Build and Run the Backend**

   ```bash
   cd backend/backend
   mvn clean install
   mvn spring-boot:run
   ```

   * App runs at: [http://localhost:8080](http://localhost:8080)

---

### 🎨 3. Frontend Setup

```bash
cd ../../frontend
npm install
npm start
```

* React app runs at: [http://localhost:3000](http://localhost:3000)

---

### 🔐 4. Environment Variables

* **Do not commit secrets or tokens to the repo.**
* Use a `.env` file (already ignored via `.gitignore`) to store sensitive keys like:

  ```env
  REACT_APP_API_URL=http://localhost:8080
  STRIPE_PUBLIC_KEY=your_key_here
  ```

---

## 👩‍💻 Usage

* Register as a user or login using existing credentials.
* Add books to your cart and proceed to checkout.
* If logged in as an admin, access the dashboard to manage:

  * 📚 Books
  * 👥 Users
  * 📦 Orders

---

## 📝 License

This project is licensed under the **MIT License**.
See the [LICENSE](LICENSE) file for more information.

---

## 🤝 Contributing

Pull requests are welcome!

For major changes:

* Open an issue first to discuss what you'd like to change.
* Follow conventional commit practices if possible.

---

## 🙋‍♀️ Author

Created by [Sanica Vinayak Myana](https://github.com/SanicaVinayakMyana)

---

```

---



