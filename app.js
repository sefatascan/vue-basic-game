new Vue({
  el: "#app",

  data: {
    gameIsRunning: false,
    playerHealth: 100,
    monsterHealth: 100,
    turns: []
  },
  methods: {
    startGame: function() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.gameIsRunning = true;
      this.turns=[];
    },
    attack: function() {
      var damage = this.calculateDamage(10, 3);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits Monstor for " + damage
      });
      this.monsterAttack();
    },
    specialAttack: function() {
      var damage = this.calculateDamage(20, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits Monstor hard for " + damage
      });
      this.monsterAttack();
    },
    heal: function() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: "Player heal +10 "
      });
      this.monsterAttack();
    },
    giveUp: function() {
      this.gameIsRunning = false;
   
    },
    monsterAttack: function() {
      var damage = this.calculateDamage(12, 5);
      this.playerHealth -= damage;
      this.checkWin();
      this.turns.unshift({
        isPlayer: false,
        text: "Monster hits Player for " + damage
      });
    },
    calculateDamage: function(max, min) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function() {
      if (this.monsterHealth <= 0) {
        if (confirm("You won! New Game ?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      if (this.playerHealth <= 0) {
        if (confirm("You lost! New Game ?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    }
  }
});
