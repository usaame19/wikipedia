const wordDetails = document.querySelector(".word-details");

//get data from local storage
function getDataFromLocalStorage() {
  const learned = localStorage.getItem("learned");
  return learned ? JSON.parse(learned) : [];
}

function addDetailsToDOM() {
  const learned = getDataFromLocalStorage();
  let words = learned;

  words.forEach((word) => {
    wordDetails.innerHTML += `
    <div class="details">
    <h2 class="word-title">${word.word}</h2>
    <h3 class="section-title">Definition</h3>
    <p class="section-content">${word.definitions}</p>

    <h3 class="section-title">Examples</h3>
    <p class="section-content">${word.examples.join(", ")}</p>

    <h3 class="section-title">Synonyms</h3>
    <p class="section-content">${word.synonyms.join(", ")}</p>

    <h3 class="section-title">Antonyms</h3>
    <p class="section-content">${word.antonyms.join(", ")}</p>
</div>
  `;
  });
}
addDetailsToDOM();
