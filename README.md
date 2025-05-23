# Soil Composting Prediction App

This project provides a web application for predicting remaining composting hours based on environmental conditions. It consists of a FastAPI backend and a React (Vite) frontend, both containerized and orchestrated using Docker Compose.

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed
- [Docker Compose](https://docs.docker.com/compose/) (if not included with Docker)

## Project Structure

- `backend/`: FastAPI backend for prediction API
- `frontend/`: React frontend (Vite, TypeScript, Tailwind CSS)
- `docker-compose.yml`: Orchestrates frontend and backend containers

## Running the Project with Docker Compose

1. **Clone the repository:**
   ```sh
   git clone https://github.com/AnasAlmana/Soil-link.git
   cd Soil-link
   ```

2. **Build and start the containers:**
   ```sh
   docker-compose up --build
   ```
   This will:
   - Build the backend (FastAPI) and frontend (React) images
   - Start both services

3. **Access the application:**
   - **Frontend:** [http://localhost:8080](http://localhost:8080)
   - **Backend API:** [http://localhost:8000](http://localhost:8000)
   - **Backend API docs:** [http://localhost:8000/docs](http://localhost:8000/docs)

4. **Stopping the services:**
   Press `Ctrl+C` in the terminal, then run:
   ```sh
   docker-compose down
   ```

## Development Notes

- **Hot Reloading:**
  - The backend uses a volume mount for the `app` directory, so code changes in `backend/app` will reflect in the running container.
  - For advanced frontend development, you may want to run the frontend locally using `npm run dev` in the `frontend/` directory.

- **Dependencies:**
  - Backend: Python 3.11, FastAPI, Uvicorn, Pandas, NumPy, scikit-learn, Joblib, Pydantic
  - Frontend: React, Vite, TypeScript, Tailwind CSS, shadcn-ui

## Customization

- To change backend logic, edit files in `backend/app/`.
- To change frontend UI, edit files in `frontend/src/`.

## Troubleshooting

- Ensure ports 8000 (backend) and 8080 (frontend) are free.
- If you encounter issues, try rebuilding:
  ```sh
  docker-compose up --build
  ```

---

**Enjoy using the Soil Composting Prediction App!** 