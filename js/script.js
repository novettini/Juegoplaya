let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Silbato"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const nombreDelTurista = document.querySelector("#nombreDelTurista");
const saludDelTurista = document.querySelector("#saludDelTurista");
const weapons = [
  { name: 'Silbato', power: 5 },
  { name: 'Codigos', power: 30 },
  { name: 'Ordenanza', power: 50 },
  { name: 'Torpedo', power: 100 }
];
const monsters = [
  {
    name: "Wimpa",
    level: 2,
    health: 15
  },
  {
    name: "Negrito",
    level: 8,
    health: 60
  },
  {
    name: "Borracho",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "Puesto Zhen",
    "button text": ["Ir al pueblo", "Bajar a la arena", "Sacar del agua"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Estás en el puesto Zhen, ves una rampa rota que te lleva al \"pueblo\"."
  },
  {
    name: "Pueblo",
    "button text": ["Compras medialunas de Alados, +10 de energía (10 pesos)", "Comprar elemento (30 pesos)", "Volver a Puesto Zhen"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Llegaste a la 2 ¿Qué haces ahora?"
  },
  {
    name: "Bajar a la arena",
    "button text": ["Razonar con Wimpa", "Razonar con Negrito", "Volver al Puesto Zhen"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Bajaste del puesto, ves varios turistas desagradables"
  },
  {
    name: "fight",
    "button text": ["Explicarle", "Evitarlo", "Irte para no matarlo"],
    "button functions": [attack, dodge, goTown],
    text: "Estás intentando hablar en un idioma desconocido, las eses no existen."
  },
  {
    name: "El turista entendío",
    "button text": ["Volver a tu puesto", "Volver a tu puesto", "Volver a tu puesto"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'El turista dijo algunas palabras en un idioma desconocido, pero parece que te ha escuchado.'
  },
  {
    name: "No entendio",
    "button text": ["Volver a jugar", "Volver a jugar", "Volver a jugar"],
    "button functions": [restart, restart, restart],
    text: "El turista no entendió las señales claras, le metiste un torpedazo en la boca. Te echaron del operativo."
  },
  { 
    name: "Lo rescataste", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "¡Lo hiciste! pudiste sacar al borracho del agua. Te recibiste de Randall. Gustavo está orgulloso de vos " 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to Puesto Zhen?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Encontraste un juego secreto, elegí un numero y quizas Randal te ayude"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "Te falta plata para comprar comida, pedile al Sugara un aumento y volvé.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Ahora tiene " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " En la casilla ya tenes: " + inventory;
    } else {
      text.innerText = "Te falta plata para comprar el elemento, pedile al Sugara un aumento y volvé.";
    }
  } else {
    text.innerText = "Ya tenes todos los elementos posibles!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  nombreDelTurista.innerText = monsters[fighting].name;
  saludDelTurista
.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  saludDelTurista
.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "Esquivaste la bolupregunta " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["Silbato"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "Elegiste" + guess + ". acá estan los numeros:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Acertaste! ganaste 20 Pesos de propina por alejar al perro del Kite";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Erraste, el perro te mordió, perdiste 10 de energía";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}