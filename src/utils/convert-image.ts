import sharp from 'sharp';


export async function resizeImage(image:any) {

  try {
    const data = await sharp(image)
  .webp({ lossless: true })
  .toBuffer();

  return data
  } catch (error) {
    console.log(error);
  }
} 

