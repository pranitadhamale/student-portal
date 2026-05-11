My project is a Task Management System.This system helps users manage daily tasks with authentication and role-based access.Users can register, login, create tasks, update tasks, delete tasks, search tasks and filter them.
Admin has additional access to monitor all users and tasks through an admin dashboard.

Tech Stack
Frontend:
HTML, CSS, JavaScript

Backend:
Node.js, Express.js

Database:
MongoDB Atlas

Features Demo
Main features:
1. User Authentication
- Register
- Login
- Logout

2. Task Management
- Add task
- Edit task
- Delete task
- Change status

3. Search and Filter
- Search by title
- Pending
- Completed
- All tasks

4. Pagination
- 5 tasks per page

5. Role-Based Access
- Admin can view all tasks
- User can view only own tasks

6. Admin Dashboard
- Total users
- Total tasks
- Completed tasks
- Pending tasks

- Architecture Explanation
The frontend sends API requests to the backend.Backend handles authentication, authorization and CRUD operations.MongoDB stores users and task data.JWT token is used for protected routes.
Passwords are stored securely using bcrypt hashing.
