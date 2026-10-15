import multer from 'multer';

const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowed.includes(file.mimetype)) {
    return cb(new Error('Only JPEG, PNG or WEBP images are allowed.'));
  }
  cb(null, true);
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

export function uploadSingle(fieldName) {
  return (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err) {
        err.status = 400;
        return next(err);
      }
      next();
    });
  };
}