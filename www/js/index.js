
// Step Five

// NEED TO REFRENCE THIS https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation
// NEED TO REFRENCE THIS https://mobiforge.com/design-development/html5-mobile-web-canvas
// NEED TO REFRENCE THIS https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Managing_screen_orientation
// NEED TO REFRENCE THIS https://www.w3schools.com/tags/ref_eventattributes.asp
// NEED TO REFRENCE THIS http://bencentra.com/code/2014/12/05/html5-canvas-touch-events.html

// Canvas Variables 
var canvas; 
var body;


// Image Variables
var level; 
var otherAssets;
var wallAssets;


// Player Variables
var playerPositionX;
var playerPositionY;
var playerVelocityX;
var playerVelocityY;
var playerAccelerationX;
var playerAccelerationY;


// Enemy Variables
var enemyType;
var enemyPositionX;
var enemyPositionY;
var enemyVelocityX;
var enemyVelocityY;
var enemyAccelerationX;
var enemyAccelerationY;


// Wall Variables
var wallType;
var wallDefaultType;
var wallPositionX;
var wallPositionY;
var wallVelocityX;
var wallVelocityY;
var wallAccelerationX;
var wallAccelerationY;
var wallAccelerationZ;


// Other Variables
var renderTime;
var limit;
var limitTwo;
var switcher;
var previous;
var previousTwo;
var breaker;
var touch;
var loop;
var loopTwo;
var loopThree;
var loopFour;


