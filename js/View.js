function View(){
	this.body = document.getElementsByTagName('body')[0];
	this.imagePath = 'assets/images/';
	this.soundPath = 'assets/sounds/';
	this.shotAttackPath = this.imagePath + 'shotAttacks/';
	this.dataProvider = new DataProvider();
}

View.prototype.mainMenu = function(player1, player2, characters){
	return this.menu('main-menu', 'Who is entering the Pit?', [
		this.playerMenu(player1, 1, characters),
		this.playerMenu(player2, 2, characters),
		this.button('start-battle-btn', 'Start Battle!')
	]);
};

View.prototype.displayMainMenu = function(player1, player2, characters){
	this.draw(this.mainMenu(player1, player2, characters));
};

View.prototype.battleScene = function(player1, player2){
	var e = this.columnContainer();
	this.addClass(e, 'battle-scene');
	e.appendChild(this.playerBattleScene(player1, 1));
	e.appendChild(this.playerBattleScene(player2, 2));
	return e;
};

View.prototype.playerBattleScene = function(player, i){
	var e = this.columnContainer();
	e.append(this.columnContainer());
	e.lastChild.append(this.playerBattleField(player, i))
	e.lastChild.appendChild(this.row('', player.name));
	e.lastChild.appendChild(this.playerBattleHealth(player));
	e.lastChild.append(this.playerBattleActions(player, i));
	this.addClass(e, 'player-battle-scene-container');
	this.addClass(e.lastChild, 'player-battle-scene');
	return e;
};

View.prototype.playerBattleField = function(player, i){
	var e = this.rowContainer();
	this.addClass(e, 'player-battle-field-' + i);
	e.appendChild(this.playerBattleImage(player, i));
	return e;
};

View.prototype.playerBattleHealth = function(player){
	var e = this.rowContainer();
	this.addClass(e, 'player-' + (player.id + 1) + '-battle-health-container');
	e.appendChild(this.playerBattleHealthBar(player));
	return e;
};

View.prototype.playerBattleHealthBar = function(player){
	var e = this.columnContainer();
	e.id = 'player-' + (player.id + 1) + '-battle-health-bar';
	this.addClass(e, 'player-battle-health-bar');
	this.setPlayerBattleHealthBar(e, player);
	return e;
};

View.prototype.updatePlayerBattleHealthBar = function(player){
	var e = this.getDisplayById('player-' + (player.id + 1) + '-battle-health-bar');
	this.setPlayerBattleHealthBar(e, player);
};

View.prototype.setPlayerBattleHealthBar = function(e, player){
	e.style.width = Math.floor((player.character.curHealth / player.character.maxHealth) * 100) + '%';
	while(e.childNodes.length > 0) e.removeChild(e.lastChild);
	e.appendChild(this.playerBattleHealthNumbers(player));
};

View.prototype.playerBattleHealthNumbers = function(player){
	var e = this.createElement('span', 'player-' + (player.id + 1) + '-battle-health-numbers', 'player-battle-health-numbers', player.character.curHealth + '/' + player.character.maxHealth);
	return e;
};

View.prototype.playerBattleImage = function(player, i){
	var e = this.createElement('img', '', 'player-battle-image', '');
	this.addClass(e, 'position-' + i);
	e.id = player.name + '-' + player.character.name + '-image';
	e.gameTarget = player;
	e.src = this.getPlayerStancePath(e);
	return e;
};

View.prototype.playerBattleActions = function(player, n){
	var e = this.rowContainer();
	this.addClass(e, 'player-battle-actions');
	for(var i = 0; i < player.character.attacks.length; i++) e.appendChild(this.playerBattleAction(player, player.character.attacks[i], n));
	return e;
};

View.prototype.playerBattleAction = function(player, battleAction, n){
	var button = this.button('', battleAction.name);
	this.addClass(button, 'player-battle-action');
	button.gameTarget = player;
	button.battleAction = battleAction;
	return button;
};

