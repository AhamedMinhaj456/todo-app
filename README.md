# Full Stack Engineer - Take Home Assessment
### Ahamed Minhaj


## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- Vitest + React Testing Library

### Backend
- Java 17
- Spring Boot
- Spring Data JPA
- Maven
- JUnit + Mockito

### Database
- MySQL 8

### DevOps
- Docker
- Docker Compose

---

## Features

- Create tasks with title and description
- Display only the **Recent 5 incomplete tasks**
- Mark tasks as completed using a "Done" button
- Completed tasks are removed from the Recent Tasks screen
- RESTful API design
- Backend unit and integration tests
- Frontend component tests
- Fully Dockerized

---

## Architecture

The application follows a **3-tier architecture**:

- **Frontend (React SPA)** → Handles UI and user interactions
- **Backend (Spring Boot API)** → Handles business logic and REST APIs
- **Database (MySQL)** → Stores task data

---

## Project Structure

```
todo-app/
├── backend/
├── db/
├── frontend/
├── docker-compose.yml
└── README.md
```

---

## Running the Application

### Start everything

```
docker compose up --build
```

### Access

Frontend: http://localhost:3000  
Backend: http://localhost:8050  

---

## Run Tests

Backend:
```
docker compose run --rm backend-test
```

Frontend:
```
docker compose run --rm frontend-test
```

---

## Stop

```
docker compose down
```

