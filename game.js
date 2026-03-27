// Spēlētāja dati
let player = {
  name: "Nezināms",
  age: 0,
  money: 0,
  health: 100,
  happiness: 50
};

const statName = document.getElementById("stat-name");
const statAge = document.getElementById("stat-age");
const statMoney = document.getElementById("stat-money");
const statHealth = document.getElementById("stat-health");
const statHappiness = document.getElementById("stat-happiness");

const eventText = document.getElementById("event-text");
const choicesDiv = document.getElementById("choices");

const startBtn = document.getElementById("start-btn");
const nextYearBtn = document.getElementById("next-year-btn");

// Vienkāršs notikumu saraksts
const events = [
  {
    minAge: 0,
    maxAge: 5,
    text: "Tu esi piedzimis! Ko vecāki dara?",
    choices: [
      {
        text: "Tevi ļoti lutina",
        effect: () => {
          player.happiness += 10;
        }
      },
      {
        text: "Tevi audzina stingri",
        effect: () => {
          player.happiness -= 5;
          player.health += 5;
        }
      }
    ]
  },
  {
    minAge: 6,
    maxAge: 12,
    text: "Tu ej skolā. Kā tu uzvedies?",
    choices: [
      {
        text: "Cītīgi mācies",
        effect: () => {
          player.happiness -= 5;
          player.money += 0; // nākotnē var izmantot izglītības līmeni
        }
      },
      {
        text: "Spēlē spēles visu dienu",
        effect: () => {
          player.happiness += 10;
          player.health -= 5;
        }
      }
    ]
  },
  {
    minAge: 18,
    maxAge: 25,
    text: "Tu esi pilngadīgs. Ko darīsi?",
    choices: [
      {
        text: "Iet studēt universitātē",
        effect: () => {
          player.money -= 2000;
          player.happiness -= 5;
        }
      },
      {
        text: "Sākt strādāt",
        effect: () => {
          player.money += 5000;
          player.happiness += 5;
        }
      }
    ]
  }
];

// Atjauno stat parādīšanu
function updateStats() {
  statName.textContent = player.name;
  statAge.textContent = player.age;
  statMoney.textContent = player.money;
  statHealth.textContent = player.health;
  statHappiness.textContent = player.happiness;
}

// Ģenerē notikumu pēc vecuma
function getEventForAge(age) {
  const possible = events.filter(e => age >= e.minAge && age <= e.maxAge);
  if (possible.length === 0) return null;
  // vienkārši paņemam pirmo (vai random)
  return possible[Math.floor(Math.random() * possible.length)];
}

// Parāda notikumu un izvēles
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
      // Pēc izvēles varam atslēgt pogas, līdz nākamajam gadam
      choicesDiv.innerHTML = "Izvēle izdarīta. Spied 'Nākamais gads'.";
    };
    choicesDiv.appendChild(btn);
  });
}

// Sākt spēli
startBtn.addEventListener("click", () => {
  const name = prompt("Ievadi sava tēla vārdu:");
  if (name) player.name = name;

  player.age = 0;
  player.money = 0;
  player.health = 100;
  player.happiness = 50;

  updateStats();
  showEvent();

  startBtn.disabled = true;
  nextYearBtn.disabled = false;
});

// Nākamais gads
nextYearBtn.addEventListener("click", () => {
  player.age++;
  // vienkāršs “game over” piemērs
  if (player.age > 90 || player.health <= 0) {
    eventText.textContent = "Tava dzīve ir beigusies. Vecums: " + player.age;
    choicesDiv.innerHTML = "";
    nextYearBtn.disabled = true;
    return;
  }
  showEvent();
  updateStats();
});

// sākotnējais stat update
updateStats();
