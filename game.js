let player = {
  name: "",
  surname: "",
  gender: "",
  age: 13,
  month: 1,
  birthdayDay: 1,
  birthdayMonth: 1,
  averageGrade: 6.0,
  sleep: 100,
  happiness: 50,
  friends: 50,
  money: 0,
  health: 100
};

const events = [
  {
    minAge: 13,
    maxAge: 15,
    text: "Tu esi jaunais skolēns. Vai gribi piedalīties skolas klubos?",
    choices: [
      {
        text: "Pievienoties sporta klubam",
        effect: () => {
          player.health += 10;
          player.friends += 15;
          player.happiness += 10;
        }
      },
      {
        text: "Pievienoties mākslas klubam",
        effect: () => {
          player.happiness += 20;
          player.friends += 10;
        }
      },
      {
        text: "Nē, es mācīšos vien",
        effect: () => {
          player.averageGrade += 0.5;
          player.happiness -= 5;
        }
      }
    ]
  },
  {
    minAge: 13,
    maxAge: 18,
    text: "Kontroldarbs šajā mēnesī!",
    choices: [
      {
        text: "Mācies visu nakti",
        effect: () => {
          player.averageGrade += 1;
          player.sleep -= 30;
          player.health -= 5;
        }
      },
      {
        text: "Pamācies nedaudz",
        effect: () => {
          player.averageGrade += 0.3;
        }
      },
      {
        text: "Pārmet krustu",
        effect: () => {
          const r = Math.random();
          if (r < 0.33) {
            player.averageGrade += 0.5;
            player.happiness += 10;
          } else if (r < 0.66) {
            player.averageGrade += 1;
            player.happiness += 5;
          } else {
            player.averageGrade -= 2;
            player.happiness -= 20;
          }
        }
      }
    ]
  },
  {
    minAge: 16,
    maxAge: 18,
    text: "Vasara! Ko tu darīsi?",
    choices: [
      {
        text: "Strādāt vasaras darbā",
        effect: () => {
          player.money += 200;
          player.health -= 10;
          player.happiness -= 5;
        }
      },
      {
        text: "Atpūsties ar draugiem",
        effect: () => {
          player.happiness += 30;
          player.friends += 20;
          player.health += 15;
        }
      },
      {
        text: "Mācies vasaras kursus",
        effect: () => {
          player.averageGrade += 1.5;
          player.happiness -= 10;
        }
      }
    ]
  }
];

const startBtn = document.getElementById("start-btn");
const nextYearBtn = document.getElementById("next-year-btn");
const eventText = document.getElementById("event-text");
const choicesDiv = document.getElementById("choices");

const statName = document.getElementById("stat-name");
const statAge = document.getElementById("stat-age");
const statMonth = document.getElementById("stat-month");
const statMoney = document.getElementById("stat-money");
const statHealth = document.getElementById("stat-health");
const statHappiness = document.getElementById("stat-happiness");
const statGrade = document.getElementById("stat-grade");
const statSleep = document.getElementById("stat-sleep");
const statFriends = document.getElementById("stat-friends");

function updateStats() {
  statName.textContent = player.name || "-";
  statAge.textContent = player.age;
  statMonth.textContent = player.month;
  statMoney.textContent = player.money;
  statHealth.textContent = player.health;
  statHappiness.textContent = player.happiness;
  statGrade.textContent = player.averageGrade.toFixed(2);
  statSleep.textContent = player.sleep;
  statFriends.textContent = player.friends;
}

function getEventForAge(age) {
  const possible = events.filter(e => age >= e.minAge && age <= e.maxAge);
  if (possible.length === 0) return null;
  return possible[Math.floor(Math.random() * possible.length)];
}

function showEvent() {
  choicesDiv.innerHTML = "";
  const ev = getEventForAge(player.age);

  if (!ev) {
    eventText.textContent = "Šajā vecumā nekas īpašs nenotiek. Spied 'Nākamais gads'.";
    return;
  }

  eventText.textContent = ev.text;

  ev.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.onclick = () => {
      choice.effect();
      updateStats();
      choicesDiv.innerHTML = "Izvēle izdarīta. Spied 'Nākamais gads'.";
    };
    choicesDiv.appendChild(btn);
  });
}

startBtn.addEventListener("click", () => {
  const name = prompt("Ievadi savu vārdu:");
  if (!name) return;
  
  player.name = name;
  player.surname = prompt("Ievadi savu uzvārdu:") || "";
  player.gender = prompt("Dzimums (vīrietis/sieviete):") || "";
  player.birthdayDay = parseInt(prompt("Dzimšanas diena (1–31):")) || 1;
  player.birthdayMonth = parseInt(prompt("Dzimšanas mēnesis (1–12):")) || 1;

  player.age = 13;
  player.month = 1;
  player.money = 0;
  player.health = 100;
  player.happiness = 50;
  player.sleep = 100;
  player.friends = 50;
  player.averageGrade = 6.0;

  updateStats();
  showEvent();

  startBtn.disabled = true;
  nextYearBtn.disabled = false;
});

nextYearBtn.addEventListener("click", () => {
  player.month++;
  player.money += 50;
  
  if (player.month > 12) {
    player.month = 1;
    player.age++;
  }
  
  if (player.month === player.birthdayMonth) {
    eventText.textContent = "Šomēnes tev ir dzimšanas diena!";
    player.happiness += 10;
    player.money += 70;
  }

  player.happiness = Math.max(0, Math.min(100, player.happiness));
  player.sleep = Math.max(0, Math.min(100, player.sleep));
  player.friends = Math.max(0, Math.min(100, player.friends));
  player.health = Math.max(0, Math.min(100, player.health));
  player.averageGrade = Math.max(3, Math.min(10, player.averageGrade));

  if (player.age >= 19) {
    eventText.textContent = "Tavs laiks JEPVĢ ir beidzies! Vecums: " + player.age;
    choicesDiv.innerHTML = "";
    nextYearBtn.disabled = true;
    startBtn.disabled = false;
    return;
  }

  if (player.health <= 0) {
    eventText.textContent = "Tava veselība ir 0. Tu nevari turpināt.";
    choicesDiv.innerHTML = "";
    nextYearBtn.disabled = true;
    startBtn.disabled = false;
    return;
  }

  if (player.averageGrade < 3) {
    alert("Tava vidējā atzīme ir zem 3. Tevi izmet no JEPVĢ. Spēle beigusies.");
    choicesDiv.innerHTML = "";
    nextYearBtn.disabled = true;
    startBtn.disabled = false;
    return;
  }

  updateStats();
  showEvent();
});
