//"abbreviation(s)"  is shortened to "abb(s)"  throughout this document
//array of abbreviations
const abbs = ["ABBE", "BAZA", "BERY", "BLAC", "BLAN", "BLUE", "BOSC", "BRUC", "CARD", "CHAS", "COPP", "CREE", "CROO", "DANC", "DEVI", "DYIN", "EMPT", "ENGR", "FINA", "FIVE", "GLOR", "GOLD", "GREE", "HOUN", "IDEN", "ILLU", "LADY", "LAST", "LION", "MAZA", "MISS", "MUSG", "NAVA", "NOBL", "NORW", "PREF", "PRIO", "REDC", "REDH", "REIG", "RESI", "RETI", "SCAN", "SECO", "SHOS", "SIGN", "SILV", "SIXN", "SOLI", "SPEC", "STOC", "STUD", "SUSS", "THOR", "3GAB", "3GAR", "3STU", "TWIS", "VALL", "VEIL", "WATS", "WIST", "YELL"];

//establishing variables
const form = document.querySelector("form");
const input = document.querySelector("#input");
const correct = document.querySelector("#correct"); 
const done = document.querySelector("#done");
const results = document.querySelector("#results");
const reset = document.querySelector("#reset");

let guessed = [];
let missed = [];
let count = 0;

//used when clicking the reset button at end of game.
function resetGame() {

	//enables and focuses on input
    input.removeAttribute("disabled"); 
	input.focus();
	//resets visible button
    done.style.display = "inline";
    reset.style.display = "none"; 
	//reset variables, correct list, results text
    count = 0;
    guessed = [];
    missed = [];
    results.innerHTML = "";
    correct.textContent = "None so far!";

 }
 
 function endGame () {

	//disables input
	input.setAttribute("disabled", true);
	//displays results text, adding missed abbreviations
	results.innerHTML = `<p>Congrats! You got ${count}/${abbs.length} abbreviations!</p>`;
	abbs.forEach(abb => {
		if (!guessed.includes(abb)){ 
			missed.push(abb); //if abb was not guessed, added to missed array
		};
	});
	if (missed.length === 0) { //checks if all correct.
		results.innerHTML += `<p>Wow! You didn't miss a single one!</p>`;
	} else {
		results.innerHTML += `<p>Here are the ones you missed:`;
		missed.forEach(miss => {
			results.innerHTML += ` ${miss}`; //prints miss array
		});
		results.innerHTML += `</p>`; 
	};
	//changes visible button to reset and highlights it
	done.style.display = "none";
	reset.style.display = "inline";
    reset.focus();
};

//prevent anything from happening when hitting enter key
form.addEventListener("submit", e => {
	e.preventDefault();
});

//detects input and reacts to whether it is
//within the array of abbs or not
input.addEventListener("keyup", e => {
	const guess = e.target.value.trim().toUpperCase();
	abbs.forEach(abb => {
		if(abb === guess && !guessed.includes(abb)){ //keeps doubles from happening
			count ++;
			if(count === 1) {
				correct.textContent = ""; //on first correct guess, deletes "you havent found any yet" text
			};
			correct.textContent += ` ${abb}`; //adds list of correct guesses
			guessed.push(guess);
			e.target.value = ""; //clears input field
		};
	});
});

//end game with done button
done.addEventListener("click", () => {
	endGame();
});

//reset game with reset button.
reset.addEventListener("click", () => {
	resetGame();
});
