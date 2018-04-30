function Attack(name, power, speed){
	this.name = name;
	this.power = power || 0;
	this.speed = speed || 0;
}

Attack.prototype.use = function(attacker, defender){
	defender.curHealth -= this.power;
	if(defender.curHealth < 0) defender.curHealth = 0;
};

function Bite(){
	Attack.call(this, 'Bite', 30, 20);
}

function Slash(){
	Attack.call(this, 'Slash', 30, 30);
}

function Club(){
	Attack.call(this, 'Club', 40, 20);
}

function Punch(){
	Attack.call(this, 'Punch', 10, 40);
}

function JumpKick(){
	Attack.call(this, 'Jump Kick', 20, 30);
}

function Charge(){
	Attack.call(this, 'Charge', 50, 30);
}

function Pound(){
	Attack.call(this, 'Pound', 20, 20);
}

function Cut(){
	Attack.call(this, 'Cut', 40, 30);
}

function Force(){
	Attack.call(this, 'Force', 30, 30);
}

Bite.prototype = Attack.prototype;
Slash.prototype = Attack.prototype;
Club.prototype = Attack.prototype;
Punch.prototype = Attack.prototype;
JumpKick.prototype = Attack.prototype;
Charge.prototype = Attack.prototype;
Pound.prototype = Attack.prototype;
Cut.prototype = Attack.prototype;
Force.prototype = Attack.prototype;