window.onload = function() {
	
	
	// Canvas, Body and Graphics context
	canvas = document.getElementById("canvas");
    canvas.width = (9/10)*window.innerWidth;
    canvas.height = (9/10)*window.innerHeight;
	body = canvas.getContext("2d");
	
	
	// Images and Variables for Images
	level = document.getElementById("levelBase");
	otherAssets = [document.getElementById("playerGoal"), document.getElementById("playerBall"), document.getElementById("enemyHole"), document.getElementById("enemyBall")];
	wallAssets = [document.getElementById("wallBase"), document.getElementById("wallArrowShake"), document.getElementById("wallArrowTilt"), document.getElementById("wallArrowTouch"), document.getElementById("wallCloudShake"), document.getElementById("wallCloudTilt"), document.getElementById("wallCloudTouch"), document.getElementById("wallRotatedArrowShake"), document.getElementById("wallRotatedArrowTilt"), document.getElementById("wallRotatedArrowTouch")];
	
	
	// Player Variables
	playerPositionX = [canvas.width - canvas.width/20,0];
	playerPositionY = [canvas.height/2,0];
	playerVelocityX = 0;
	playerVelocityY = 0;
	playerAccelerationX = 0;
	playerAccelerationY = 0;
	
	
	// Enemy Variables
	// Bottom Row, Others.
	enemyType = [2,2,2,2,3];
	enemyPositionX = [canvas.width - canvas.width/20,canvas.width/2 - canvas.width/20,0,     canvas.width - 3*canvas.width/20,canvas.width - canvas.width/20];
	enemyPositionY = [canvas.height - canvas.height/10,canvas.height - canvas.height/10,canvas.height - canvas.height/10,     canvas.height/2,0];
	enemyVelocityX = [0,0,0,0,0];
	enemyVelocityY = [0,0,0,0,0];
	enemyAccelerationX = [0,0,0,0,0];
	enemyAccelerationY = [0,0,0,0,0];

	
	// Wall Variables
	// First Set of Base, Second Set of Base, Third Set of Base, One of each other Wall, Final Set of Base.
	wallType = [0,0,0,0,0,0,0,     0,0,0,0,0,0,0,     0,0,0,0,0,0,0,     1,2,3,4,5,6,8,7,9];
	wallDefaultType = [0,0,0,0,0,0,0,     0,0,0,0,0,0,0,     0,0,0,0,0,0,0,     1,2,3,4,5,6,7,8,9];
	wallPositionX = [canvas.width/10,canvas.width/10,canvas.width/10,canvas.width/10,canvas.width/10,canvas.width/10,canvas.width/10,     canvas.width/2,canvas.width/2,canvas.width/2,canvas.width/2,canvas.width/2,canvas.width/2,canvas.width/2,     canvas.width - canvas.width/20,canvas.width - 2*canvas.width/20,canvas.width - 3*canvas.width/20,canvas.width - 4*canvas.width/20,canvas.width - 4*canvas.width/20,canvas.width - 4*canvas.width/20,canvas.width - 4*canvas.width/20,     4*canvas.width/20,4*canvas.width/20,8*canvas.width/20,5*canvas.width/20,canvas.width/2 - canvas.width/20,canvas.width - 4*canvas.width/20,canvas.width/2 + canvas.width/20,canvas.width - 4*canvas.width/20,4*canvas.width/20];
	wallPositionY = [0,canvas.height/10,2*canvas.height/10,3*canvas.height/10,4*canvas.height/10,5*canvas.height/10,6*canvas.height/10,     canvas.height - canvas.height/10,canvas.height - 2*canvas.height/10,canvas.height - 3*canvas.height/10,canvas.height - 4*canvas.height/10,canvas.height - 5*canvas.height/10,canvas.height - 6*canvas.height/10,canvas.height - 7*canvas.height/10,     canvas.height/2 - canvas.height/10,canvas.height/2 - canvas.height/10,canvas.height/2 - canvas.height/10,canvas.height/2 - canvas.height/10,canvas.height/2,canvas.height/2 + canvas.height/10,canvas.height/2 + 2*canvas.height/10,     3*canvas.height/10,6*canvas.height/10,6*canvas.height/10,5*canvas.height/10,0,8*canvas.height/10,0,0,0];                                          
	wallVelocityX = [0,0,0,0,0,0,0,     0,0,0,0,0,0,0,     0,0,0,0,0,0,0,     0,0,0,0,0,0,0,0,0];
	wallVelocityY = [0,0,0,0,0,0,0,     0,0,0,0,0,0,0,     0,0,0,0,0,0,0,     0,0,0,0,0,0,0,0,0];
	wallAccelerationX = [0,0,0,0,0,0,0,     0,0,0,0,0,0,0,     0,0,0,0,0,0,0,     0,0,0,0,0,0,0,0,0];
	wallAccelerationY = [0,0,0,0,0,0,0,     0,0,0,0,0,0,0,     0,0,0,0,0,0,0,     0,0,0,0,0,0,0,0,0];
	wallAccelerationZ = [0,0,0,0,0,0,0,     0,0,0,0,0,0,0,     0,0,0,0,0,0,0,     0,0,0,0,0,0,0,0,0];
	limit = 0;
	limitTwo = 0;
	switcher = 1;
	previous = 1;
	previousTwo = 1;
	breaker = 1;
	touch = 0;
	
	
	// Add Base and Player
	body.beginPath();	
	body.drawImage(level,0,0,canvas.width,canvas.height);
	body.drawImage(otherAssets[0],playerPositionX[0],playerPositionY[0],canvas.width/20,canvas.height/10);	
	body.drawImage(otherAssets[1],playerPositionX[1],playerPositionY[1],canvas.width/20,canvas.height/10);
	
	
	// Add Enemies
	for(loop = 0; loop < enemyType.length; loop+=1) {
		body.beginPath();
		body.drawImage(otherAssets[enemyType[loop]],enemyPositionX[loop],enemyPositionY[loop],canvas.width/20,canvas.height/10);
	}
	
	
	// Add Walls
	for(loop = 0; loop < wallType.length; loop+=1) {
		body.beginPath();
		body.drawImage(wallAssets[wallType[loop]],wallPositionX[loop],wallPositionY[loop],canvas.width/20,canvas.height/10);
	}
	
	
	// Setting Intervals
	renderTime = 1;
	window.setInterval(render,renderTime);
	render();
	
	
}



