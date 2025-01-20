import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import path from 'path';
import multerS3 from 'multer-s3';
import fs from 'fs';
import {
  awsFileUploadAccessKey,
  awsFileUploadBucket,
  awsFileUploadSecretKey,
  awsRegion, isFileUploadInLocal,
} from '../lib/config';

export const s3 = new S3Client({
  region: awsRegion,
  credentials: {
    accessKeyId: awsFileUploadAccessKey as string,
    secretAccessKey: awsFileUploadSecretKey as string,
  },
});

// S3 Storage Configuration
const s3Storage = multerS3({
    s3: s3,
    bucket: awsFileUploadBucket as string,
    key: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(
        null,
        `assets/user-profile-images/${file.fieldname}-${uniqueSuffix}-${file.originalname}`
      );
    },
  });

// Local Storage Configuration
const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../../../uploads/');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Create folder if it doesn't exist
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const generatedFilename = `${file.fieldname}-${uniqueSuffix}-${file.originalname}`;
    cb(null, generatedFilename);
  },
});

// Conditional Multer Configuration
export const upload = multer({
  storage: isFileUploadInLocal ? localStorage : s3Storage,
});
