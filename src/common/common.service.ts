import { Injectable, Logger } from '@nestjs/common';
import { extname } from 'path';
import { S3 } from 'aws-sdk';
import { config } from 'dotenv';
config();

@Injectable()
export class CommonService {
  //  get S3 Credentials
  getS3() {
    return new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  //  upload file in s3 bucket
  async uploadS3(file, name) {
    const s3 = this.getS3();
    const bucket = process.env.BucketName;
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  //  download file from s3

  async download_file_fromS3(filepath, res: any) {
    const s3 = this.getS3();

    const bucketS3 = process.env.BucketName;
    const params = {
      Bucket: bucketS3,
      Key: filepath,
    };
    s3.getObject(params, function(err, data) {
      if (err) {
        return {
          success: false,
          error: err,
        };
      } else {
        const stream = s3
          .getObject(params)
          .createReadStream()
          .pipe(res);
        console.log('stream', stream);
      }
    });
  }

  //  To get Image url
  // ******* The params id represents the company_id which is used to create folder in S3 bucket.  In future, if we wish to give different id we need to do modification in common service. ********

  async getFileResponse(files, id) {
    const response = [];
    files?.length > 0 &&
      files.forEach(file => {
        const name = file.originalname.split('.')[0];
        const fileExtName = extname(file.originalname);
        const randomName = Array(4)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');

        file.filename = `${process.env.CHILD_PATH}${id}/${name}-${randomName}${fileExtName}`;
        const fileReponse = {
          originalname: file.originalname,
          filename: file.filename,
        };

        this.uploadS3(file.buffer, file.filename);
        response.push(fileReponse);
      });
    return response;
  }
}
