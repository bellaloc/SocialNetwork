# SocialNetwork API

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

## Description

The Social Network API is a backend application that serves as the foundation for a social network web application. It allows users to share their thoughts, react to friends' thoughts, and manage their friend lists. This API is built using Express.js for routing and a MongoDB database with Mongoose for data modeling.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Models](#models)
- [Contributing](#contributing)
- [License](#license)

## Installation

To run this project, follow these steps:

1. Clone the repository to your local machine.
2. Ensure you have Node.js and MongoDB installed.
3. Run `npm install` to install the project dependencies.
4. Configure your environment variables for MongoDB, if necessary.
5. node seeds/seed.js
6. Start the server by running `npm start`.
7. go to insomnia to do the requests.

## Usage

- Access the API using tools like [Insomnia](https://insomnia.rest/) to interact with the API endpoints.
- Refer to the API Routes section for available routes and their usage.

## API Routes

### Users

- `GET /api/users`: Get all users.
- `GET /api/users/:userId`: Get a single user by their `_id`.
- `POST /api/users`: Create a new user.
- `PUT /api/users/:userId`: Update a user by their `_id`.
- `DELETE /api/users/:userId`: Delete a user by their `_id`.

### Friends

- `POST /api/users/:userId/friends/:friendId`: Add a friend to a user's friend list.
- `DELETE /api/users/:userId/friends/:friendId`: Remove a friend from a user's friend list.

### Thoughts

- `GET /api/thoughts`: Get all thoughts.
- `GET /api/thoughts/:thoughtId`: Get a single thought by its `_id`.
- `POST /api/thoughts`: Create a new thought.
- `PUT /api/thoughts/:thoughtId`: Update a thought by its `_id`.
- `DELETE /api/thoughts/:thoughtId`: Delete a thought by its `_id`.

### Reactions

- `POST /api/thoughts/:thoughtId/reactions`: Create a reaction for a thought.
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`: Delete a reaction from a thought.

## Models

The application includes the following Mongoose models:

### User

- `username`: String (unique, required, trimmed)
- `email`: String (required, unique, matches valid email format)
- `thoughts`: Array of `_id` values referencing the `Thought` model
- `friends`: Array of `_id` values referencing the `User` model (self-reference)

### Thought

- `thoughtText`: String (required, 1-280 characters)
- `createdAt`: Date (default value is the current timestamp, formatted on query)
- `username`: String (required)
- `reactions`: Array of nested documents created with the `Reaction` schema

### Reaction (Schema)

- `reactionBody`: String (required, 280 character maximum)
- `username`: String (required)
- `createdAt`: Date (default value is the current timestamp, formatted on query)



