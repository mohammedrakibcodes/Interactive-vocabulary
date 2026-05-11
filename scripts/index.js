const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  //   wordContainer.innerHTML = "";

  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `<p>Cat</p>`;
    wordContainer.append(card);
  });
};

const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
        
        <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
      </button>
   `;
    levelContainer.appendChild(btnDiv);
  }
};

loadLessons();