View.prototype.endBattle = function(callBack, winner){
	callBack();
};

View.prototype.menu = function(id, header, options){
	var e = this.columnContainer(id);
	this.addClass(e, 'menu');
	e.appendChild(this.header(header.toUpperCase()));
	for(var i = 0; i < options.length; i++) e.appendChild(options[i]);
	return e;
};

View.prototype.header = function(header){
	var row = this.row();
	this.addClass(row, 'header');
	this.setText(row, header);
	return row;
};

View.prototype.playerMenu = function(player, i, characters){
	var defaultName = 'Player ' + i;
	var idPrefix = defaultName.toLowerCase().replace(' ', '-');
	var e = this.rowContainer(idPrefix + '-menu');
	e.appendChild(this.textInput(idPrefix + '-name', 'player-name', defaultName + ' Name', defaultName, player));
	e.appendChild(this.selectInput(idPrefix + '-character', 'player-character', defaultName + ' Character', characters, player));
	return e;
};

View.prototype.columnContainer = function(id, text){
	var e = this.column(id, text);
	this.addClass(e, 'container');
	return e;
};

View.prototype.rowContainer = function(id, text){
	var e = this.row(id, text);
	this.addClass(e, 'container');
	return e;
};

View.prototype.column = function(id, text){
	return this.createElement('div', id, 'col', text);
};

View.prototype.row = function(id, text){
	return this.createElement('div', id, 'row', text);
};

View.prototype.textInput = function(id, className, placeholder, defaultValue, target){
	var input = this.createElement('input', id, className);
	input.placeholder = placeholder;
	input.value = defaultValue;
	input.defaultValue = defaultValue;
	input.gameTarget = target;
	return input;
};

View.prototype.selectInput = function(id, className, select, options, target){
	var input = this.createElement('select', id, className);
	if(select){
		input.appendChild(this.optionInput('', '', 'Select ' + select, -2));
		input.appendChild(this.optionInput('', '', 'Random', -1));
	}
	for(var i = 0; i < options.length; i++) input.appendChild(this.optionInput('', '', options[i].text, options[i].value));
	input.gameTarget = target;
	return input;
};

View.prototype.optionInput = function(id, className, text, value){
	var input = this.createElement('option', id, className, text);
	input.value = value ? value : '';
	return input;
};

View.prototype.button = function(id, text){
	return this.createElement('button', id, 'row', text);
};

View.prototype.setText = function(e, text){
	if(text) e.innerHTML = text;
};

View.prototype.setId = function(e, id){
	if(id) e.id = id;
};

View.prototype.addClass = function(e, className){
	if(!className) return;
	var classes = e.className.split(' ');
	for(var i = 0; i < classes.length; i++)
		if(classes[i] == className) return;
	if(e.className.indexOf(className) != -1) return;
	if(e.className.length > 0) e.className += ' ' + className;
	else e.className = className;
};

View.prototype.removeClass = function(e, className){
	if(!className) return;
	e.className = e.className.replace(className, '').replace(/ +/g, ' ');
	e.className = e.className.trim();
};

View.prototype.draw = function(e){
	while(this.body.childNodes.length > 0) this.body.removeChild(this.body.lastChild);
	if(e) this.body.appendChild(e);
};

View.prototype.createElement = function(type, id, className, text){
	var e = document.createElement(type);
	this.setId(e, id);
	this.addClass(e, className);
	this.setText(e, text);
	return e;
};

View.prototype.removeAll = function(){
	var body = this.body;
	while(body.lastChild) body.removeChild(body.lastChild);
};

View.prototype.getDisplayById = function(id){
	return document.getElementById(id);
};

View.prototype.getDisplaysByClassName = function(className){
	return document.getElementsByClassName(className);
};

View.prototype.getPlayerStancePath = function(e){
	return this.getImagePath(e.gameTarget.character.name.toLowerCase() + '/player/stance.gif');
};

