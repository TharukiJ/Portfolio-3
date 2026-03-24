const Jimp = require('jimp');

async function processImage() {
  console.log("Reading image...");
  try {
    const img = await Jimp.read('public/images/hero_person_white.png');
    
    console.log("Removing background...");
    img.scan(0, 0, img.bitmap.width, img.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx];
      const g = this.bitmap.data[idx+1];
      const b = this.bitmap.data[idx+2];
      
      // If the pixel is near-white (background of hero_person_white is white/off-white)
      if (r > 235 && g > 235 && b > 235) {
        this.bitmap.data[idx+3] = 0; // set alpha to transparent
      } else if (r > 220 && g > 220 && b > 220) {
        // edge smoothing
        this.bitmap.data[idx+3] = 80;
      }
    });

    await img.writeAsync('public/images/hero_person_transparent.png');
    console.log("Successfully created hero_person_transparent.png!");
  } catch (error) {
    console.error("Error:", error);
  }
}

processImage();
