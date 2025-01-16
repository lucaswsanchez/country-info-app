# Country Info App

This is a full stack project that uses NestJS for the backend and React for the frontend.

## Project Structure

/country-info-app
│
├── /countryapp-backend # Source code for the backend (NestJS)
│
└── /countryapp-frontend # Source code for the frontend (React)

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

## Project Setup

### Cloning the Repository

git clone https://github.com/YOUR_USERNAME/country-info-app.git
cd country-info-app

### Backend Setup (NestJS)

1. Navigate to the backend folder:

cd countryapp-backend

2. Install the dependencies:

npm install

3. Create a `.env` file in the backend folder and configure the necessary variables:

NAGER_API_URL=https://date.nager.at/api/v3
COUNTRIES_NOW_API_URL=https://countriesnow.space/api/v0.1
CACHE_TTL=3600
CACHE_MAX_ITEMS=100

4. To start the backend server, run:

npm run start:dev

### Frontend Setup (React)

1. Open a new terminal and navigate to the frontend folder:

cd ../countryapp-frontend

2. Install the dependencies:

npm install

3. To start the frontend server, run:

npm run dev

## Instructions to Run

1. Make sure that the backend server is running at `http://localhost:4000`.
2. Next, start the frontend server in another terminal.
3. Open your browser and visit `http://localhost:5173` to see the application in action.
