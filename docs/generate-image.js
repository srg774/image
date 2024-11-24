const fs = require('fs');
const { createCanvas } = require('canvas');

// Ensure the docs directory exists
const outputDir = './docs';
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Set image dimensions
const width = 800;
const height = 400;
const canvas = createCanvas(width, height);
const context = canvas.getContext('2d');

// Get the current time
const now = new Date();
const hours = now.getHours().toString().padStart(2, '0');
const minutes = now.getMinutes().toString().padStart(2, '0');
const time = ${hours}:${minutes};

// Background
context.fillStyle = '#ffffff'; // White background
context.fillRect(0, 0, width, height);

// Text
context.fillStyle = '#000000'; // Black text
context.font = 'bold 70px Arial';
context.textAlign = 'center';
context.textBaseline = 'middle';
context.fillText(Time: ${time}, width / 2, height / 2);

// Save the image
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(${outputDir}/image.png, buffer);

console.log(Image generated with time: ${time});
