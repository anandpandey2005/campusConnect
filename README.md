# Campus Connect

## Overview

Campus Connect is a full-stack web application designed to bridge the gap between students and universities through a seamless, secure, and scalable digital platform.  
This is my first publicly accessible full-stack project, built with a clean and modular architecture ensuring high maintainability and industry-ready code practices.

---

## Project Vision

The goal of Campus Connect is to create a unified ecosystem where students, administrators, and universities can connect effortlessly — enabling profile management, authentication, document uploads, and efficient admin supervision.

---
## 📬 API Documentation
You can access the full Postman Collection here:  
👉 [View on Postman](https://postman.co/workspace/My-Workspace~451e9438-e0ea-44e5-8191-681494f8c55c/collection/37758472-a62f89a7-4f71-4744-8f27-a2cdc1bd8c50?action=share&creator=37758472&active-environment=37758472-f495b44c-3de4-4a7d-894d-95028c4b06ca)

### Tech Stack

- Node.js – Runtime environment  
- Express.js – Web application framework  
- MongoDB (Mongoose) – Database and ORM  
- Multer – File upload handling  
- Cloudinary – Cloud-based file storage  
- Prettier – Code formatting  
- Dotenv – Environment variable management  

---

## Project Structure (Backend)

```md
server/
│
├── public/uploads  Uploaded files
├── src/
│ ├── config/  Configuration files (DB, Cloudinary, etc.)
│ ├── controllers/
│ │ ├── admin/  Admin-level controllers
│ │ ├── superAdmin/  Super Admin logic
│ │ └── user/  User operations (Profile, Auth, Update)
│ ├── middleware/  Custom middlewares
│ ├── models/  Database models
│ ├── routes/  API route definitions
│ └── utils/  Helper and utility functions
│
├── app.js  Express app entry point
├── index.js  Server startup
├── .env  Environment variables
├── package.json  Dependencies and scripts
└── statuslog.txt  Status tracking and logs
