📊 Excel Formula Automation

Excel Formula Automation is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to simplify and automate Excel operations.

Instead of manually applying formulas in Excel, users can upload a file, select the formula they want (like VLOOKUP, Filtering, Sorting, etc.), specify the required columns, and instantly receive processed results through a clean web interface.

This project eliminates repetitive Excel tasks, improves efficiency, and provides an easy-to-use alternative for non-technical users.

🚀 Features
User Features

🔐 Secure Login & Signup

📤 Upload Excel (.xlsx) or CSV files

🧮 Apply Excel formulas like VLOOKUP

🔍 Select columns and conditions dynamically

📊 View processed data in the browser

📥 Download the updated Excel file

🕒 View processing history

📑 Dashboard to manage uploaded files

Admin Features

👤 View all users

🗂️ View uploaded file history

🛠 Manage system configurations

Technical Features

RESTful API for file processing

Automatic file validation

Formula engine using XLSX library

JWT authentication for secure access

Fully responsive UI with TailwindCSS

Modular React pages (Login, Signup, Dashboard, etc.)

🛠️ Tech Stack
Frontend

React.js

Tailwind CSS

Axios

React Router

Context API

Backend

Node.js

Express.js

Multer (file uploads)

XLSX / ExcelJS for file processing

JWT for authentication

MongoDB for storing users and history

📂 Folder Structure
excel_project/
│
├── backend/
│ ├── routes/
│ │ ├── authRoutes.js
│ │ ├── adminRoutes.js
│ │ └── fileRoutes.js
│ ├── server.js
│ ├── package.json
│ └── config.js
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── utils/
│ │ └── index.js
│ ├── public/
│ ├── package.json
│ └── tailwind.config.js
│
└── README.md

🔧 Environment Setup
Create a .env file inside backend:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

💻 Installation & Setup
Clone the Repository
git clone https://github.com/JanviSingh1712/Excel_project.git
cd Excel_project

Install Backend Dependencies
cd backend
npm install

Install Frontend Dependencies
cd ../frontend
npm install

Start Backend
cd backend
npm start

Start Frontend
cd frontend
npm start

🧪 API Endpoints
Method Endpoint Description
POST /api/auth/login User login
POST /api/auth/signup User registration
POST /api/file/upload Upload file
POST /api/file/vlookup Apply VLOOKUP formula
GET /api/file/history Get processing history
📦 Deployment Options

You can deploy this project on:

Frontend: Vercel or Netlify

Backend: Render / Railway

Database: MongoDB Atlas

🤝 Contribution Guidelines

Feel free to fork the project, open issues, or submit pull requests.
All contributions are appreciated!

⭐ Support

If you find this project useful, please consider giving it a ⭐ on GitHub!
