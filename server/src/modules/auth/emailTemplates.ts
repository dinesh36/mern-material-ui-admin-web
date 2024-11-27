export const generateEmailTemplate = (
  FEUrl: string,
  emailConfirmationToken: string,
  userName: string,
  userEmail: string
): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email Address</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            width: 100%;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: rgba(251, 251, 251, 0.01); /* White background for the body content */
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background-color: #121D22; /* Header background color */
            text-align: center;
            padding: 20px;
        }
        .email-header img {
            max-width: 200px;
        }
        .email-body {
            background-color: #f7f7f7;
            border-color: #D4E2FE;
        }
        .email-content {
            padding: 20px 30px;
            text-align: left; /* Left align the text in body content */
        }
        .email-content h1 {
            color: #000000; /* Header text color */
            font-size: 22px;
            margin-bottom: 10px;
            text-align: center; /* Keep the title centered */
        }
        .email-content p {
            font-size: 16px;
            color: #333333;
            margin: 10px 0;
        }
        .confirm-button {
            background-color: #195CE5;
            color: #ffffff !important;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 6px; /* More rounded corners */
            font-size: 16px;
            display: inline-block;
            margin: 20px 0;
        }
        .confirm-button:hover {
            background-color: #135cab;
        }
        .button-container {
            text-align: center; /* Center the button */
            margin: 20px 0; /* Margin for spacing */
        }
        .email-footer {
            padding: 50px;
            background-color: #ffffff; /* Footer background color */
            text-align: center;
            font-size: 12px;
            color: #000000;
            border-top: 1px solid #f7f7f7;
            border-right: 2px solid #f7f7f7;
            border-left: 2px solid #f7f7f7;
            border-bottom: 2px solid #f7f7f7;
        }
        .email-footer p {
            margin: 0;
            line-height: 22px;
            font-size: 16px;
            font-weight: 500;
        }
        .additional-links a {
            color: #1A73E8; /* Link color */
            text-decoration: none;
        }
        .additional-links a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
<div class="email-container">
    <div class="email-header">
        <img src="https://marathon-uploads-s3.s3.ap-south-1.amazonaws.com/uploads/profileImage-1728114803113-279532475-Group%2057%20%289%29.png" alt="Your Logo">
    </div>
    <div class="email-body">
        <div class="email-content">
            <h1>Verify your email address</h1>
            <p>Hello, <strong>${userName}</strong></p>
            <p>You created an account using the email address <strong>${userEmail}</strong>.</p>
            <div class="button-container">
                <a href="${FEUrl}/confirm-email/${emailConfirmationToken}" class="confirm-button">
                    Confirm Email
                </a>
            </div>
            <p>If you don’t like clicking buttons, you can copy and paste this link into your browser:</p>
            <p><a href="${FEUrl}/confirm-email/${emailConfirmationToken}">${FEUrl}/confirm-email/${emailConfirmationToken}</a></p>
        </div>
    </div>
    <div class="email-footer">
        <p>© 2024 MERN App. All Rights Reserved</p>
    </div>
</div>
</body>
</html>
  `;
};
