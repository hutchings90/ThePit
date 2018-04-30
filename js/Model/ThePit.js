function ThePit(player1, player2){
	this.players = [
		player1 || new Player(null, null, 0),
		player2 || new Player(null, null, 1)
	];
}
