import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // thiết lập thư mục nơi các tập tin tải lên sẽ được lưu trữ
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname;
        // đặt tên file upload
        cb(null, fileName);
    },
});
const upload = multer({ storage });

export default upload;