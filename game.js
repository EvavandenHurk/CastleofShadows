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

// Initialize game state
const gameState = {
  currentRoom: "Entry Hallway",
  cluesFound: 0,
  visitedRooms: {},
};

// Canvas resize function
function resizeCanvas() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const ASPECT_RATIO = 4 / 3;

  if (windowWidth / windowHeight > ASPECT_RATIO) {
    canvas.height = windowHeight;
    canvas.width = canvas.height * ASPECT_RATIO;
  } else {
    canvas.width = windowWidth;
    canvas.height = canvas.width / ASPECT_RATIO;
  }

  drawRoom(gameState.currentRoom);
}

// Event listeners and initial setup
window.onload = () => {
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
};


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
    clue: {
      text: "An inscription hinting at the coffin's location.",
      collected: false,
    },
  },
  "Dungeon": {
    image: "Dungeon",
    connections: ["Entry Hallway", "Cellar"],
    clue: {
      text: "A map fragment hidden in the wall.",
      collected: false,
    },
  },
  "Dining Room": {
    image: "Dining Room",
    connections: ["Entry Hallway", "Weapon Room"],
    clue: {
      text: "A dusty note mentioning an ancient ritual.",
      collected: false,
    },
  },
  "Spooky Garden": {
    image: "Spooky Garden",
    connections: ["Entry Hallway", "Attic"],
    clue: {
      text: "An old statue points toward a hidden path.",
      collected: false,
    },
  },
  "Weapon Room": {
    image: "Weapon Room",
    connections: ["Dining Room", "Library"],
    clue: {
      text: "A sword with an engraved riddle.",
      collected: false,
    },
  },
  "Cellar": {
    image: "Cellar",
    connections: ["Dungeon", "Library"],
    clue: {
      text: "An ancient key hidden in a barrel.",
      collected: false,
    },
  },
  "Attic": {
    image: "Attic",
    connections: ["Spooky Garden", "Library"],
    clue: {
      text: "A journal with cryptic symbols.",
      collected: false,
    },
  },
  "Library": {
    image: "Library",
    connections: ["Throne Room", "Weapon Room", "Cellar", "Attic"],
    clue: {
      text: "A tome describing the coffin's location.",
      collected: false,
    },
  },
};

function drawRoom(roomName) {
  const room = rooms[roomName];
  const img = images[room.image];

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // Display room name
  ctx.fillStyle = "white";
  ctx.font = `${canvas.height / 30}px Gothic`;
  ctx.fillText(`Room: ${roomName}`, 10, canvas.height / 20);

  // Show clue prompt if clue exists and hasn't been collected
  if (room.clue && !room.clue.collected) {
    ctx.fillText(
      "Press 'C' to collect a clue!",
      10,
      canvas.height / 10
    );
  }

  // Display collected clues
  ctx.fillText(`Clues Found: ${gameState.cluesFound}`, 10, canvas.height / 5);
}

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


document.addEventListener("keydown", (e) => {
  // Clue collection logic
  if (e.code === "KeyC") {
    const currentRoom = rooms[gameState.currentRoom];
    if (currentRoom.clue && !currentRoom.clue.collected) {
      currentRoom.clue.collected = true; // Mark clue as collected
      gameState.cluesFound += 1; // Increment clue count

      console.log(`Clue collected: ${currentRoom.clue.text}`);
      alert(`You collected a clue: ${currentRoom.clue.text}`);
      
      drawRoom(gameState.currentRoom); // Refresh room to update UI

      // Check for victory condition
      if (gameState.cluesFound >= 5) {
        alert("You have gathered enough clues to find the coffin!");
        // Unlock the Coffin Room
        rooms["Library"].connections.push("Coffin Room");
        rooms["Coffin Room"] = {
          image: "Coffin Room",
          connections: ["Library"],
          clue: null,
        };
        console.log("The Coffin Room is now unlocked!");
      }
    }
  }
});


// Start the game
drawRoom(gameState.currentRoom);
