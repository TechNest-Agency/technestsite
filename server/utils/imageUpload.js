const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Configure storage
const storage = multer.memoryStorage();

// Configure file filter
const fileFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

// Create multer instance
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Image processing middleware
const processImage = async (req, res, next) => {
    if (!req.file) return next();

    try {
        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // Generate unique filename
        const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}.webp`;
        const filepath = path.join(uploadsDir, filename);

        // Process image
        await sharp(req.file.buffer)
            .resize(1200, 800, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .webp({ quality: 80 })
            .toFile(filepath);

        // Add processed file info to request
        req.file.filename = filename;
        req.file.path = `/uploads/${filename}`;

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadImage: upload,
    processImage
};
