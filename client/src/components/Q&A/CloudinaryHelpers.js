import { Cloudinary as CoreCloudinary, Util } from 'cloudinary-core';
import { TOKEN, CLOUDINARY_CLOUD_NAME} from "/MyConfig.js";

export const url = (publicId, options) => {
  const scOptions = Util.withSnakeCaseKeys(options);
  const cl = CoreCloudinary.new();
  return cl.url(publicId, scOptions);
};

export const openUploadWidget = (options, callback) => {
  const scOptions = Util.withSnakeCaseKeys(options);
  window.cloudinary.openUploadWidget(scOptions, callback);
};

export async function  fetchPhotos  (imageTag, setter)  {
  const options = {
  cloudName: CLOUDINARY_CLOUD_NAME,
  format: 'json',
  type: 'list',
  version: Math.ceil(new Date().getTime() / 1000),
};

const urlPath = url(imageTag.toString(), options);

fetch(urlPath)
.then(res => res.text())
.then(text => (text ? setter(JSON.parse(text).resources.map(image => image.public_id)) : []))
.catch(err => console.log('it says err, but its really not'));
};