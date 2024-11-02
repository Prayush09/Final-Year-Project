# Roommate Matchmaking App

Welcome to the **Roommate Matchmaking App**, a web application designed to connect potential roommates based on their preferences using machine learning algorithms. This project leverages modern technologies to create a seamless user experience for finding the ideal living situation.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Registration & Login**: Secure registration and authentication using JWT and cookies.
- **Profile Creation**: Users can create and update profiles with their preferences.
- **Roommate Matching**: Machine learning algorithms to suggest potential roommates based on user-defined criteria.
- **Messaging System**: Communicate with potential roommates directly through the app.

## Technologies Used
This project utilizes a range of powerful technologies:

- **Backend**:
  - **Node.js**: JavaScript runtime for building scalable network applications.
  - **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
  - **PostgreSQL**: A powerful, open-source relational database system for storing user data.
  - **Bcrypt.js**: Library for hashing passwords for secure storage.
  - **JSON Web Tokens (JWT)**: For secure user authentication and session management.
  
- **Frontend**:
  - **React**: A JavaScript library for building user interfaces.
  - **CSS**: For styling the application and creating a responsive design.
  
- **Machine Learning**:
  - Algorithms for roommate matching based on user preferences (to be implemented).

## Getting Started
To get a local copy up and running, follow these steps:

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/roommate-matchmaking.git
2. Navigate to the project directory:
   ```bash
   cd roommate-matchmaking
3. Install the dependancies:
   ```bash
   npm install
4. Set up your .env file:
   - Create a .env file in the root directory and add your environment variables (e.g., database connection details, JWT secret).
5. Start the server:
   ```bash
   npm run start

## API Endpoints
Here are some of the main API endpoints available:

| Method | Endpoint              | Description                        |
|--------|-----------------------|------------------------------------|
| POST   | `/api/users/register` | Register a new user                |
| POST   | `/api/users/login`    | Login an existing user             |
| GET    | `/api/users/profile`  | Get user profile details           |
| POST   | `/api/match`          | Get potential roommate matches     |

## Folder Strucutre
Here's an overview of the project structure: 
## Project Structure

| Directory / File        | Description                                       |
|-------------------------|---------------------------------------------------|
| `roommate-matchmaking/` | Main project folder                               |
| ├── `src/`              | Source code directory                             |
| │   ├── `config/`       | Configuration files (e.g., environment variables) |
| │   ├── `controllers/`  | Controllers for handling requests and responses   |
| │   ├── `models/`       | Database models and schemas                       |
| │   ├── `services/`     | Business logic and services for each feature      |
| │   ├── `routes/`       | API route definitions                             |
| │   ├── `middlewares/`  | Middleware functions for request handling         |
| │   ├── `utils/`        | Utility functions and helper methods              |
| │   ├── `app.js`        | Main application setup and middleware configuration |
| │   └── `server.js`     | Entry point to start the server                   |
| └── `.env`              | Environment variables                             |



## License  
- This projec is licensed under the MIT License.

---

Thank you for checking out the Roomate Matchmaking App! Feel Free to reach out for any questions or suggestions! 
- Prayush Giri Over and Out!

---

