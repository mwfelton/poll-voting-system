# Poll Voting System

## Overview
This is a poll voting system where users can create polls, vote on existing polls, and view voting metrics. The system consists of a React frontend, a Java Spring Boot backend, and a PostgreSQL database.

## Tech Stack
- **Frontend**: React (poll-voting-frontend)
- **Backend**: Java with Spring Boot (poll-voting-backend)
- **Database**: PostgreSQL (poll_db)

## Project Structure
```
/poll-voting-app
│── poll-voting-frontend/   # React frontend
│── poll-voting-backend/    # Spring Boot backend
└── README.md               # Project documentation
```

## Database Setup
- Database: `poll_db`
- Tables:
  - `poll`: Stores poll questions
  - `poll_option`: Stores poll options linked to polls
  - `vote`: Stores votes and timestamps

## Running the Project
### Backend (Spring Boot)
1. Navigate to the backend directory:
   ```sh
   cd poll-voting-backend
   ```
2. Run the Spring Boot application:
   ```sh
   ./mvnw spring-boot:run
   ```

### Frontend (React)
1. Navigate to the frontend directory:
   ```sh
   cd poll-voting-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm start
   ```

## API Endpoints (Planned)
- `POST /polls` → Create a new poll
- `GET /polls` → Fetch active polls
- `POST /votes` → Submit a vote
- `GET /votes/{pollId}` → Retrieve vote metrics for a poll

## Notes
- Ensure PostgreSQL is running and configured correctly.
- Future updates will include authentication and UI enhancements.

---
This README will be updated as more features are implemented.


# Getting Started
Follow these steps to get the app up and running locally after cloning the repository:

1. Clone the Repository
Clone the repository to your local machine:

cd poll-voting-backend

2. Set Up Configuration
Copy the Example Configuration

Create the application.properties next to application-example.properties and copy the application-example.properties file contents to application.properties:

Open application.properties and update the following properties with the values I provide

Database Configuration:

spring.datasource.url=jdbc:mysql://localhost:3306/mydb (update with your database URL)
spring.datasource.username=your_db_user (replace with your DB username)
spring.datasource.password=your_db_password (replace with your DB password)

3. Build and Run the Application
Once you've updated your configuration, you can run the app using Maven (you will need to have Maven installed):

mvn spring-boot:run

This will start the application on the default port (usually 8080).

4. Access the App
Once the app is running, you can access it at http://localhost:8080.
