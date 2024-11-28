
# MERN Material UI Admin Web - Client

This is the **client** module of the **MERN Material UI Admin Web** project. It is a React-based frontend application built with Next.js and Material-UI, designed to provide an intuitive and responsive interface for admin functionalities.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Scripts](#scripts)
7. [Development Guidelines](#development-guidelines)
8. [License](#license)

---

## Project Structure

This project is divided into three main modules:

- **Admin**: Handles the backend admin APIs and dashboard-related server-side logic.
- **Client**: The frontend React application (this repository).
- **Server**: Backend server for APIs, database connections, and business logic.

---

## Features

- **Next.js Framework**: Fast rendering with Server-Side Rendering (SSR) and Static Site Generation (SSG).
- **Material-UI**: Modern React UI framework for styling and components.
- **React Hook Form**: Simplified form handling and validation.
- **Redux Toolkit**: State management for predictable and scalable architecture.
- **ESLint and Prettier**: Ensures code quality and formatting consistency.

---

## Technologies Used

- **React** (v18.3.1)
- **Next.js** (v14.2.6)
- **Material-UI** (v5.16.7)
- **Redux Toolkit** (v2.2.7)
- **React Hook Form** (v7.52.2)
- **Axios** (v1.7.5)

Development tools include:

- **TypeScript** (v5.5.4)
- **ESLint** (v8.57.0)
- **Prettier** (v3.3.3)

---

## Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/mern-material-ui-admin-web.git
   cd mern-material-ui-admin-web/client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```
   

## Usage

### Development Server

Start the development server:

```bash
npm run dev
```

Access the application in your browser at [http://localhost:3000](http://localhost:3000).

### Build for Production

To create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

---

## Scripts

Here are the available npm scripts:

| Command            | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| `npm run dev`      | Starts the development server on `localhost:3000`.                         |
| `npm run build`    | Builds the app for production.                                             |
| `npm run start`    | Starts the production server.                                              |
| `npm run lint:check` | Checks code quality with ESLint.                                           |
| `npm run lint:fix` | Fixes linting issues automatically.                                        |
| `npm run prettier:check` | Checks code formatting with Prettier.                                   |
| `npm run prettier:fix` | Fixes formatting issues automatically using Prettier.                    |
| `npm run check`    | Runs ESLint, Prettier checks, and builds the app in a single command.      |

---