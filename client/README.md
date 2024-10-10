# EX - Social Media Platform

A social media platform built using **React.js**, **Node.js**, **PostgreSQL**, and **Tailwind CSS**, inspired by platforms like Instagram and Twitter. The project also utilizes **Phosphor Icons**, **Shadcn**, **TanStack Router**, and **TanStack Query** for efficient routing and data fetching.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Icons and Assets](#icons-and-assets)
- [Real-time Features](#real-time-features)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Authentication (OAuth and JWT-based)
- User Profile creation and management
- Real-time Notifications (likes, comments, follows)
- Posting, liking, and commenting on media (photos, videos)
- Infinite scrolling and real-time feed updates
- Image and Video Uploads
- Push Notifications for interactions
- Search functionality (users, posts)
- Responsive design for mobile and desktop

## Tech Stack

**Frontend:**

- [React.js](https://reactjs.org/) - JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling
- [Shadcn](https://shadcn.dev/) - Accessible, modern UI components for building consistent UIs
- [TanStack Router](https://tanstack.com/router) - Type-safe router for React apps
- [TanStack Query](https://tanstack.com/query) - Powerful data fetching and caching library
- [Phosphor Icons](https://phosphoricons.com/) - Flexible icon library for React

**Backend:**

- [Node.js](https://nodejs.org/) - JavaScript runtime for building the backend
- [PostgreSQL](https://www.postgresql.org/) - Relational database for storing user data, posts, and interactions
- [Express.js](https://expressjs.com/) - Web framework for Node.js to build API endpoints
- [Appwrite](https://appwrite.io/) - Backend server for authentication, storage, and real-time features (Optional)
- [Socket.IO](https://socket.io/) - Real-time bidirectional event-based communication (if not using Appwrite)

## Installation

### Prerequisites

- **Node.js** installed (v14 or higher)
- **PostgreSQL** installed and running
- **Appwrite** (Optional, if used for auth, real-time features, etc.)

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/social-media-platform.git
   cd social-media-platform
   ```
