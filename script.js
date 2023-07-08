const wordDetails = document.querySelector(".word-details");
const searchInput = document.querySelector(".search-input");
const selectInput = document.querySelector(".select-input");
const listCard = document.querySelector(".list-card");
const list = document.querySelector(".list");
const showWords = document.querySelector(".showWords");

let words;

async function fetchWords() {
  let response = await fetch("./main.json");
  let data = await response.json();

  words = data;

  return words;
}

fetchWords();

//get data from local storage
function getDataFromLocalStorage() {
  const learned = localStorage.getItem("learned");
  return learned ? JSON.parse(learned) : [];
}

// add data to local storage
function addDataToLocalStorage(learn) {
  const learned = getDataFromLocalStorage();
  learned.push(learn);
  localStorage.setItem("learned", JSON.stringify(learned));
}

// this function is doing to
function isAlreadyLearned(word) {
  const learned = getDataFromLocalStorage();
  return learned.some((learn) => learn.word === word);
}

// update the local storage
function removeDataFromLocalStorage(word) {
  const learned = getDataFromLocalStorage();
  const updatedLearned = learned.filter((learn) => learn.word !== word);
  localStorage.setItem("learned", JSON.stringify(updatedLearned));
}

searchInput.addEventListener("keyup", function (e) {
  const searchTerm = e.target.value.trim().toLowerCase();
  list.innerHTML = "";

  if (searchTerm.length === 0) {
    listCard.classList.add("d-none");
  } else {
    const matchingWords = words.filter((word) =>
      word.word.toLowerCase().includes(searchTerm)
    );

    if (matchingWords.length > 0) {
      matchingWords.forEach((word) => {
        list.innerHTML += `
              <h4 class="target-class">
                ${word.word}
              </h4>
            `;
      });
      listCard.classList.remove("d-none");
    }
  }
});

list.addEventListener("click", (e) => {
  const result = e.target.innerText;
  const selectedWord = words.find((word) => word.word === result);
  list.innerHTML = "";
  listCard.classList.add("d-none");
  if (selectedWord) {
    showWords.innerHTML = "";
    showInDOM(selectedWord);
  }
});

// show words details in DOM

function showInDOM(selectedWord) {
  selectInput.addEventListener("change", function () {
    showWords.innerHTML = "";
    if (selectInput.value === "default") {
      showWords.innerHTML = "";
    } else if (selectInput.value === "all") {
      showWords.innerHTML = `
                <div class="word-details">
                <h2 class="word-title">${selectedWord.word}</h2>
                <hr>
                  <h3 class="section-title Definition">Definition</h3>
                  <p class="section-content ">${selectedWord.definition}</p>

                  <h3 class="section-title Examples">Examples</h3>
                  <p class="section-content">${selectedWord.examples.join(
                    " ,  "
                  )}</p>

                  <h3 class="section-title Synonyms">Synonyms</h3>
                  <p class="section-content">${selectedWord.synonyms.join(
                    ", "
                  )}</p>

                  <h3 class="section-title Antonyms">Antonyms</h3>
                  <p class="section-content">${selectedWord.antonyms.join(
                    ", "
                  )}</p>

                  <div class="learn-title">
                    <label for="learn-checkbox">Learn</label>
                    <input type="checkbox" class="learn-checkbox">
                  </div>
                </div>
              `;
    } else if (selectInput.value === "definition") {
      showWords.innerHTML = `
                <div class="word-details">
                <h2 class="word-title">${selectedWord.word}</h2>
                <hr>
                  <h3 class="section-title definition">definition</h3>
                  <p class="section-content ">${selectedWord.definition}</p>
                  <div class="learn-title">
                    <label for="learn-checkbox">Learn</label>
                    <input type="checkbox" class="learn-checkbox">
                  </div>
                </div>
              `;
    } else if (selectInput.value === "examples") {
      showWords.innerHTML = `
                <div class="word-details">
                <h2 class="word-title">${selectedWord.word}</h2>
                <hr>
                  <h3 class="section-title examples">examples</h3>
                  <p class="section-content ">${selectedWord.examples.join(
                    ", "
                  )}</p>
                  <div class="learn-title">
                    <label for="learn-checkbox">Learn</label>
                    <input type="checkbox" class="learn-checkbox">
                  </div>
                </div>
              `;
    } else if (selectInput.value === "synonyms") {
      showWords.innerHTML = `
                <div class="word-details">
                <h2 class="word-title">${selectedWord.word}</h2>
                <hr>
                  <h3 class="section-title synonyms">synonyms</h3>
                  <p class="section-content ">${selectedWord.synonyms.join(
                    ", "
                  )}</p>
                  <div class="learn-title">
                    <label for="learn-checkbox">Learn</label>
                    <input type="checkbox" class="learn-checkbox">
                  </div>
                </div>
              `;
    } else if (selectInput.value === "antonyms") {
      showWords.innerHTML = `
                <div class="word-details">
                <h2 class="word-title">${selectedWord.word}</h2>
                <hr>
                  <h3 class="section-title synonyms">antonyms</h3>
                  <p class="section-content ">${selectedWord.antonyms.join(
                    ", "
                  )}</p>
                  <div class="learn-title">
                    <label for="learn-checkbox">Learn</label>
                    <input type="checkbox" class="learn-checkbox">
                  </div>
                </div>
              `;
    }

    searchInput.value = "";
    list.innerHTML = "";

    const Checkbox = document.querySelector(".learn-checkbox");
    Checkbox.addEventListener("change", function () {
      if (this.checked) {
        const learnedWord = {
          word: selectedWord.word,
          definitions: selectedWord.definition,
          examples: selectedWord.examples,
          synonyms: selectedWord.synonyms,
          antonyms: selectedWord.antonyms,
        };
        if (isAlreadyLearned(selectedWord.word)) {
          alert("You have already learned this word.");
        } else {
          addDataToLocalStorage(learnedWord);
          alert("you are added to local storage");
        }
      } else {
        removeDataFromLocalStorage(selectedWord.word);
        alert("you are removed from local Storage");
      }
    });
  });
}
