const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

// Image dimensions
const width = 500;  // Image width (template dimensions)
const height = 300;  // Image height (template dimensions)

// Create a canvas for drawing
const canvas = createCanvas(width, height);
const context = canvas.getContext('2d');

// Load the static template image (your background image)
loadImage('./images/template-image.png').then((image) => {
  // Draw the template image onto the canvas
  context.drawImage(image, 0, 0, width, height);

  // Get the current date in the format "Nov 24 2024"
  const now = new Date();
  const date = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Set up font for the date text
  context.fillStyle = '#FFFFFF'; // White text
  context.font = 'bold 30px Arial';  // Increase font size for larger display
  context.textAlign = 'center';  // Center the text horizontally
  context.textBaseline = 'middle';  // Center the text vertically

  // Box dimensions for the date (aligned right)
  const boxWidth = 165;  // 40px wider than before
  const boxHeight = 90;  // 3x taller than before
  const x = width - 20 - (boxWidth / 2);  // Align the box to the right, with padding
  const y = 20 + (boxHeight / 2);  // Center vertically in the box

  // Draw the black background for the date text box (ensure visibility)
  context.fillStyle = '#000000';  // Black background
  context.fillRect(x - (boxWidth / 2), y - (boxHeight / 2), boxWidth, boxHeight);

  // Draw the date text on top of the black background
  context.fillStyle = '#FFFFFF'; // White text
  context.fillText(date, x, y);

  // Save the generated image to the 'docs' folder
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('./docs/image.png', buffer);

  console.log(`Image generated with date: ${date}`);
});
