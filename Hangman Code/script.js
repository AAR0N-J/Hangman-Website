var word = "";
var guessedWrong = 0;
var wordToGuess=[];
var checkWord = "";
var current = "";
makeLetterButtons();
getWord();
document.querySelector("#hung").innerHTML = `<img src="Hangman img/Hangman0.jpg">`;

document.getElementById("letterButtons").addEventListener("click", (event) => {
  let letter = event.target.value;
  if(guessedWrong<8){
    if(letter != null && word.includes(letter)){
      for (let i=0; i<word.length; i++){
        if(word[i] == letter){
          wordToGuess[i] = letter;
          
        }
      }
      document.querySelector("#guessWord").innerHTML = "";
       for (let i=0; i<word.length; i++){
          document.querySelector("#guessWord").innerHTML += wordToGuess[i];
       }
      for(let i=0;i<wordToGuess.length; i++){
        checkWord += wordToGuess[i];
      }
      
      if(checkWord == word){
        won();
      }
      checkWord = "";
    }
    takeAwayButton();
    function takeAwayButton(){event.target.disabled = true;}
    if (letter != null && !word.includes(letter)){
      guessedWrong++;
      document.querySelector("#mistakes").innerHTML = guessedWrong+" ";
    }
  } 
  document.querySelector("#hung").innerHTML = `<img src="Hangman img/Hangman${guessedWrong}.jpg">`;
  if (guessedWrong==8){
    gameEnd();
  }
});
function makeLetterButtons(){
  let letters = ["a", "b", "c", "d", "e", "f", "g","h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  for (let i = 0; i < letters.length; i++) {
    document.querySelector("#letterButtons").innerHTML += `<button type="button" class="btn btn-outline-secondary m-2 text-center text-black text-uppercase" value="${letters[i]}"> ${letters[i]} </button>`;
  }
}
async function getWord(){
  let url=`https://random-word-api.herokuapp.com/word`;
  let response = await fetch(url);
  let data = await response.json();
  word = data[0];
  console.log(word);
  for(let i=0; i<word.length; i++){
    wordToGuess[i] = "_ ";
    document.querySelector("#guessWord").innerHTML += wordToGuess[i];
  }
}
function gameEnd() {
  document.querySelector("#guessWord").innerHTML = word;
  document.querySelector("#letterButtons").innerHTML = "";
  document.querySelector("#status").innerHTML = `<p class="fs-1 text-danger text-center">You Dead</p>`
  document.querySelector("#reset").innerHTML =`  <button type="button" id="reset"class="btn btn-outline-primary m-2 text-center text-black text-uppercase">Reset</button>`;
  document.querySelector("#reset").addEventListener("click", reload)
}
function won(){
  document.querySelector("#guessWord").innerHTML = word;
  document.querySelector("#letterButtons").innerHTML = "";
  document.querySelector("#status").innerHTML = `<p class="fs-1 text-success text-center">You Won!</p>`
  document.querySelector("#reset").innerHTML =`  <button type="button" id="reset"class="btn btn-outline-primary m-2 text-center text-black text-uppercase">Reset</button>`;
  document.querySelector("#reset").addEventListener("click", reload)
}
function reload(){
  location.reload()
}


//document.getElementById('hangmanPic').src = './img/' + mistakes + '.png';