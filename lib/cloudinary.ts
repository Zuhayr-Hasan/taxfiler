// lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

console.log('Cloudinary Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('Cloudinary Api Key', process.env.CLOUDINARY_API_KEY);
console.log('Cloudinary Secret Api Key', process.env.CLOUDINARY_API_SECRET);

cloudinary.config({
  cloud_name: "dmjgge9cb",
  api_key: "681829941566915",
  api_secret: "eS9C4_L61ClHJ1LuD8xW7xNqdn0",
  secure: true,
});

export default cloudinary;
