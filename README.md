# Blog Creator App

This is a React application that helps users create blogs on user prompts using a Large Language Model (LLM). The app allows users to enter a topic, generate a blog post using the OpenAI API, and enables users to view, edit, or delete their blog posts.

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **API:** OpenAI API

## Features

- **Create Blogs:** Users can input a topic, and the app will generate a blog post based on that topic using the OpenAI API.
- **Edit Blogs:** Users can edit the content of the generated blogs.
- **Delete Blogs:** Users can delete blogs they no longer need.
- **View Blogs:** Users can view a list of all their blogs and toggle the content visibility by clicking on the title.

## Installation and Setup

To get this project up and running locally on your machine, follow the steps below:
### Step 1: Install Prerequisites
Before setting up the project, ensure you have the following installed:

Node.js and npm: Install Node.js, which includes npm (Node Package Manager). You can download and install it from nodejs site or using brew.

MongoDB: Install MongoDB and ensure it's running. You can download it from mongodb.com.

Nodemon: Install nodemon globally to automatically restart the server on code changes. You can install it using npm:

```bash
npm install -g nodemon
```
### Step 2: Clone the Repository

First, clone this repository to your local machine using Git:
```bash
git clone https://github.com/itsap159/react-blog-app.git
```

### Step 3: Change into the project directory:
```bash
cd react-blog-app
```

### Step 4: Set Up the Backend

Navigate to the backend folder and install the necessary dependencies:

```bash
cd backend
npm install
```

### Step 5: Start the Backend Server

First add .env file which consists the openAI API key and the port number(if wanted). The default port is 5000. Refer to the the \backend\.env.example for reference.

Start the backend server on port 5000(or .env PORT):

```bash
npm start
```

### Step 6: Set Up the Frontend
Navigate back to the main project directory and install the frontend dependencies:
```bash
cd ..
npm install
```

#### Step 7: Start the Frontend

Now create a .env file in the root directory and add the backend port to this file(if a PORT number has been added to the \backend\.env file or not needed). You can refer the .env.example file for reference.

Start the frontend server on port 3000(default)(may be different if some other port is used):

```bash
npm start
```

### Step 8: Access the Application

Open your web browser and go to the port displayed on the terminal to view and interact with the application.

## Usage

- **Creating a Blog:** Enter a prompt in the text area and click "Submit" to generate a blog.
- **Viewing Blogs:** Click on the blog titles in the sidebar to toggle the visibility of the content.
- **Editing a Blog:** Click "Edit" under a blog post to modify its content. Save your changes by clicking "Update."
- **Deleting a Blog:** Click "Delete" under a blog post to remove it from the list.