// Main Function
function render() {
	
	
	// Motion Function
	window.ondevicemotion = function(deviceMotionEvent) {
		
		
		// Player Acceleration
		if ( playerAccelerationX/(Math.abs(playerAccelerationX)) == deviceMotionEvent.accelerationIncludingGravity.y/(Math.abs(deviceMotionEvent.accelerationIncludingGravity.y)) ) {
			playerAccelerationX = (1/40)*deviceMotionEvent.accelerationIncludingGravity.y;
		}
		else {
			playerAccelerationX = (1/80)*deviceMotionEvent.accelerationIncludingGravity.y;
		}
		if ( playerAccelerationY/(Math.abs(playerAccelerationY)) == deviceMotionEvent.accelerationIncludingGravity.x/(Math.abs(deviceMotionEvent.accelerationIncludingGravity.x)) ) {
			playerAccelerationY = (1/40)*deviceMotionEvent.accelerationIncludingGravity.x;
		}
		else {
			playerAccelerationY = (1/80)*deviceMotionEvent.accelerationIncludingGravity.x;
		}
		
		
		// Enemy Acceleration
		for(loop = 0; loop < enemyType.length; loop+=1) {
			
			
			// Enemy Ball
			if (enemyType[loop] == 3) {
				if ( enemyAccelerationX[loop]/(Math.abs(enemyAccelerationX[loop])) == deviceMotionEvent.accelerationIncludingGravity.y/(Math.abs(deviceMotionEvent.accelerationIncludingGravity.y)) ) {
					enemyAccelerationX[loop] = (1/40)*deviceMotionEvent.accelerationIncludingGravity.y;
				}
				else {
					enemyAccelerationX[loop] = (1/80)*deviceMotionEvent.accelerationIncludingGravity.y;
				}		
				if ( enemyAccelerationY[loop]/(Math.abs(enemyAccelerationY[loop])) == deviceMotionEvent.accelerationIncludingGravity.x/(Math.abs(deviceMotionEvent.accelerationIncludingGravity.x)) ) {
					enemyAccelerationY[loop] = (1/40)*deviceMotionEvent.accelerationIncludingGravity.x;
				}
				else {
					enemyAccelerationY[loop] = (1/80)*deviceMotionEvent.accelerationIncludingGravity.x;
				}
			}		
		}
		
		
		// Wall Acceleration
		for(loop = 0; loop < wallType.length; loop+=1) {	

		
			// wallArrowShake
			if (wallDefaultType[loop] == 1) {
				if (Math.abs(wallAccelerationZ[loop] - deviceMotionEvent.accelerationIncludingGravity.z) > 3) {
					wallAccelerationX[loop] = -0.1;
				}
				else {
					wallAccelerationX[loop] =  0.01;
				}
				wallAccelerationZ[loop] = deviceMotionEvent.accelerationIncludingGravity.z;
			}
			
			
			// wallArrowTilt
			if (wallDefaultType[loop] == 2) {
				if ( wallAccelerationX[loop]/(Math.abs(wallAccelerationX[loop])) == deviceMotionEvent.accelerationIncludingGravity.y/(Math.abs(deviceMotionEvent.accelerationIncludingGravity.y)) ) {
					wallAccelerationX[loop] = (1/40)*deviceMotionEvent.accelerationIncludingGravity.y;
				}
				else {
					wallAccelerationX[loop] = (1/80)*deviceMotionEvent.accelerationIncludingGravity.y;
				}
			}
		
			
			// wallCloudShake
			if (wallDefaultType[loop] == 4) {
				for(loopTwo = 0; loopTwo < enemyType.length; loopTwo+=1) {
					if (Math.abs(wallAccelerationZ[loop] - deviceMotionEvent.accelerationIncludingGravity.z) < 3) {
						wallType[loop] = 10;
						limit = 1;
					}
					else if (((playerPositionX[1] >= wallPositionX[loop] + canvas.width/20 || playerPositionX[1] <= wallPositionX[loop] - canvas.width/20) && (playerPositionY[1] >= wallPositionY[loop] + canvas.height/10 || playerPositionY[1] <= wallPositionY[loop] - canvas.height/10)) && ((enemyPositionX[loopTwo] >= wallPositionX[loop] + canvas.width/20 || enemyPositionX[loopTwo] <= wallPositionX[loop] - canvas.width/20) && (enemyPositionY[loopTwo] >= wallPositionY[loop] + canvas.height/10 || enemyPositionY[loopTwo] <= wallPositionY[loop] - canvas.height/10))) {
						limit = limit - 0.01;
						if (limit < 0) {
							wallType[loop] = 4;
						}
					}	
				}
			}
			
			
			// wallCloudTilt
			if (wallDefaultType[loop] == 5) {
				for(loopTwo = 0; loopTwo < enemyType.length; loopTwo+=1) {
					if (Math.abs(previous) + Math.abs(previousTwo) + 1.5 < Math.abs(deviceMotionEvent.accelerationIncludingGravity.x) + Math.abs(deviceMotionEvent.accelerationIncludingGravity.y)) {
						switcher = -1*switcher;
						if (switcher == 1) {
							wallType[loop] = 10;
						}
						if (switcher == -1) {
							if (((playerPositionX[1] >= wallPositionX[loop] + canvas.width/20 || playerPositionX[1] <= wallPositionX[loop] - canvas.width/20) && (playerPositionY[1] >= wallPositionY[loop] + canvas.height/10 || playerPositionY[1] <= wallPositionY[loop] - canvas.height/10)) && ((enemyPositionX[loopTwo] >= wallPositionX[loop] + canvas.width/20 || enemyPositionX[loopTwo] <= wallPositionX[loop] - canvas.width/20) && (enemyPositionY[loopTwo] >= wallPositionY[loop] + canvas.height/10 || enemyPositionY[loopTwo] <= wallPositionY[loop] - canvas.height/10))) {
								wallType[loop] = 5;
							}
							else {
								wallType[loop] = 10;
							}
						}
					}
				}
				previous = deviceMotionEvent.accelerationIncludingGravity.x;
				previousTwo = deviceMotionEvent.accelerationIncludingGravity.y;
			}
			
			
			// wallRotatedArrowShake
			if (wallDefaultType[loop] == 7) {
				if (Math.abs(wallAccelerationZ[loop] - deviceMotionEvent.accelerationIncludingGravity.z) > 3) {
					wallAccelerationY[loop] = -0.1;
				}
				else {
					wallAccelerationY[loop] =  0.01;
				}
				wallAccelerationZ[loop] = deviceMotionEvent.accelerationIncludingGravity.z;
			}
			
			
			// wallRotatedArrowTilt
			if (wallDefaultType[loop] == 8) {
				if ( wallAccelerationY[loop]/(Math.abs(wallAccelerationY[loop])) == deviceMotionEvent.accelerationIncludingGravity.y/(Math.abs(deviceMotionEvent.accelerationIncludingGravity.y)) ) {
					wallAccelerationY[loop] = (1/40)*deviceMotionEvent.accelerationIncludingGravity.y;
				}
				else {
					wallAccelerationY[loop] = (1/80)*deviceMotionEvent.accelerationIncludingGravity.y;
				}
			}
		}	
	}
	
	
	// Sets Player Velocity and Position
	playerVelocityX = playerVelocityX + playerAccelerationX;
	playerVelocityY = playerVelocityY + playerAccelerationY;
	playerPositionX[1] = playerPositionX[1] + (1/4)*playerVelocityX;
	playerPositionY[1] = playerPositionY[1] + (1/4)*playerVelocityY;
	
	
	// Check to prevent Player from leaving the Canvas
	if (playerPositionX[1] > canvas.width - (1/20)*canvas.width) {
		playerPositionX[1] = canvas.width - (1/20)*canvas.width;	
		playerVelocityX = (-1/4)*playerVelocityX;
	}
	else if (playerPositionX[1] < 0) {
		playerPositionX[1] = 0;
		playerVelocityX = (-1/4)*playerVelocityX;
	}
	
	
	if (playerPositionY[1] > canvas.height - (1/10)*canvas.height) {
		playerPositionY[1] = canvas.height - (1/10)*canvas.height;
		playerVelocityY = (-1/4)*playerVelocityY;
	}
	else if (playerPositionY[1] < 0) {
		playerPositionY[1] = 0;
		playerVelocityY = (-1/4)*playerVelocityY;
	}
	
	
	// Check to see if Player wins
	if ( (playerPositionX[1] < playerPositionX[0] + canvas.width/30 && playerPositionX[1] > playerPositionX[0] - canvas.width/30) && (playerPositionY[1] < playerPositionY[0] + canvas.height/15 && playerPositionY[1] > playerPositionY[0] - canvas.height/15) ) {
		alert ("GOALLLLLLL!!!!!!!");
		location.reload(); // Reloads page
	}
	
	
	// Enemy Mechanics
	for(loop = 0; loop < enemyType.length; loop+=1) {
		
		
		// The enemy must be alive.
		if (enemyType[loop] == 2 || enemyType[loop] == 3) {
			
			
			// Sets Enemy Velocity and Position.
			enemyVelocityX[loop] = enemyVelocityX[loop] + enemyAccelerationX[loop];
			enemyVelocityY[loop] = enemyVelocityY[loop] + enemyAccelerationY[loop];
			enemyPositionX[loop] = enemyPositionX[loop] + (1/4)*enemyVelocityX[loop];
			enemyPositionY[loop] = enemyPositionY[loop] + (1/4)*enemyVelocityY[loop];
		
		
			// Check to prevent Enemy from leaving the Canvas
			if (enemyPositionX[loop] >  canvas.width - (1/20)*canvas.width) {
				enemyPositionX[loop] =  canvas.width - (1/20)*canvas.width;
				enemyVelocityX[loop] =  (-1/4)*enemyVelocityX[loop];
			}
			else if (enemyPositionX[loop] < 0) {
				enemyPositionX[loop] =  0;
				enemyVelocityX[loop] =  (-1/4)*enemyVelocityX[loop];
			}
			if (enemyPositionY[loop] >  canvas.height - (1/10)*canvas.height) {
				enemyPositionY[loop] =  canvas.height - (1/10)*canvas.height;
				enemyVelocityY[loop] =  (-1/4)*enemyVelocityY[loop];
			}
			else if (enemyPositionY[loop] < 0) {
				enemyPositionY[loop] =  0;
				enemyVelocityY[loop] =  (-1/4)*enemyVelocityY[loop];
			}
			

			// IF Enemy hits Player/Goal.
			for(loopTwo = 0; loopTwo < playerPositionX.length; loopTwo+=1) {
				if ( (playerPositionX[loopTwo] < enemyPositionX[loop] + canvas.width/30 && playerPositionX[loopTwo] > enemyPositionX[loop] - canvas.width/30) && (playerPositionY[loopTwo] < enemyPositionY[loop] + canvas.height/15 && playerPositionY[loopTwo] > enemyPositionY[loop] - canvas.height/15) ) {
					enemyPositionX[loop] = canvas.width - enemyPositionX[loop];
					enemyPositionY[loop] = canvas.height - enemyPositionY[loop];	
					if (loopTwo == 1) {
						alert ("You are Dead");
						location.reload(); // Reloads page
					}
				}
			}
			
			
			// IF Enemy hits Wall.
			for(loopTwo = 0; loopTwo < wallType.length; loopTwo+=1) {
				if ( (enemyPositionX[loop] < wallPositionX[loopTwo] + canvas.width/20 && enemyPositionX[loop] > wallPositionX[loopTwo] - canvas.width/20) && (enemyPositionY[loop] < wallPositionY[loopTwo] + canvas.height/10 && enemyPositionY[loop] > wallPositionY[loopTwo] - canvas.height/10) && wallType[loopTwo] >= 0 && wallType[loopTwo] <= 9 ) {
					enemyPositionX[loop] = enemyPositionX[loop] - (1/2)*enemyVelocityX[loop];
					enemyPositionY[loop] = enemyPositionY[loop] - (1/2)*enemyVelocityY[loop];
					enemyVelocityX[loop] = (-1/2)*enemyVelocityX[loop];
					enemyVelocityY[loop] = (-1/2)*enemyVelocityY[loop];
					wallPositionX[loopTwo] = wallPositionX[loopTwo] - (1/4)*wallVelocityX[loopTwo];
					wallPositionY[loopTwo] = wallPositionY[loopTwo] - (1/4)*wallVelocityY[loopTwo];
					wallVelocityX[loopTwo] = (-1/4)*wallVelocityX[loopTwo];
					wallVelocityY[loopTwo] = (-1/4)*wallVelocityY[loopTwo];
				}
			}
	
	
			// IF Enemy Ball hits Enemy Hole.
			if (enemyType[loop] == 3) {
				for(loopTwo = 0; loopTwo < enemyType.length; loopTwo+=1) {
					if ( (enemyPositionX[loop] < enemyPositionX[loopTwo] + canvas.width/30 && enemyPositionX[loop] > enemyPositionX[loopTwo] - canvas.width/30) && (enemyPositionY[loop] < enemyPositionY[loopTwo] + canvas.height/15 && enemyPositionY[loop] > enemyPositionY[loopTwo] - canvas.height/15) && enemyType[loopTwo] == 2) {
						enemyType[loop] = 4;
					}
				}
			}	
		}
	}	
	

	// Wall Mechanics
	for(loop = 0; loop < wallType.length; loop+=1) {
		
		
		// The wall must be alive.
		if (wallType[loop] >= 0 && wallType[loop] <= 9) {
			
			
			// Sets Wall Velocity and Position.
			wallVelocityX[loop] = wallVelocityX[loop] + wallAccelerationX[loop];
			wallVelocityY[loop] = wallVelocityY[loop] + wallAccelerationY[loop];
			wallPositionX[loop] = wallPositionX[loop] + (1/4)*wallVelocityX[loop];
			wallPositionY[loop] = wallPositionY[loop] + (1/4)*wallVelocityY[loop];
		
		
			// Check to prevent Wall from leaving the Canvas
			if (wallPositionX[loop] >  canvas.width - (1/20)*canvas.width) {
				wallPositionX[loop] =  canvas.width - (1/20)*canvas.width;
				wallVelocityX[loop] =  (-1/4)*wallVelocityX[loop];
			}
			else if (wallPositionX[loop] < 0) {
				wallPositionX[loop] =  0;
				wallVelocityX[loop] =  (-1/4)*wallVelocityX[loop];
			}
			if (wallPositionY[loop] >  canvas.height - (1/10)*canvas.height) {
				wallPositionY[loop] =  canvas.height - (1/10)*canvas.height;
				wallVelocityY[loop] =  (-1/4)*wallVelocityY[loop];
			}
			else if (wallPositionY[loop] < 0) {
				wallPositionY[loop] =  0;
				wallVelocityY[loop] =  (-1/4)*wallVelocityY[loop];
			}
			
			
			// IF Player/Goal hits Wall.	
			for(loopTwo = 0; loopTwo < playerPositionX.length; loopTwo+=1) {
				if ( (playerPositionX[loopTwo] < wallPositionX[loop] + canvas.width/20 && playerPositionX[loopTwo] > wallPositionX[loop] - canvas.width/20) && (playerPositionY[loopTwo] < wallPositionY[loop] + canvas.height/10 && playerPositionY[loopTwo] > wallPositionY[loop] - canvas.height/10) ) {
					
					
					if (playerPositionX[loopTwo] > wallPositionX[loop]) {
						playerPositionX[loopTwo] = (canvas.width/20)*(Math.floor(playerPositionX[loopTwo]/(canvas.width/20)))
						playerVelocityX = (-1/4)*playerVelocityX;
					}
					else if (playerPositionX[loopTwo] < wallPositionX[loop]) {
						playerPositionX[loopTwo] =  (canvas.width/20)*(Math.ceil(playerPositionX[loopTwo]/(canvas.width/20)))
						playerVelocityX = (-1/4)*playerVelocityX;
					}
					if (playerPositionY[loopTwo] > wallPositionY[loop]) {
						playerPositionY[loopTwo] = (canvas.heigth/10)*(Math.floor(playerPositionY[loopTwo]/(canvas.heigth/10)))
						playerVelocityY = (-1/4)*playerVelocityY;
					}
					else if (playerPositionY[loopTwo] > wallPositionY[loop]) {
						playerPositionY[loopTwo] = (canvas.heigth/10)*(Math.ceil(playerPositionY[loopTwo]/(canvas.heigth/10)))
						playerVelocityY = (-1/4)*playerVelocityY;
						
						
					}
				}
			}
			
			
			// IF Wall hits Wall.	
			for(loopTwo = 0; loopTwo < wallType.length; loopTwo+=1) {
				if (wallType[loopTwo] >= 0 && wallType[loopTwo] <= 9 && loopTwo != loop) {
					if ( (wallPositionX[loopTwo] < wallPositionX[loop] + canvas.width/20 && wallPositionX[loopTwo] > wallPositionX[loop] - canvas.width/20) && (wallPositionY[loopTwo] < wallPositionY[loop] + canvas.height/10 && wallPositionY[loopTwo] > wallPositionY[loop] - canvas.height/10) ) {
						wallPositionX[loop] = wallPositionX[loop] - (1/2)*wallVelocityX[loop];
						wallPositionY[loop] = wallPositionY[loop] - (1/2)*wallVelocityY[loop];
						wallVelocityX[loop] = (-1/4)*wallVelocityX[loop];
						wallVelocityY[loop] = (-1/4)*wallVelocityY[loop];
					}
				}
			}
		}	
	}	
	
	
	// Add Base and Player
	body.beginPath();
	body.clearRect(0,0,canvas.width,canvas.height);
	body.drawImage(level,0,0,canvas.width,canvas.height);
	body.drawImage(otherAssets[0],playerPositionX[0],playerPositionY[0],canvas.width/20,canvas.height/10);
	body.drawImage(otherAssets[1],playerPositionX[1],playerPositionY[1],canvas.width/20,canvas.height/10);
		
	
	// Add Enemies	
	for(loop = 0; loop < enemyType.length; loop+=1) {
		if (enemyType[loop] == 2 || enemyType[loop] == 3) {
			body.beginPath();
			body.drawImage(otherAssets[enemyType[loop]],enemyPositionX[loop],enemyPositionY[loop],canvas.width/20,canvas.height/10);
		}
	}
	
	
	// Add Walls
	for(loop = 0; loop < wallType.length; loop+=1) {
		if (wallType[loop] >= 0 && wallType[loop] <= 9) {	
			body.beginPath();
			body.drawImage(wallAssets[wallType[loop]],wallPositionX[loop],wallPositionY[loop],canvas.width/20,canvas.height/10);	
		}		
	}	
}




