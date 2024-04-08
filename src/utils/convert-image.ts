import sharp from 'sharp';


export async function resizeImage(image:any) {

  try {
    await sharp(image)
      .resize({
        width: 546,
        height: 310
      })
      .toFormat("webp")
      .toFile(`${image.name}.webp`);
  } catch (error) {
    console.log(error);
  }
} 

