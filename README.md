# ToDo List Application

This is a simple ToDo List application built with a Flask backend and a React frontend. It allows users to create, read, update, and delete tasks.

## Features

- Add new tasks
- View all tasks
- Update existing tasks
- Delete tasks
- Responsive design

## Tech Stack

- Backend: Flask (Python)
- Frontend: React (JavaScript)
- Database: SQLite
- Styling: CSS


## Setup and Installation

### Backend

1. Create a virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS and Linux: `source venv/bin/activate`

3. Install the required packages:
   ```
   pip install flask flask_sqlalchemy flask_cors
   ```

4. Run the Flask application:
   ```
   python app.py
   ```

The backend should now be running on `http://localhost:5000`.

2. Install the required npm packages:
   ```
   npm install
   ```

3. Start the React development server:
   ```
   npm run dev
   ```

The frontend should now be running on `http://localhost:5173`.

## Usage

1. Open your web browser and go to `http://localhost:5173`.
2. Use the input field at the bottom of the page to add new tasks.
3. Existing tasks will be displayed in a table, showing the task content and the date it was added.
4. Use the "Delete" button to remove a task.
5. Use the "Update" button to modify the content of a task.

## API Endpoints

- `GET /api/tasks`: Fetch all tasks
- `POST /api/tasks`: Create a new task
- `DELETE /api/tasks/<id>`: Delete a specific task
- `PUT /api/tasks/<id>`: Update a specific task
