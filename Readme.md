# MERN Material UI Admin Web

A robust admin dashboard application built with the MERN stack and Material-UI. This project supports JWT-based authentication, AWS S3 file uploads, and AWS SES for email notifications.

---

## Features

- **Modern Admin Dashboard**: Built using Material-UI for a sleek, responsive UI.
- **JWT Authentication**: Secure user authentication and session management.
- **MongoDB Database**: Flexible and scalable data storage.
- **AWS Integration**: File uploads with S3 and email notifications with SES.
- **Environment Configurations**: Centralized configuration via `.env`.

---

## Getting Started

### Prerequisites

- **Node.js** (>=14.x)
- **MongoDB** (local or hosted)
- **AWS Account** for S3 and SES services

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/mern-material-ui-admin-web.git
   cd mern-material-ui-admin-web

2. Install dependencies:
    ```bash
   npm install

3. Set up environment variables: Create a .env file in the root directory and add the following variables:
    ```bash
    # Authentication
    JWT_SECRET=your-jwt-secret
    
    # Frontend URL
    FE_URL=http://localhost:3000
    
    # Database
    MONGO_URL=mongodb://127.0.0.1:27017/projectName
    
    # SMTP Config
    SMTP_USER=your-smtp-user
    SMTP_PASS=your-smtp-pass
    SMTP_HOST=email-smtp.ap-south-1.amazonaws.com
    SMTP_SENDER_EMAIL=support@yourdomain.com
    
    # File Upload
    AWS_REGION=ap-south-1
    AWS_FILE_UPLOAD_ACCESS_KEY=your-access-key
    AWS_FILE_UPLOAD_SECRET_KEY=your-secret-key
    FILE_UPLOAD_BUCKET=your-bucket-name
    PUBLIC_ASSETS_URL=your-public-assets-url

4. Start the development server:
   ```bash 
   cd server
   npm run start

5. Project start
    ```bash
   cd client
   npm run dev