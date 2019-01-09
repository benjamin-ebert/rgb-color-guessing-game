var numSquares = 6;
var colors = [];
var pickedColor;														// picks random color out of colors
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");


init();

function init(){
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons(){
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function(){
			// apply "selected" to the right one
			modeButtons[0].classList.remove("selected");					// first remove "selected" from both
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");									// then add it the one that was clicked
			// decide whether it's 3 or 6 squares
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6	// ternary operator, shorter than if statement
			// reset everything												// useful when there's only two options
			reset();
		});
	}
}

function setupSquares(){
	for (var i = 0; i < squares.length; i++) {	
		// add click listeners to squares
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			// compare color to picked color
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
				resetButton.textContent = "Play Again";
			} else {
				this.style.backgroundColor = "#232323";						// make the square color match the background
				messageDisplay.textContent = "Try Again";
				resetButton.textContent = "New Colors";
			}
		})	
	}
}

function reset(){
	// generate all new colors
	colors = randomColorArray(numSquares);
	// pick a new random color from array
	pickedColor = pickColor();
	// change color display to match picked color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	// don't display "correct" or "try again" after reset
	messageDisplay.textContent = "";
	// change colors of sqares
	for (var i = 0; i < squares.length; i++) {
		if(colors[i]){													// if the current color in the array is there
			squares[i].style.display = "block";							// absolutely show the corresponding square
			squares[i].style.backgroundColor = colors[i];				// make the color the background of the square
		} else {														// if there is no color in the current arry slot
			squares[i].style.display = "none";							// show nothing
		}																// --> takes care of hiding the bottom 3 in easy mode
	}
	h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function(){
	reset();
})

function changeColors(color){											// (color) means it takes a color string as an argument, 
	// loop through all squares											// can be named anything
	for (var i = 0; i < squares.length; i++){
		// change each color to match given coor
		squares[i].style.background = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);				// pick a number within the colors array, save it into a variable
	return colors[random];												// make that variable the index of the array		
}

function randomColorArray(num){
	// make an array
	var arr = []
	// add num random colors to array
	for(var i = 0; i < num; i++){
		// get random color and push into array
		arr.push(randomColor())
	}
	// return that array
	return arr;
}

function randomColor(){
	// pick a red from 0 to 255
	var r = Math.floor(Math.random() * 256);
	// pick a blue from 0 to 255
	var g = Math.floor(Math.random() * 256);
	// pick a green from 0 to 255
	var b = Math.floor(Math.random() * 256);
	return "rgb("+r+", "+g+", "+b+")";
}


// Explaining the Math function
// Example: Math.floor(Math.random() * 6 + 1)

// Math.random picks some number between 0 and 0.999 (floating)
// * 6 makes the range go from 0 to 5.999
// + 1 makes the range go from 0 to 6.999
// Math.floor transforms the floating number into a whole number



