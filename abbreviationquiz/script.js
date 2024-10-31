//"abbreviation(s)"  is shortened to "abb(s)"  throughout this document

const abbs = ["ABBE", "BAZA", "BERY", "BLAC", "BLAN", "BLUE", "BOSC", "BRUC", "CARD", "CHAS", "COPP", "CREE", "CROO", "DANC", "DEVI", "DYIN", "EMPT", "ENGR", "FINA", "FIVE", "GLOR", "GOLD", "GREE", "HOUN", "IDEN", "ILLU", "LADY", "LAST", "LION", "MAZA", "MISS", "MUSG", "NAVA", "NOBL", "NORW", "PREF", "PRIO", "REDC", "REDH", "REIG", "RESI", "RETI", "SCAN", "SECO", "SHOS", "SIGN", "SILV", "SIXN", "SOLI", "SPEC", "STOC", "STUD", "SUSS", "THOR", "3GAB", "3GAR", "3STU", "TWIS", "VALL", "VEIL", "WATS", "WIST", "YELL"];

const form = document.querySelector("form");
const input = document.querySelector("#input");
const correct = document.querySelector("#correct"); 
const done = document.querySelector("#done");
const results = document.querySelector("#results");
const reset = document.querySelector("#reset");


let guessed = [];
let missed = [];
let count = 0;

function resetGame() {

    input.removeAttribute("disabled"); 
    done.style.display = "inline";
    reset.style.display = "none";
    count = 0;
    guessed = [];
    missed = [];
    results.innerHTML = "";
    correct.textContent = "None so far!";
    input.focus();

 }
 
 function endGame () {
	input.setAttribute("disabled", true);
	results.innerHTML = `<p>Congrats! You got ${count}/${abbs.length} abbreviations!</p>`;
	abbs.forEach(abb => {
		if (!guessed.includes(abb)){
			missed.push(abb);
		};
	});
	if (missed.length === 0) {
		results.innerHTML += `<p>Wow! You didn't miss a single one!</p>`;
	} else {
		results.innerHTML += `<p>Here are the ones you missed:`;
		missed.forEach(miss => {
			results.innerHTML += ` ${miss}`;
		});
		results.innerHTML += `</p>`;
	};
	done.style.display = "none";
	reset.style.display = "inline";
    reset.focus();
};

//prevent anything from happening when hitting enter key
form.addEventListener("submit", e => {
	e.preventDefault();
});

input.addEventListener("keyup", e => {
	const guess = e.target.value.trim().toUpperCase();
	abbs.forEach(abb => {
		if(abb === guess && !guessed.includes(abb)){
			count ++;
			if(count === 1) {
				correct.textContent = "";
			};
			correct.textContent += ` ${abb}`;
			guessed.push(guess);
			e.target.value = "";
		};
	});
});

done.addEventListener("click", () => {
	endGame();
});

reset.addEventListener("click", () => {
	resetGame();
});


