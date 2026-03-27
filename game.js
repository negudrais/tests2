// Spēlētāja dati
let player = {
  name: "",
  surname: "",
  gender: "",
  age: 13,
  month: 1,
  birthdayDay: 1,
  birthdayMonth: 1,

  // Jaunie stati
  averageGrade: 6.0,   // no 3 līdz 10
  sleep: 100,          // %
  happiness: 50,       // %
  friends: 50,         // %
  money: 0             // EUR
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
  // 20% iespēja kontroldarbam
if (Math.random() < 0.4) {
    triggerRandomTest();
    return;
}
function triggerRandomTest() {
    const subjects = ["ķīmijas", "fizikas", "matemātikas"];
    const subject = subjects[Math.floor(Math.random() * subjects.length)];

    eventText.textContent = `Šomēnes JEPVĢ notiek ${subject} kontroldarbs. Ko dari?`;
    choicesDiv.innerHTML = "";

    const choices = [
        {
            text: "Mācies visu nakti",
            effect: () => {
                player.averageGrade += 1;
                player.sleep -= 30;
                endTestEvent();
            }
        },
        {
            text: "Pamācies nedaudz",
            effect: () => {
                player.averageGrade += 0.3;
                endTestEvent();
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
                    player.happiness = 100;
                } else {
                    player.averageGrade -= 2;
                    player.happiness = 20;
                }
                endTestEvent();
            }
        }
    ];

    choices.forEach(c => {
        const btn = document.createElement("button");
        btn.textContent = c.text;
        btn.onclick = c.effect;
        choicesDiv.appendChild(btn);
    });
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
  const player.name = prompt("Ievadi savu vārdu:");
player.surname = prompt("Ievadi savu uzvārdu:");
player.gender = prompt("Dzimums (vīrietis/sieviete):");

player.birthdayDay = parseInt(prompt("Dzimšanas diena (1–31):"));
player.birthdayMonth = parseInt(prompt("Dzimšanas mēnesis (1–12):"));;
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

// Nākamais menesis
nextYearBtn.addEventListener("click", () => {
  player.month++;
// Kabatas nauda
player.money += 50;
if (player.month > 12) {
  player.month = 1;
  player.age++;
};
  if (player.month === player.birthdayMonth) {
  eventText.textContent = "Šomēnes tev ir dzimšanas diena!";
  player.happiness += 10;
    player.money += 70;
}
  //  “game over” 
  if (player.age 19 || player.health <= 0) {
    eventText.textContent = "Tavs laiks JEPVĢ ir beidzies! Vecums:  + player.age;
    choicesDiv.innerHTML = "";
    nextYearBtn.disabled = true;
    return;
  }
  if (player.month === player.birthdayMonth) {
  eventText.textContent = "Šomēnes tev ir dzimšanas diena!";
  player.happiness += 10;
}
  showEvent();

  updateStats();
});

// sākotnējais stat update
updateStats(document.getElementById("stat-grade").textContent = player.averageGrade.toFixed(2);
document.getElementById("stat-sleep").textContent = player.sleep;
document.getElementById("stat-friends").textContent = player.friends;
document.getElementById("stat-money").textContent = player.money;
);
if (player.averageGrade < 3) {
  alert("Tava vidējā atzīme ir zem 3. Tevi izmet no JEPVĢ. Spēle beigusies.");
  nextYearBtn.disabled = true;
  return;
}
document.getElementById("stat-month").textContent = player.month;)