View.prototype.getImagePath = function(src){
	return this.imagePath + src;
};

View.prototype.getAttackImagePath = function(attacker, label) {
	return this.getImagePath(attacker.character.name.toLowerCase() + '/player/attacks/' + label.replace(/\s+/g, '') + '.gif');
};

View.prototype.getShotAttackImagePath = function(label) {
	return this.shotAttackPath + label.replace(/\s+/g, '') + '.gif';
};

View.prototype.getPlayerNameInputs = function(){
	return this.getDisplaysByClassName('player-name');
};

View.prototype.getCharacterInputs = function(){
	return this.getDisplaysByClassName('player-character');
};

View.prototype.getStartBattleButton = function(){
	return this.getDisplayById('start-battle-btn');
};

View.prototype.getMainMenu = function(){
	return this.getDisplayById('main-menu');
};

View.prototype.getBattleActionButtons = function(){
	return this.getDisplaysByClassName('player-battle-action');
};

View.prototype.playerAttack = function(e, players, callBack){
	var attacker = e.gameTarget;
	var defender = players[(attacker.id + 1) & 1];
	this[e.innerHTML.replace(/\s+/g, '')](e, attacker, defender, callBack);
};

View.prototype.JumpKick = function(e, attacker, defender, callBack){
	var view = this;
	var attackerAnimationClass = 'jump-kick-attack-' + (attacker.id + 1);
	var defenderAnimationClass = 'get-hit-' + (defender.id + 1);
	var attackerE = view.getDisplayById(attacker.name + '-' + attacker.character.name + '-image');
	var defenderE = view.getDisplayById(defender.name + '-' + defender.character.name + '-image');
	setTimeout(function(){
		attackerE.src = view.getImagePath(attacker.character.name.toLowerCase() + '/player/attacks/' + e.innerHTML.replace(/\s+/g, '') + '.png');
		defenderE.src = view.getImagePath(defender.character.name.toLowerCase() + '/player/hit.png');
		view.addClass(defenderE.parentElement, defenderAnimationClass);
	}, 500);
	setTimeout(function(){
		attackerE.src = view.getPlayerStancePath(attackerE);
		defenderE.src = view.getPlayerStancePath(defenderE);
		view.removeClass(attackerE.parentElement, attackerAnimationClass);
		view.removeClass(defenderE.parentElement, defenderAnimationClass);
		callBack(attacker, defender, e);
	}, 1750);
	attackerE.src = view.getAttackImagePath(attacker, e.innerHTML);
	view.addClass(attackerE.parentElement, attackerAnimationClass);
};

View.prototype.Force = function(e, attacker, defender, callBack){
	var view = this;
	var defenderAnimationClass = 'get-hit-' + (defender.id + 1);
	var attackerE = view.getDisplayById(attacker.name + '-' + attacker.character.name + '-image');
	var defenderE = view.getDisplayById(defender.name + '-' + defender.character.name + '-image');
	var forceShot = view.forceShot(attacker.id);
	setTimeout(function(){
		forceShot.parentElement.removeChild(forceShot);
		defenderE.src = view.getImagePath(defender.character.name.toLowerCase() + '/player/hit.png');
		view.addClass(defenderE.parentElement, defenderAnimationClass);
	}, 750);
	setTimeout(function(){
		attackerE.src = view.getPlayerStancePath(attackerE);
		defenderE.src = view.getPlayerStancePath(defenderE);
		view.removeClass(defenderE.parentElement, defenderAnimationClass);
		callBack(attacker, defender, e);
	}, 2500);
	attackerE.src = view.getAttackImagePath(attacker, e.innerHTML);
	attackerE.parentElement.appendChild(forceShot);
};

View.prototype.forceShot = function(attackerId){
	var e = this.createElement('img', 'force-shot-' + attackerId, 'force-shot');
	e.src = this.getShotAttackImagePath('Force');
	return e;
};