// wallArrowTouch Functions
window.addEventListener("touchstart", function wallArrowTouchStart(event) {
	event.preventDefault();
	touch = event.touches[0];
	breaker = 0;

	for(loopThree = 0; loopThree < wallType.length; loopThree+=1) {		

		// wallCloudTouch
		if (wallDefaultType[loopThree] == 6) {
			if (touch.pageX < wallPositionX[loopThree] + canvas.width/20 && touch.pageX > wallPositionX[loopThree] && touch.pageY < wallPositionY[loopThree] + canvas.width/20 && touch.pageY > wallPositionY[loopThree]) {			
				wallType[loopThree] = 10;			
			}		
		}	
	}		
	
});
window.addEventListener("touchmove", function wallArrowTouchMove(event) {
	event.preventDefault();
	touch = event.touches[0];
	for(loopThree = 0; loopThree < wallType.length; loopThree+=1) {	

		// wallArrowTouch
		if (wallDefaultType[loopThree] == 3 && breaker == 0) {
			if (touch.pageX < wallPositionX[loopThree] + 2*canvas.width/20 && touch.pageX > wallPositionX[loopThree] - canvas.width/20 && touch.pageY < wallPositionY[loopThree] + 2*canvas.height/10 && touch.pageY > wallPositionY[loopThree]  - canvas.height/10) {	
				wallPositionX[loopThree] = touch.pageX;	
			}
			
	
			// IF Player/Goal hits Wall.		
			for(loopFour = 0; loopFour < playerPositionX.length; loopFour+=1) {
				if ( (playerPositionX[loopFour] < wallPositionX[loopThree] + canvas.width/20 && playerPositionX[loopFour] > wallPositionX[loopThree] - canvas.width/20) && (playerPositionY[loopFour] < wallPositionY[loopThree] + canvas.height/10 && playerPositionY[loopFour] > wallPositionY[loopThree] - canvas.height/10) ) {
					playerPositionX[loopThree] = canvas.width/20*(Math.floor(playerPositionX[loopThree]/(canvas.width/20)));
					playerPositionY[loopThree] = canvas.height/10*(Math.floor(playerPositionY[loopThree]/(canvas.height/10)));	
					playerPositionX[loopFour] = playerPositionX[loopFour] - (1/2)*playerVelocityX;
					playerPositionY[loopFour] = playerPositionY[loopFour] - (1/2)*playerVelocityY;
					playerVelocityX = (-1/2)*playerVelocityX;
					playerVelocityY = (-1/2)*playerVelocityY;
					wallPositionX[loopThree] = (canvas.width/20)*(Math.floor(wallPositionX[loopThree]/(canvas.width/20))) + (canvas.width/40)*(((wallPositionX[loopThree] - playerPositionX[loopFour])/(Math.abs(wallPositionX[loopThree] - playerPositionX[loopFour]))));
				}		
			}
			
			
			// IF Enemy hits Wall.
			for(loopFour = 0; loopFour < enemyType.length; loopFour+=1) {		
				if ( (enemyPositionX[loopFour] < wallPositionX[loopThree] + canvas.width/20 && enemyPositionX[loopFour] > wallPositionX[loopThree] - canvas.width/20) && (enemyPositionY[loopFour] < wallPositionY[loopThree] + canvas.height/10 && enemyPositionY[loopFour] > wallPositionY[loopThree] - canvas.height/10) && (enemyType[loopFour] == 2 || enemyType[loopFour] == 3)) {
					enemyPositionX[loopThree] = canvas.width/20*(Math.floor(enemyPositionX[loopThree]/(canvas.width/20)));
					enemyPositionY[loopThree] = canvas.height/10*(Math.floor(enemyPositionY[loopThree]/(canvas.height/10)));	
					enemyPositionX[loopFour] = enemyPositionX[loopFour] - (1/2)*enemyVelocityX[loopFour];
					enemyPositionY[loopFour] = enemyPositionY[loopFour] - (1/2)*enemyVelocityY[loopFour];
					enemyVelocityX[loopFour] = (-1/2)*enemyVelocityX[loopFour];
					enemyVelocityY[loopFour] = (-1/2)*enemyVelocityY[loopFour];
					wallPositionX[loopThree] = (canvas.width/20)*(Math.floor(wallPositionX[loopThree]/(canvas.width/20))) + (canvas.width/40)*(((wallPositionX[loopThree] - enemyPositionX[loopFour])/(Math.abs(wallPositionX[loopThree] - enemyPositionX[loopFour]))));	
				}		
			}
			
			
			// IF Wall hits Wall.	
			for(loopFour = 0; loopFour < wallType.length; loopFour+=1) {
				if (wallType[loopFour] >= 0 && wallType[loopFour] <= 9 && loopFour != loopThree) {
					if ( (wallPositionX[loopFour] < wallPositionX[loopThree] + canvas.width/20 && wallPositionX[loopFour] > wallPositionX[loopThree] - canvas.width/20) && (wallPositionY[loopFour] < wallPositionY[loopThree] + canvas.height/10 && wallPositionY[loopFour] > wallPositionY[loopThree] - canvas.height/10) ) {
						wallPositionX[loopFour] = (canvas.width/20)*(Math.floor(wallPositionX[loopFour]/(canvas.width/20)))
						wallPositionX[loopThree] = (canvas.width/20)*(Math.floor(wallPositionX[loopThree]/(canvas.width/20))) + (canvas.width/40)*(((wallPositionX[loopThree] - wallPositionX[loopFour])/(Math.abs(wallPositionX[loopThree] - wallPositionX[loopFour]))));
					}
				}
			}
		}

		
		// wallRotatedArrowTouch
		if (wallDefaultType[loopThree] == 9 && breaker == 0) {
			if (touch.pageX < wallPositionX[loopThree] + 2*canvas.width/20 && touch.pageX > wallPositionX[loopThree] - canvas.width/20 && touch.pageY < wallPositionY[loopThree] + 2*canvas.height/10 && touch.pageY > wallPositionY[loopThree]  - canvas.height/10) {	
				wallPositionY[loopThree] = touch.pageY;	
			}
			
	
			// IF Player/Goal hits Wall.		
			for(loopFour = 0; loopFour < playerPositionX.length; loopFour+=1) {
				if ( (playerPositionX[loopFour] < wallPositionX[loopThree] + canvas.width/20 && playerPositionX[loopFour] > wallPositionX[loopThree] - canvas.width/20) && (playerPositionY[loopFour] < wallPositionY[loopThree] + canvas.height/10 && playerPositionY[loopFour] > wallPositionY[loopThree] - canvas.height/10) ) {
					playerPositionX[loopThree] = canvas.width/20*(Math.floor(playerPositionX[loopThree]/(canvas.width/20)));
					playerPositionY[loopThree] = canvas.height/10*(Math.floor(playerPositionY[loopThree]/(canvas.height/10)));	
					playerPositionX[loopFour] = playerPositionX[loopFour] - (1/2)*playerVelocityX;
					playerPositionY[loopFour] = playerPositionY[loopFour] - (1/2)*playerVelocityY;
					playerVelocityX = (-1/2)*playerVelocityX;
					playerVelocityY = (-1/2)*playerVelocityY;	
					wallPositionY[loopThree] = canvas.height/10*(Math.floor(wallPositionY[loopThree]/canvas.height/20));
				}		
			}
			
			
			// IF Enemy hits Wall.
			for(loopFour = 0; loopFour < enemyType.length; loopFour+=1) {		
				if ( (enemyPositionX[loopFour] < wallPositionX[loopThree] + canvas.width/20 && enemyPositionX[loopFour] > wallPositionX[loopThree] - canvas.width/20) && (enemyPositionY[loopFour] < wallPositionY[loopThree] + canvas.height/10 && enemyPositionY[loopFour] > wallPositionY[loopThree] - canvas.height/10) && (enemyType[loopFour] == 2 || enemyType[loopFour] == 3)) {
					enemyPositionX[loopThree] = canvas.width/20*(Math.floor(enemyPositionX[loopThree]/(canvas.width/20)));
					enemyPositionY[loopThree] = canvas.height/10*(Math.floor(enemyPositionY[loopThree]/(canvas.height/10)));	
					enemyPositionX[loopFour] = enemyPositionX[loopFour] - (1/2)*enemyVelocityX[loopFour];
					enemyPositionY[loopFour] = enemyPositionY[loopFour] - (1/2)*enemyVelocityY[loopFour];
					enemyVelocityX[loopFour] = (-1/2)*enemyVelocityX[loopFour];
					enemyVelocityY[loopFour] = (-1/2)*enemyVelocityY[loopFour];
					wallPositionY[loopThree] = canvas.height/10*(Math.floor(wallPositionY[loopThree]/(canvas.height/10)));
				}		
			}
			
			
			// IF Wall hits Wall.	
			for(loopFour = 0; loopFour < wallType.length; loopFour+=1) {
				if (wallType[loopFour] >= 0 && wallType[loopFour] <= 9 && loopFour != loopThree) {
					if ( (wallPositionX[loopFour] < wallPositionX[loopThree] + canvas.width/20 && wallPositionX[loopFour] > wallPositionX[loopThree] - canvas.width/20) && (wallPositionY[loopFour] < wallPositionY[loopThree] + canvas.height/10 && wallPositionY[loopFour] > wallPositionY[loopThree] - canvas.height/10) ) {
						wallPositionY[loopFour] = canvas.height/10*(Math.floor(wallPositionY[loopFour]/(canvas.height/10)));
						wallPositionY[loopThree] = canvas.height/10*(Math.floor(wallPositionY[loopThree]/(canvas.height/10)));
					}
				}
			}
		}
	}
});
window.addEventListener("touchend", function wallArrowTouchEnd(event) {
	event.preventDefault();
	breaker = 1;
});