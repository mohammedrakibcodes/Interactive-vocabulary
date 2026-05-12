const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class ="btn">${el} </span>`);

  return htmlElements.join(" ");
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  manageSpinner(true);

  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
    .then((res) => res.json())

    .then((data) => {
      removeActive(); // remove all active class

      const clickBtn = document.getElementById(`lesson-btn-${id}`);

      clickBtn.classList.add("active"); // add active class

      displayLevelWord(data.data);
    });
};

// New->

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;

  const res = await fetch(url);

  const details = await res.json();

  displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
  console.log(word);

  const detailsBox = document.getElementById("details-container");

  detailsBox.innerHTML = ` <div class="mb-3">
          <h2 class="text-2xl font-bold">
          ${word.word} (<i class="fa-solid fa-microphone-lines"></i>:
            <span class="font-bangla">${word.pronunciation}</span>)
          </h2>
        </div>
        <div class="mb-2">
          <h2 class="font-bold">Meaning</h2>
          <p class="font-bangla">${word.meaning}</p>
        </div>
        <div class="mb-2">
          <h2 class="font-bold">Example</h2>
          <p class="font-bangla">${word.sentence}</p>
        </div>
        <div class="mb-2">
          <h2 class="font-bold">Synonyms</h2>
          <div class="mb-2"> ${createElements(word.synonyms)}</div>
        </div>`;

  document.getElementById("word_modal").showModal();
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");

  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `<div
        class="text-center bg-blue-300 col-span-full rounded-xl py-10 space-y-6">
        <p class="text-xl font-medium text-red-600 font-bangla">
        <img class="mx-auto" src="./assets/alert-error.png" alt="" />
         এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="font-bold text-4xl font-bangla">নেক্সট Lesson এ যান</h2>
      </div>`;
    manageSpinner(false);

    return;
  }
  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
<div class="bg-white rounded-xl shadow-sm text-center p-5 flex flex-col justify-between h-full">
  <div>
    <h2 class="font-bold text-xl md:text-2xl break-words">
      ${word.word ? word.word : "শব্দ পাওয়া যায় নি"}
    </h2>
    <p class="font-semibold mt-2 text-sm md:text-base">
      Meaning / Pronunciation
    </p>
    <div class="font-bangla text-lg md:text-xl font-medium mt-3 break-words">
      "${word.meaning ? word.meaning : "অর্থ পাওয়া যায় নি"} /
      ${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায় নি"}"
    </div>
  </div>
  <div class="flex justify-between items-center gap-3 mt-5">
    <button
      onclick="loadWordDetail(${word.id})"
      class="btn flex-1 bg-[#1A91FF10] hover:bg-[#1A91FF80]">
      <i class="fa-solid fa-circle-info"></i>
    </button>
   <button
  title="Audio not available"
  class="btn flex-1 bg-gray-200 text-gray-400 cursor-not-allowed border-none opacity-60">
  <i class="fa-solid fa-volume-high"></i>
   </button>
  </div>
  </div>

`;

    wordContainer.append(card);
  });

  manageSpinner(false);
};

const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");

  levelContainer.innerHTML = "";

  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");

    btnDiv.innerHTML = `

      <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
      </button>

   `;

    levelContainer.appendChild(btnDiv);
  }
};

loadLessons();

const input = document.getElementById("input-search");

function handleSearch() {
  const searchValue = input.value.trim().toLowerCase();

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;

      const filterWords = allWords.filter((word) => {
        return word.word.toLowerCase().includes(searchValue);
      });

      displayLevelWord(filterWords);
    });
}

document.getElementById("btn-search").addEventListener("click", handleSearch);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});
