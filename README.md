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

