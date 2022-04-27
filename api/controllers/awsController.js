
import aws from 'aws-sdk';
import fs from 'fs';

import * as dotenv from 'dotenv';
import process from 'process';

dotenv.config();

const getDataFromAws = (req) => new Promise((resolve, reject) => {
  
  aws.config.setPromisesDependency();
  aws.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.ACCESS_KEY_PRIVATE,
  });
  console.warn(req.file);

  const s3 = new aws.S3();
  const params = {
    Bucket: process.env.BUCKET,
    Body: fs.createReadStream(req.file.path),
    Key: `song/${req.file.originalname}`,
    CacheControl: 'public'
  };

  s3.upload(params, (err, data) => {
    if (err) {
      reject(err);
    }
    fs.unlinkSync(req.file.path);

    resolve(data);
  });
});

export default getDataFromAws;