function Controller(){
	this.view = new View();
	this.game = new ThePit();
	this.dataProvider = new DataProvider();
}

Controller.prototype.startGame = function(){
	this.game = new ThePit();
	this.view.removeAll();
	this.displayMainMenu();
	this.setMainMenuListeners();
};

Controller.prototype.displayMainMenu = function(){
	this.view.displayMainMenu(this.game.players[0], this.game.players[1], this.dataProvider.functionList(CHARACTERS));
};

Controller.prototype.setMainMenuListeners = function(){
	var controller = this;
	var playerNameInputs = this.view.getPlayerNameInputs();
	var playerCharacterInputs = this.view.getCharacterInputs();
	var startBattleButton = this.view.getStartBattleButton();
	var mainMenu = this.view.getMainMenu();

	for(var i = 0; i < playerNameInputs.length; i++){
		playerNameInputs[i].onchange = function(ev){
			if(!this.value) this.value = this.defaultValue;
			this.gameTarget.name = this.value;
		};
		playerNameInputs[i].onchange();
	}
	for(var i = 0; i < playerCharacterInputs.length; i++){
		playerCharacterInputs[i].onchange = function(){
			var index = Number(this.value);
			if(index == -1) this.gameTarget.character = new CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]();
			else if(index == -2) this.gameTarget.character = new Character();
			else this.gameTarget.character = new CHARACTERS[index]();
		};
	}
	startBattleButton.onclick = function(){
		if(controller.game.players[0].character.name == '' || controller.game.players[1].character.name == '') return;
		controller.startBattle();
		controller.setBattleActionListeners();
	};
	mainMenu.onkeyup = function(ev){
		if(ev.keyCode == 13) startBattleButton.click();
	};
};

Controller.prototype.startBattle = function(){
	this.view.removeAll();
	this.view.draw(this.view.battleScene(this.game.players[0], this.game.players[1]));
};

Controller.prototype.setBattleActionListeners = function(){
	var controller = this;
	var battleActionButtons = this.view.getBattleActionButtons();

	for (var i = 0; i < battleActionButtons.length; i++) {
		battleActionButtons[i].onclick = function(){
			controller.view.playerAttack(this, controller.game.players, function(attacker, defender, e){
				e.battleAction.use(attacker.character, defender.character);
				controller.view.updatePlayerBattleHealthBar(attacker);
				controller.view.updatePlayerBattleHealthBar(defender);
				if(defender.character.curHealth == 0){
					if(attacker.character.curHealth == 0){
						controller.view.endBattle(function(){
							controller.startGame();
						});
					}
					else{
						controller.view.endBattle(function(){
							controller.startGame();
						}, attacker);
					}
				}
				else if(attacker.character.curHealth == 0){
					controller.view.endBattle(function(){
						controller.startGame();
					}, defender);
				}
			});
		}
	}
}
