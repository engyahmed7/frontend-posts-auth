# Frontend Project

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Screenshots](#screenshots)
- [API Integration](#api-integration)
- [Error Handling](#error-handling)
- [Search Functionality](#search-functionality)
- [Contributing](#contributing)
- [License](#license)

## Introduction
This project is a frontend application built with React that includes a login screen, a posts feed, API integration, error handling, and search functionality. The project is designed to provide a seamless user experience with robust error management and efficient data fetching.

## Features
- **Login Screen**: Secure user authentication with form validation.
- **Posts Feed**: Display a list of posts fetched from an API.
- **API Integration**: Seamless interaction with backend services.
- **Error Handling**: User-friendly error messages and fallbacks.
- **Search Functionality**: Real-time search within the posts feed.

## Getting Started

### Prerequisites
Ensure you have the following installed on your machine:
- Node.js (v14 or higher)
- npm or Yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/engyahmed7/frontend-posts-auth
   ```
2. Navigate to the project directory:
   ```bash
   cd frontend-posts-auth
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

### Running the Project
Start the development server:
```bash
npm start
```
or
```bash
yarn start
```
The application will be available at `http://localhost:3000`.

## Screenshots

### Login Screen
![Screenshot from 2024-08-11 09-52-57](https://github.com/user-attachments/assets/baf35a4b-f9bb-4d2d-843d-c122c2fad1f0)


## API Integration
The application integrates with a backend API to fetch and display posts and handle user authentication. The API requests are managed through a service layer (`src/services/api.js`), which includes methods for making HTTP requests using `fetch` or `axios`.

## Error Handling
The application includes comprehensive error handling mechanisms to ensure a smooth user experience. All API requests are wrapped in `try-catch` blocks, and errors are caught and displayed to the user using friendly messages.

## Search Functionality
The search functionality allows users to filter the posts by keywords. This is implemented using a controlled input component that updates the displayed posts in real-time based on the search query.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss your ideas.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
