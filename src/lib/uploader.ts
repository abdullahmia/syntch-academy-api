import { Request } from 'express';
import multer, { Multer } from 'multer';

const storage: multer.StorageEngine = multer.diskStorage({
  destination: (
    req: Request,
    file: any,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, 'uploads/');
  },
  filename: (req: Request, file: any, cb: (error: Error | null, filename: string) => void) => {
    const date = new Date().toISOString().replace(/:/g, '-');
    const filename = `${date}`;
    cb(null, filename);
  }
});

const uploader: Multer = multer({ storage: storage });

export default uploader;
