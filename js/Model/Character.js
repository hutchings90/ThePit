const CHARACTERS = [
	// Troll,
	// Bear,
	// Giant,
	// Centaur,
	// Minotaur,
	// Zombie,
	// Vampire,
	// Werewolf,
	// Ghoul,
	// Raptor,
	// Knight,
	// Cougar,
	// Orc,
	// Samurai,
	// Berserker,
	Ninja,
	// Spartan,
	// Goblin,
	// Gremlin,
	// Jinni,
	// Dwarf,
	// Elf,
	// Barbarian,
	Gnome
];

function Character(name, health, attack, defense, speed){
	this.name = name || '';
	this.curHealth = health || 0;
	this.maxHealth = health || 0;
	this.attack = attack || 0;
	this.defense = defense || 0;
	this.speed = speed || 0;
}

function AttackCharacter(name, health, attack, defense, speed, attacks){
	Character.call(this, name, health, attack, defense, speed);
	this.attacks = attacks || [];
}

function Troll(){
	AttackCharacter.call(this, 'Troll', 50, 40, 30, 20, [new Club()]);
}

function Bear(){
	AttackCharacter.call(this, 'Bear', 50, 40, 20, 30, [new Bite()]);
}

function Giant(){
	AttackCharacter.call(this, 'Giant', 50, 30, 40, 20, [new Punch()]);
}

function Centaur(){
	AttackCharacter.call(this, 'Centaur', 50, 30, 20, 40, [new Kick()]);
}

function Minotaur(){
	AttackCharacter.call(this, 'Minotaur', 50, 20, 40, 30, [new Charge()]);
}

function Zombie(){
	AttackCharacter.call(this, 'Zombie', 50, 20, 30, 40, [new Bite()]);
}

function Vampire(){
	AttackCharacter.call(this, 'Vampire', 40, 50, 30, 20, [new Bite()]);
}

function Werewolf(){
	AttackCharacter.call(this, 'Werewolf', 40, 50, 20, 30, [new Bite()]);
}

function Ghoul(){
	AttackCharacter.call(this, 'Ghoul', 40, 30, 50, 20, [new Bite()]);
}

function Raptor(){
	AttackCharacter.call(this, 'Raptor', 40, 30, 20, 50, [new Bite()]);
}

function Knight(){
	AttackCharacter.call(this, 'Knight', 40, 20, 50, 30, [new Cut()]);
}

function Cougar(){
	AttackCharacter.call(this, 'Cougar', 40, 20, 30, 50, [new Slash()]);
}

function Orc(){
	AttackCharacter.call(this, 'Orc', 30, 50, 40, 20, [new Punch()]);
}

function Samurai(){
	AttackCharacter.call(this, 'Samurai', 30, 50, 20, 40, [new Cut()]);
}

function Berserker(){
	AttackCharacter.call(this, 'Berserker', 30, 40, 50, 20, [new Charge()]);
}

function Ninja(){
	AttackCharacter.call(this, 'Ninja', 30, 40, 20, 50, [new JumpKick()]);
}

function Spartan(){
	AttackCharacter.call(this, 'Spartan', 30, 20, 50, 40, [new Cut()]);
}

function Goblin(){
	AttackCharacter.call(this, 'Goblin', 30, 20, 40, 50, [new Pound()]);
}

function Gremlin(){
	AttackCharacter.call(this, 'Gremlin', 20, 50, 40, 30, [new Pound()]);
}

function Jinni(){
	AttackCharacter.call(this, 'Jinni', 20, 50, 30, 40, [new Force()]);
}

function Dwarf(){
	AttackCharacter.call(this, 'Dwarf', 20, 40, 50, 30, [new Pound()]);
}

function Elf(){
	AttackCharacter.call(this, 'Elf', 20, 40, 30, 50, [new Force()]);
}

function Barbarian(){
	AttackCharacter.call(this, 'Barbarian', 20, 30, 50, 40, [new Punch()]);
}

function Gnome(){
	AttackCharacter.call(this, 'Gnome', 20, 30, 40, 50, [new Force()]);
}
