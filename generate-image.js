const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

// Image dimensions
const width = 500;  // Image width
const height = 300;  // Image height

// Create a canvas for drawing
const canvas = createCanvas(width, height);
const context = canvas.getContext('2d');

// Load the static template image (your background image)
loadImage('./images/template-image.png').then((image) => {
  // Draw the template image onto the canvas
  context.drawImage(image, 0, 0, width, height);

  // Get the current date (this will be the overlayed text)
  const now = new Date();
  const date = now.toLocaleDateString();  // Format: "11/24/2024"

  // Set up font for the date text
  context.fillStyle = '#000000'; // Black text
  context.font = 'bold 20px Arial';  // Set font size and style
  context.textAlign = 'center';  // Center the text horizontally
  context.textBaseline = 'middle';  // Center the text vertically

  // Position the text in the 125px wide, 30px tall box (20px down from the top)
  const boxWidth = 125;
  const boxHeight = 30;
  const x = 20 + (boxWidth / 2);  // Center horizontally in the box
  const y = 20 + (boxHeight / 2);  // Center vertically in the 30px tall box, 20px down from the top

  // Draw the date text on top of the static image
  context.fillText(date, x, y);

  // Save the generated image to the 'docs' folder
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('./docs/image.png', buffer);

  console.log(`Image generated with date: ${date}`);
});
