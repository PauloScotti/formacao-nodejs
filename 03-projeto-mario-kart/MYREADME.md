# This is a challenge project for the course "Jornada Para o Futuro - Node.js" by Felipe Aguiar on DIO.

## Project Description

This project is a Node.js console simulation of a Mario Kart style race game.

The game starts by randomly selecting between 2 and 5 players from a roster that includes Mario, Luigi, Peach, Bowser, Yoshi, and Donkey Kong. Each player has 3 core attributes:

- velocity
- manobrability
- power

The match runs for 5 rounds. In each round, the game randomly picks a track block type:

- RETA: uses velocity
- CURVA: uses manobrability
- CONFRONTO: uses power

For every active player, the game rolls a dice (1 to 6) and adds the result to the required attribute for that block. The player with the highest total wins the round and earns points.

During CONFRONTO rounds, non-winning players that already have points can lose points based on a randomly selected weapon:

- casco (1 damage)
- bomba (2 damage)
- estrela (3 damage)

After all rounds, the player with the highest final score is declared the game winner.
