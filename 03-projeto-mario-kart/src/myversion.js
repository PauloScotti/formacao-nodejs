const players = [
  {
    id: 1,
    name: "Mario",
    velocity: 4,
    manobrability: 3,
    power: 3,
    points: 0,
  },
  {
    id: 2,
    name: "Luigi",
    velocity: 3,
    manobrability: 4,
    power: 4,
    points: 0,
  },
  {
    id: 3,
    name: "Peach",
    velocity: 3,
    manobrability: 4,
    power: 2,
    points: 0,
  },
  {
    id: 4,
    name: "Bowser",
    velocity: 5,
    manobrability: 2,
    power: 5,
    points: 0,
  },
  {
    id: 5,
    name: "Yoshi",
    velocity: 2,
    manobrability: 4,
    power: 3,
    points: 0,
  },
  {
    id: 6,
    name: "Donkey Kong",
    velocity: 2,
    manobrability: 2,
    power: 5,
    points: 0,
  },
];

const blocksList = [
  {
    type: "RETA",
    atribute: "velocity",
    winnerPoints: 1,
    loserPoints: 0,
  },
  {
    type: "CURVA",
    atribute: "manobrability",
    winnerPoints: 1,
    loserPoints: 0,
  },
  {
    type: "CONFRONTO",
    atribute: "power",
    winnerPoints: 0,
    loserPoints: 1,
  },
];

async function choosePlayersQuantity() {
  let quantity = Math.floor(Math.random() * 4) + 2; // Gera um número aleatório entre 2 e 5
  return quantity;
}

async function choosePlayers(quantity) {
  const selectedPlayers = [];

  while (selectedPlayers.length < quantity) {
    const randomIndex = Math.floor(Math.random() * players.length);
    const player = players[randomIndex];
    if (!selectedPlayers.includes(player.name)) {
      selectedPlayers.push(player.name);
    }
  }
  return selectedPlayers;
}

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1; // Gera um número aleatório entre 1 e 6
}

async function blocks() {
  const block = blocksList[Math.floor(Math.random() * blocksList.length)];
  console.log(`Bloco: ${block.type}`);
  return block;
}

async function calculatePoints(player, block) {
  const playerAttribute = player[block.atribute];
  const diceRoll = await rollDice();
  const total = playerAttribute + diceRoll;
  return total;
}

async function determineRoundWinner(playersList, block) {
  let winner = null;
  let maxPoints = -1;
  for (const playerName of playersList) {
    const player = players.find((p) => p.name === playerName);
    const points = await calculatePoints(player, block);
    console.log(
      `${player.name} tem ${points} pontos para o bloco ${block.type}`,
    );
    if (points > maxPoints) {
      maxPoints = points;
      winner = player;
    }
  }
  console.log(`O vencedor da rodada é ${winner.name} com ${maxPoints} pontos!`);
  winner.points += block.winnerPoints;
  playersList.forEach((playerName) => {
    const player = players.find((p) => p.name === playerName);
    if (player.name !== winner.name && player.points > 0) {
      player.points -= block.loserPoints;
    }
  });
}

async function determineGameWinner(playersList) {
  let winner = null;
  let maxPoints = -1;
    for (const playerName of playersList) {
    const player = players.find((p) => p.name === playerName);
    if (player.points > maxPoints) {
      maxPoints = player.points;
      winner = player;
    }
    }
    console.log(`\n O vencedor do jogo é ${winner.name} com ${maxPoints} pontos!`);
}

async function playGame(playersList) {
  console.log("Iniciando o jogo... \n");
  console.log("Jogadores:", playersList, "\n");
  for (let round = 1; round <= 5; round++) {
    console.log(`Rodada ${round} \n`);
    const block = await blocks();
    await determineRoundWinner(playersList, block);
  }
  await determineGameWinner(playersList);
}

(async function main() {
  const quantity = await choosePlayersQuantity();
  const selectedPlayers = await choosePlayers(quantity);
  await playGame(selectedPlayers);
})();
