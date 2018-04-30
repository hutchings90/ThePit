function Player(name, character, id){
	this.name = name || '';
	this.character = character || new Character();
	this.id = id || 0;
}

Player.prototype.setName = function(name){
	this.name = name || '';
};

Player.prototype.setCharacter = function(character){
	this.character = character || new Character();
};
