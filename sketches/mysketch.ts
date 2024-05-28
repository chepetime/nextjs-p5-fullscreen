"use client";

import p5 from "p5";

// Define the color palette for the groups
const COLOR_PALETTE = [
  [255, 99, 71], // Tomato
  [135, 206, 235], // Sky Blue
  [255, 165, 0], // Orange
  [144, 238, 144], // Light Green
  [75, 0, 130], // Indigo
  [255, 20, 147], // Deep Pink
  [32, 178, 170], // Light Sea Green
  [255, 215, 0], // Gold
  [138, 43, 226], // Blue Violet
  [60, 179, 113], // Medium Sea Green
];

const GRID_SIZE = 20; // Size of each grid cell
const SEPARATION = 1; // Separation between grid elements
const NUM_GROUPS = 2; // Number of groups
const MOVE_INTERVAL = 4; // Move every 60 frames

// Interface to represent each shape with its position and type
interface Figure {
  x: number;
  y: number;
  shapeType: number;
}

// Interface to represent a group of figures with a shared color and movement direction
interface Group {
  figures: Figure[];
  color: number[];
  direction: p5.Vector;
}

export const mySketch = (p: p5) => {
  let groups: Group[] = []; // Array to hold all the groups
  let frameCounter = 0; // Counter to track frames

  // p5.js setup function, runs once at the beginning
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight); // Create canvas to fit the window
    p.frameRate(60); // Set frame rate to 60 frames per second
    initializeGroups(); // Initialize groups of figures
  };

  // p5.js draw function, runs continuously at the specified frame rate
  p.draw = () => {
    p.background(0); // Clear the background

    if (frameCounter % MOVE_INTERVAL === 0) {
      updateGroups(); // Update positions of all groups every 60 frames
    }
    drawGroups(); // Draw all the groups

    frameCounter++; // Increment the frame counter
  };

  // p5.js function called when the window is resized
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight); // Resize the canvas
  };

  // Initialize groups with random colors, directions, and figures
  const initializeGroups = () => {
    for (let i = 0; i < NUM_GROUPS; i++) {
      const color = COLOR_PALETTE[i % COLOR_PALETTE.length]; // Get a color from the palette
      const direction = p.createVector(
        p.int(p.random(-1, 2)),
        p.int(p.random(-1, 2))
      ); // Random grid-based direction

      // Ensure direction is not (0, 0)
      while (direction.x === 0 && direction.y === 0) {
        direction.set(p.int(p.random(-1, 2)), p.int(p.random(-1, 2)));
      }

      const figures: Figure[] = [];
      for (let x = 0; x < p.width; x += GRID_SIZE + SEPARATION) {
        for (let y = 0; y < p.height; y += GRID_SIZE + SEPARATION) {
          if (p.random() < 0.1) {
            // 10% chance to create a figure at this position
            figures.push({
              x: x,
              y: y,
              shapeType: p.int(p.random(3)), // Random shape type (0, 1, or 2)
            });
          }
        }
      }

      // Add the new group to the groups array
      groups.push({ figures, color, direction });
    }
  };

  // Update positions of all figures in all groups
  const updateGroups = () => {
    for (let group of groups) {
      for (let figure of group.figures) {
        figure.x += group.direction.x * (GRID_SIZE + SEPARATION); // Move figure in x direction
        figure.y += group.direction.y * (GRID_SIZE + SEPARATION); // Move figure in y direction

        // Wrap around the edges of the canvas
        if (figure.x < 0) figure.x = p.width - (GRID_SIZE + SEPARATION);
        if (figure.x >= p.width) figure.x = 0;
        if (figure.y < 0) figure.y = p.height - (GRID_SIZE + SEPARATION);
        if (figure.y >= p.height) figure.y = 0;
      }
    }
  };

  // Draw all figures in all groups
  const drawGroups = () => {
    for (let group of groups) {
      p.fill(group.color[0], group.color[1], group.color[2]); // Set fill color to group's color
      for (let figure of group.figures) {
        drawShape(figure.x, figure.y, GRID_SIZE - SEPARATION, figure.shapeType); // Draw each figure
      }
    }
  };

  // Draw a shape at the given position with the given size and shape type
  const drawShape = (x: number, y: number, size: number, shapeType: number) => {
    switch (shapeType) {
      case 0:
        p.ellipse(
          x + size / 2 + SEPARATION / 2,
          y + size / 2 + SEPARATION / 2,
          size,
          size
        ); // Draw ellipse
        break;
      case 1:
        p.rect(x + SEPARATION / 2, y + SEPARATION / 2, size, size); // Draw rectangle
        break;
      case 2:
        p.triangle(
          x + SEPARATION / 2,
          y + size + SEPARATION / 2,
          x + size / 2 + SEPARATION / 2,
          y + SEPARATION / 2,
          x + size + SEPARATION / 2,
          y + size + SEPARATION / 2
        ); // Draw triangle
        break;
    }
  };
};
