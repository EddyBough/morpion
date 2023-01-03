let playerOne = "X" // joueur 1 
let playerTwo = "O" // joueur 2
let scoreJONE = 0 // score joueur 1
let scoreJTWO = 0 // score joueur 2
let PlayerWin = "" // variable qui permettra d'afficher le joueur gagnant dans la chaine de caractère vide
let gameOver = false
let modeCpu = false
let sound = new Audio('./assets/sound/combat03.mp3')// on créé une variable pour le son et new Audio c'est une class
let defeatsound = new Audio ('./assets/sound/')
let lap = 1 // tour ou counter si tu veux
let gridVictory = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [0, 4, 8],]; // tableau de victoire


function play(elem) { // ici ce sera le tour à tour 
  if (elem.innerHTML == "") {
    if (gameOver == false) {
      sound.play() // jouer le son à chaque clique
      if (lap % 2 != 0) { // lap est égal à 1 au départ, divisé par 2 si le résultat est différent de 0 donc au tour de playerOne 
        document.querySelector("#joueur").innerHTML = `Au tour de ${playerTwo}` // afficher le tour 
        elem.innerHTML = playerOne
        PlayerWin = playerOne
      } else { // sinon playerTwo
        document.querySelector("#joueur").innerHTML = `Au tour de ${playerOne}`
        elem.innerHTML = playerTwo
        PlayerWin = playerTwo
      }
      checkVictory() // on enchaine sur la fonction Checkvictory qui va jouer les condition de victoire
      draw()
      lap++
      if (gameOver == false && modeCpu == true) {
        random()
        PlayerWin = playerTwo
        checkVictory() // on enchaine sur la fonction Checkvictory qui va jouer les condition de victoire
        draw()
      }
    }
  }

}


function checkVictory() { // ici on va déterminer les conditions de victoire
  let cases = document.querySelectorAll('.case') // là on determine que la variable case = est égal à .case dans mon HTML
  for (let i = 0; i < gridVictory.length; i++) { // on parcour le tableau de victoire
    if (cases[gridVictory[i][0]].innerHTML != "") { // là, va dans mon tableau de victoire et marque moi dans le HTML quelque chose de différent à CHAINE VIDE
      if (cases[gridVictory[i][0]].innerHTML == cases[gridVictory[i][1]].innerHTML && cases[gridVictory[i][1]].innerHTML == cases[gridVictory[i][2]].innerHTML) {
        document.querySelector('#joueur').innerHTML = `le joueur ${PlayerWin} à gagné` // ici on mettra le nom du joueur qui gagne avec la variable playerWin
        if (PlayerWin == playerOne) { // playerWin est égal à J1 
          scoreJONE++ // son score sera de +1
          document.querySelector('#score1').innerHTML = scoreJONE++ // ajouter + 1 à l'endroit score 1 dans le html 
        } else if (PlayerWin == playerTwo) { // si le joueur gagnant est J2 = afficher dans la variable playerWin qui est une variable vide
          scoreJTWO++ // son score sera de +1
          document.querySelector('#score2').innerHTML = scoreJTWO++ //ajouter +1 à l'endroit score 2 dans le html
        }
        gameOver = true // gameover devient vrai car la partie est terminée 
      }

    }
  }
}

function draw() { // fonction match nul 
  if (gameOver == false) { // au départ le gameover est false car le jeu est en cours
    let counter = 0
    let cells = document.querySelectorAll(".case") // on met une variable cells qui va appeler toutes mes cases dans l'HTML

    for (let i = 0; i < cells.length; i++) {
      if (cells[i].innerHTML != "") { // après avoir parcouru les cellules, mettre des chaines vide afin de pouvoir y insérer les X ou les O
        counter++ // tour + 1
      }
    }
    if (counter == 9) { // si la grille est pleine, donc match nul
      gameOver = true // et le gameover devient true
      document.querySelector("#joueur").innerHTML = `Match nul` // afficher match nul dans l'html
    }
  }
}

function restart() { // fonction rejouer
  let cells = document.querySelectorAll('.case') // on prend une variable et on appelle toutes les cases avec le querySelectorAll
  for (let i = 0; i < cells.length; i++) { // avec le for on lui demande de parcourir toutes les cases
    cells[i].innerHTML = "" // cells dans le html devient une chaîne vide

  }
  lap = 1
  gameOver = false
}

function random() {
  let cells = document.querySelectorAll('.case')
  let cpu = randomNumber(0, 8)


  while (true) {
    if (cells[cpu].innerHTML == "") {
      cells[cpu].innerHTML = playerTwo
      break
    } else {
      cpu = randomNumber(0, 8)
    }


  }
  lap++
}

function cpuMode() {
  modeCpu = !modeCpu

  restart()
  console.log(modeCpu);
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


