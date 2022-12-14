/* eslint-disable @typescript-eslint/ban-types */
export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: Function,
) => {
  if (!file) cb(new Error('File is empty'), false);

  const fileTypeExpected = file.mimetype.split('/')[1];
  const allfileTypeExpected = ['png', 'jpg', 'jpeg', 'gif'];

  if (allfileTypeExpected.includes(fileTypeExpected)) {
    cb(null, true);
  }
  cb(null, false);
};
