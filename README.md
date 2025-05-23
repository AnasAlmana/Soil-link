# Soil Composting Prediction App

This project provides a web application for predicting remaining composting hours based on environmental conditions. It consists of a FastAPI backend and a React (Vite) frontend.

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed
- [Node.js and npm](https://nodejs.org/) installed (for frontend)

## Project Structure

- `backend/`: FastAPI backend for prediction API
- `frontend/`: React frontend (Vite, TypeScript, Tailwind CSS)
- `docker-compose.yml`: For backend container orchestration

## Running the Project (Backend in Docker, Frontend Locally)

### 1. **Start the Backend using Docker Compose**

Open a terminal in the project root and run:

```sh
# Start only the backend service
# This will build and run the backend container, exposing it on port 8000
# The latest_prediction.json file will be persisted in the backend directory

docker-compose up --build backend
```

- The backend API will be available at [http://localhost:8000](http://localhost:8000)
- API docs: [http://localhost:8000/docs](http://localhost:8000/docs)

### 2. **Start the Frontend Locally**

Open a new terminal and run:

```sh
cd frontend
npm install
npm run dev
```

- The frontend will be available at [http://localhost:8080](http://localhost:8080)
- The frontend is configured (via Vite proxy) to forward API requests to the backend at `localhost:8000`.

### 3. **Access the Application**

- Open [http://localhost:8080](http://localhost:8080) in your browser to use the app.

### 4. **Stopping the Services**

- To stop the backend, press `Ctrl+C` in the terminal running Docker Compose.
- To stop the frontend, press `Ctrl+C` in the terminal running `npm run dev`.

## Development Notes

- **Hot Reloading:**
  - Backend code changes in `backend/app` will reflect in the running container due to the volume mount.
  - Frontend uses Vite's hot module replacement for instant UI updates.

- **Dependencies:**
  - Backend: Python 3.11, FastAPI, Uvicorn, Pandas, NumPy, scikit-learn, Joblib, Pydantic
  - Frontend: React, Vite, TypeScript, Tailwind CSS, shadcn-ui

## Customization

- To change backend logic, edit files in `backend/app/`.
- To change frontend UI, edit files in `frontend/src/`.

## Troubleshooting

- Ensure ports 8000 (backend) and 8080 (frontend) are free.
- If you encounter issues, try rebuilding the backend:
  ```sh
  docker-compose up --build backend
  ```
- If the frontend cannot reach the backend, make sure the backend is running and accessible at `localhost:8000`.

---

**Enjoy using the Soil Composting Prediction App!** 