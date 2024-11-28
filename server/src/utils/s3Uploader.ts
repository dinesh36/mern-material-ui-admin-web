import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import {
  awsFileUploadAccessKey,
  awsFileUploadBucket,
  awsFileUploadSecretKey,
  awsRegion,
} from '../lib/config';

export const s3 = new S3Client({
  region: awsRegion,
  credentials: {
    accessKeyId: awsFileUploadAccessKey as string,
    secretAccessKey: awsFileUploadSecretKey as string,
  },
});

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: awsFileUploadBucket as string,
    key: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(
        null,
        `assets/user-profile-images/${file.fieldname}-${uniqueSuffix}-${file.originalname}`
      );
    },
  }),
});
