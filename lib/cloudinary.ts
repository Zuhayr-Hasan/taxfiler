// lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

console.log('Cloudinary Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('Cloudinary Api Key', process.env.CLOUDINARY_API_KEY);
console.log('Cloudinary Secret Api Key', process.env.CLOUDINARY_API_SECRET);

export default cloudinary;
