require('dotenv').config();
export const mongoConnectURL = process.env.MONGO_URL as string;
export const FEUrl = process.env.FE_URL as string;
export const jwtSecret = process.env.JWT_SECRET as string;

export const smtpSenderEmail = process.env.SMTP_SENDER_EMAIL as string;
export const smtpUser = process.env.SMTP_USER as string;
export const smtpPass = process.env.SMTP_PASS as string;
export const smtpHost = process.env.SMTP_HOST as string;
export const awsFileUploadAccessKey = process.env.AWS_FILE_UPLOAD_ACCESS_KEY;
export const awsFileUploadSecretKey = process.env.AWS_FILE_UPLOAD_SECRET_KEY;
export const awsFileUploadBucket = process.env.FILE_UPLOAD_BUCKET;
export const awsRegion = process.env.AWS_REGION;
export const publicAssetsURL = process.env.PUBLIC_ASSETS_URL;
