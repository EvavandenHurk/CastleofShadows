// Game setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Desired aspect ratio
const ASPECT_RATIO = 4 / 3; // 800x600 ratio
let canvasWidth, canvasHeight;

function resizeCanvas() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Maintain aspect ratio
  if (windowWidth / windowHeight > ASPECT_RATIO) {
    canvasHeight = windowHeight;
    canvasWidth = canvasHeight * ASPECT_RATIO;
  } else {
    canvasWidth = windowWidth;
    canvasHeight = canvasWidth / ASPECT_RATIO;
  }

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // Redraw current room after resizing
  drawRoom(gameState.currentRoom);
}

// Resize canvas on window resize
window.addEventListener("resize", resizeCanvas);

// Initialize canvas size
resizeCanvas();
drawRoom(gameState.currentRoom);

// Load assets
const images = {
  "Throne Room": loadImage("https://raw.githubusercontent.com/EvavandenHurk/CastleofShadows/refs/heads/main/images/ThroneRoom.png"),
  "Dungeon": loadImage("https://raw.githubusercontent.com/EvavandenHurk/CastleofShadows/refs/heads/main/images/Dungeon.png"),
  "Entry Hallway": loadImage("https://raw.githubusercontent.com/EvavandenHurk/CastleofShadows/refs/heads/main/images/Hallway.png"),
  "Dining Room": loadImage("https://raw.githubusercontent.com/EvavandenHurk/CastleofShadows/refs/heads/main/images/DiningRoom.png"),
  "Spooky Garden": loadImage("https://raw.githubusercontent.com/EvavandenHurk/CastleofShadows/refs/heads/main/images/Garden.png"),
  "Weapon Room": loadImage("https://raw.githubusercontent.com/EvavandenHurk/CastleofShadows/refs/heads/main/images/WeaponRoom.png"),
  "Cellar": loadImage("https://raw.githubusercontent.com/EvavandenHurk/CastleofShadows/refs/heads/main/images/Cellar.png"),
  "Attic": loadImage("https://raw.githubusercontent.com/EvavandenHurk/CastleofShadows/refs/heads/main/images/Attick.png"),
  "Library": loadImage("https://raw.githubusercontent.com/EvavandenHurk/CastleofShadows/refs/heads/main/images/Library.png"),
};

const gameState = {
  currentRoom: "Entry Hallway",
  cluesFound: 0,
  visitedRooms: {},
};

// Helper to load images
function loadImage(src) {
  const img = new Image();
  img.src = src;
  return img;
}

// Rooms configuration
const rooms = {
  "Entry Hallway": {
    image: "Entry Hallway",
    connections: ["Throne Room", "Dungeon", "Dining Room", "Spooky Garden"],
  },
  "Throne Room": {
    image: "Throne Room",
    connections: ["Entry Hallway", "Library"],
    clue: "An inscription hinting at the coffin's location.",
  },
  "Dungeon": {
    image: "Dungeon",
    connections: ["Entry Hallway", "Cellar"],
    clue: "A map fragment hidden in the wall.",
  },
  "Dining Room": {
    image: "Dining Room",
    connections: ["Entry Hallway", "Weapon Room"],
    clue: "A dusty note mentioning an ancient ritual.",
  },
  "Spooky Garden": {
    image: "Spooky Garden",
    connections: ["Entry Hallway", "Attic"],
    clue: "An old statue points toward a hidden path.",
  },
  "Weapon Room": {
    image: "Weapon Room",
    connections: ["Dining Room", "Library"],
    clue: "A sword with an engraved riddle.",
  },
  "Cellar": {
    image: "Cellar",
    connections: ["Dungeon", "Library"],
    clue: "An ancient key hidden in a barrel.",
  },
  "Attic": {
    image: "Attic",
    connections: ["Spooky Garden", "Library"],
    clue: "A journal with cryptic symbols.",
  },
  "Library": {
    image: "Library",
    connections: ["Throne Room", "Weapon Room", "Cellar", "Attic"],
    clue: "A tome describing the coffin's location.",
  },
};


function drawRoom(roomName) {
  const room = rooms[roomName];
  const img = images[room.image];

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw room image, scaled to canvas
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // Display text
  ctx.fillStyle = "white";
  ctx.font = `${canvasHeight / 30}px Gothic`; // Scaled font size
  ctx.fillText(`Room: ${roomName}`, 10, canvasHeight / 20);

  if (gameState.visitedRooms[roomName] && room.clue) {
    ctx.fillText(
      "Clue: " + room.clue,
      10,
      canvasHeight / 10
    );
  }
}


// Move between rooms
function moveRoom(direction) {
  const currentRoom = rooms[gameState.currentRoom];
  const targetRoom = currentRoom.connections[direction];

  if (targetRoom) {
    gameState.currentRoom = targetRoom;
    gameState.visitedRooms[targetRoom] = true;

    // Increment clues if present
    if (rooms[targetRoom].clue && !gameState.visitedRooms[targetRoom]) {
      gameState.cluesFound += 1;
    }

    drawRoom(targetRoom);
  } else {
    console.log("You can't go that way.");
  }
}


// Keyboard input
document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowUp":
      moveRoom(0); // Go to the first connected room
      break;
    case "ArrowDown":
      moveRoom(1); // Go to the second connected room
      break;
    case "ArrowLeft":
      moveRoom(2); // Go to the third connected room
      break;
    case "ArrowRight":
      moveRoom(3); // Go to the fourth connected room
      break;
  }
});

// Start the game
drawRoom(gameState.currentRoom);
