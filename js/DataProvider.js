function DataProvider(){}

DataProvider.prototype.functionList = function(l){
	var list = [];
	for(var i = 0; i < l.length; i++) list.push({value: i, text: l[i].name});
	return list;
}
