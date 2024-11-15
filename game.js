// Game setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

// Load assets
const images = {
  "Throne Room": loadImage("path/to/throne_room_image.png"),
  "Dungeon": loadImage("path/to/dungeon_image.png"),
  "Entry Hallway": loadImage("path/to/entry_hallway_image.png"),
  "Dining Room": loadImage("path/to/dining_room_image.png"),
  "Spooky Garden": loadImage("path/to/spooky_garden_image.png"),
  "Weapon Room": loadImage("path/to/weapon_room_image.png"),
  "Cellar": loadImage("path/to/cellar_image.png"),
  "Attic": loadImage("path/to/attic_image.png"),
  "Library": loadImage("path/to/library_image.png"),
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


// Draw room
function drawRoom(roomName) {
  const room = rooms[roomName];
  const img = images[room.image];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // Display text
  ctx.fillStyle = "white";
  ctx.font = "20px Gothic";
  ctx.fillText(`Room: ${roomName}`, 10, 30);

  if (gameState.visitedRooms[roomName] && room.clue) {
    ctx.fillText("Clue: " + room.clue, 10, 60);
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
