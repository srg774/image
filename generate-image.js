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

  // Adjustable Parameters
  const boxWidth = 143;  // Width of the date box (adjustable)
  const boxHeight = 58;  // Height of the date box (adjustable)
  const verticalOffset = 33.5; // Vertical distance from the top edge (adjustable)

  // Scale the font size with box height (keeping it proportional)
  const fontSize = Math.floor(boxHeight * 0.3);  // Font size will scale based on box height (30% of box height)

  // Set up font for the date text
  context.fillStyle = '#FFFFFF'; // White text
  context.font = `bold ${fontSize}px Arial`;  // Dynamically set font size
  context.textAlign = 'center';  // Center the text horizontally
  context.textBaseline = 'middle';  // Center the text vertically

  // Box position for the date (fully aligned to the left, no padding)
  const x = boxWidth / 2;  // Align the box to the left, but with its width centered from the edge
  const y = verticalOffset + (boxHeight / 2);  // Position the box with vertical offset

  // Draw the black background for the date text box
  context.fillStyle = '#000000';  // Black background
  context.fillRect(0, y - (boxHeight / 2), boxWidth, boxHeight);

  // Draw the date text on top of the black background
  context.fillStyle = '#FFFFFF'; // White text
  context.fillText(date, x, y);

  // Save the generated image to the 'docs' folder
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('./docs/image.png', buffer);

  console.log(`Image generated with date: ${date}`);
});
