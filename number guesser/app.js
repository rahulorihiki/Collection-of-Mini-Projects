/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
	max = 10,
	winningNum = getRandomNum(min, max), // Here the "getRandomNum()" function randomly creates a random number which lies between the values of min and max variable of line 11 and line 12
	guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
	minNum = document.querySelector('.min-num'),
	maxNum = document.querySelector('.max-num'),
	guessBtn = document.querySelector('#guess-btn'),
	guessInput = document.querySelector('#guess-input'),
	message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener(Now normally we would use a click event but here we have used a mousedown event now why the hell did we use mousedown event the reason is because suppose you entered the game and then put your input then click on the "submit" button which will activate the submit event discussed in line 36 lets call this event E1 and normally what should happen is that if you have given the correct input then it should display "YOU WIN!!!" thwn normally if you want to now play again then we will click on the play again button that is present in the green circle as shown in page-1.png which will activate the event of line 29 lets call this E2 . now if we put a click event on E2 then what happens is that when you enter the game and after giving your input you would click on the submit button to activate E1 but as soon as we click on the submit button the E2(that is page reloading) will also take place simulatneously that is inshort when we started E1 the E2 also took place simultaneously this is exactly why we dont use a click event and this is prevented by using the mousedown event )
game.addEventListener('mousedown', function (e) {
	if (e.target.className === 'play-again') {
		window.location.reload();
	}
});

// Listen for guess
guessBtn.addEventListener('click', function () {
	let guess = parseInt(guessInput.value);

	// Validate
	// Now in the below line "isNaN()" is a method which is provided to us by default which will check  whether there is any data stored in any variable . Now why we have used it here is because there are some piece of shit out there who just click on the submit button without actually giving any input in the first place that is why we passed the "guess" variable of line 37 as an argument if "isNaN()" method as done in the below line which basically will check whether the user has given any input or not
	if (isNaN(guess) || guess < min || guess > max) {
		setMessage(`Please enter a number between ${min} and ${max}`, 'red');
	}

	// Check if won
	if (guess === winningNum) {
		// Game over - won
		// In the previous lecture we had not created the "gameOver()" function as we have called in the below line but why is there a need to create the "gameover()" function in the first place the reason is to follow the DRY(Donot Repeat Yourself) principal acording to which we should try our most to never repeat ourselves that is we have to always try to create an algorithm with the least amount of code because every time we are writing a code we are using data that is more lenghthy the code more the data occupied by our code that is why the space complexity is destroyed so inshort if you try to create the call of duty game without using any "FUNCTIONS" then the the game which is currently occupying 3 GB will ocuppy around 10 GB and no one will even bother to download the game which occupies that much space THIS IS WHY THE "DRY PRINCIPAL IS VERY IMPORTANT FOR CONSIDERING THE SPACE COMPLEXITY OF A CODE
		gameOver(true, `${winningNum} is correct, YOU WIN!`);
	} else {
		// Wrong number
		// As discussed in line 4 and line 5 each of the player gets a certain number of guesses and we also have to notify them how many guesses they have still left. so suppose the user has number of guesses left as 3 but nowthe user has given one wrong input then now logically the total number of guesses that she has left is 3-1=2(This is why we have written the below line) and in the similar way we also have to notify the user that instead of initial 3 guesses now you only have 2 guesses this is why we write line 68
		guessesLeft -= 1;
		// Now suppose the user kept on giving wrong input and now the user has no guesses left so technically he has lost that is why we write line 57
		if (guessesLeft === 0) {
			// Game over - lost
			gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
		} else {
			// Game continues - answer wrong

			// Change border color
			guessInput.style.borderColor = 'red';

			// Clear Input(Now if you want to know why we did this go to lecture 34 line 55 and 56 )
			guessInput.value = '';

			// Now here dont misunderstand the game is now not over yet the user has only lost one of the many guesses that he was left with so as told in line 52 we have to tell the user how many guesses he has left
			setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
		}
	}
});

// Game over
// Now why we have to create this "ganeOver()" function in the first place this is because suppose we had not created this function then like in the previous lecture we would to write line 81 to line 92 agin in line 57 and line 49 . now dont misunderstand me here the problem here is not that the person has to write extra code which is a pain in the ass but the major problem is that longer the code more data it will take as told in line 48 This is why it is important to keep our code short and also to avoid unnecessary codes so as to save space which at the end is the main thing
function gameOver(won, msg) {
	let color;
	//The below line is a shortcut for "if-else-conditional statement" which we have learnt in lecture 16 anyways what the below lines mean is "If the "won" variable has a value of "true" then the value of the c "color" variable is green otherwise the value of the "color" variable is "red"
	won === true ? (color = 'green') : (color = 'red');

	// Disable input
	guessInput.disabled = true;
	// Change border color
	guessInput.style.borderColor = color;
	// Set text color
	message.style.color = color;
	// Set message
	setMessage(msg);

	// now below what we have done is that suppose the user has won the game or lost the game what next ??? that is why we provide an option of play again as shown in green circle of page-1.png in replacement of the red-circle of page-2.png
	guessBtn.value = 'Play Again';
	guessBtn.className += 'play-again';
}

// Here we are creating the function that we had declared in line 13 which will randomly create a random integer number the explanation pf this function has been told in your handwritten notes
function getRandomNum(min, max) {
	return Math.floor(min + Math.random() * (max - min + 1));
}

// Set message
function setMessage(msg, color) {
	message.style.color = color;
	message.textContent = msg;
}
