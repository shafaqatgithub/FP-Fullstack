import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads/images");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const pdfStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads/pdfs");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const xlsxStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads/sheets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

// File type filter functions
const isImage = (file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb("Error: Images only!");
    }
};

const isPDF = (file, cb) => {
    const filetypes = /pdf/;
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb("Error: PDFs only!");
    }
};

const isXlsx = (file, cb) => {
    const filetypes = /xlsx/;
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname || mimetype) {
        return cb(null, true);
    } else {
        cb("Error: .xlsx files only!");
    }
};

// Configure multer with different storage and file type filters
export const imageUpload = multer({
    storage: imageStorage,
    fileFilter: function (req, file, cb) {
        isImage(file, cb);
    },
});

export const pdfUpload = multer({
    storage: pdfStorage,
    fileFilter: function (req, file, cb) {
        isPDF(file, cb);
    },
});

export const xlsxUpload = multer({
    storage: xlsxStorage,
    fileFilter: function (req, file, cb) {
        isXlsx(file, cb);
    },
});
