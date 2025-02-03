# EcoCollect Frontend

[![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![Formik](https://img.shields.io/badge/Formik-2.x-FF685D)](https://formik.org/)
[![Yup](https://img.shields.io/badge/Yup-0.32.x-FFC107)](https://github.com/jquense/yup)
[![React Router](https://img.shields.io/badge/React_Router-6.x-CA4245)](https://reactrouter.com/)

---

## Overview

**EcoCollect Frontend** is a modern, responsive, and intuitive web application built with React and Vite. It empowers Nairobi residents and waste collectors by providing a seamless interface to manage waste pickup requests, view assignments, and interact with the backend API.

This application leverages:
- **Formik** and **Yup** for robust form handling and validation.
- **React Router DOM** for smooth client-side routing.
- An elegant and unique design that puts user experience first.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Modern UI:** An attractive and responsive design tailored for modern devices.
- **Robust Forms:** Effortless data entry with real-time validation using Formik and Yup.
- **Seamless Navigation:** Navigate effortlessly through multiple routes using React Router.
- **API Integration:** Communicate with the EcoCollect backend seamlessly via a dedicated configuration.
- **User-Centric:** Optimized for ease-of-use, making it simple for residents and collectors to manage requests and assignments.

---

## Project Structure

```plaintext
ecocollect-frontend/
├── public/
│   └── background.jpg        # Background image for a stunning UI
├── src/
│   ├── assets/               # Static assets (images, fonts, etc.)
│   ├── components/           # Reusable UI components (Navbar, Footer, etc.)
│   ├── pages/                # Page components (Home, Users, PickupRequests, Login, etc.)
│   ├── config.jsx            # API configuration file (backend URL)
│   ├── App.jsx               # Main app component with route definitions
│   └── main.jsx              # Entry point for React
├── .env                      # Environment variables (if needed)
├── package.json              # Project configuration and dependencies
├── README.md                 # This file
└── vite.config.js            # Vite configuration
```

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone git@github.com:KaranjaNjiyo24/phase-4-project-ecocollect-frontend.git
   cd phase-4-project-ecocollect-frontend.git
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment (if needed):**

   Create a `.env` file in the project root for any environment-specific settings.

---

## Usage

1. **Run the development server:**

   ```bash
   npm run dev
   ```

2. **Open your browser:**

   Navigate to [Ecocollect-Netlify](https://frabjous-malasada-68fd76.netlify.app/)

3. **Explore the app:**

   Use the navigation bar to browse Home, Users, Pickup Requests, Assignments, and Login pages. Enjoy the elegant UI and seamless interactions!

4. **Backend repo**
   [Ecocollect-backend](https://github.com/KaranjaNjiyo24/phase-4-project-ecocollect-backend)

---

## Configuration

- **API Base URL:**  
  All API requests are routed through the configuration file at `src/config.jsx`. Adjust the URL if your backend is deployed elsewhere.

  ```jsx
  // src/config.jsx
  const BASE_URL = "https://phase-4-project-ecocollect-backend-1.onrender.com/";
  export default BASE_URL;
  ```

---

## Deployment

This frontend has been deployed on Netlify. [Ecocollect-Netlify](https://frabjous-malasada-68fd76.netlify.app/).

I have deployed the backend on Render, have linked the two by ensuring that the Base URL in `src/config.jsx` points to your Render backend URL:

```jsx
const API_BASE_URL = "https://phase-4-project-ecocollect-backend-1.onrender.com/";
```

---

## Contributing

Contributions are always welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to your branch: `git push origin feature/YourFeature`
5. Open a pull request for review.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

*Designed with passion by the EcoCollect Team. Enjoy a seamless, beautiful, and innovative user experience!*
