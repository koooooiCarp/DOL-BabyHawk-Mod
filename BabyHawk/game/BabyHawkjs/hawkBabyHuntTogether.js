/* 查找狩猎集体中对应性格的小鹰 */
function hasDominant() {
	let tempID = undefined;
	let i = 0;

	for (i = 0; i < V.hawksTotal; i++)
	{
		if(V.children[V.hawksIDs[i]].localVariables.trait == "dominant")
		{
			tempID = V.hawksIDs[i];
			break;
		}
	}

	return tempID;
}
window.hasDominant = hasDominant;

function getAllDominant() {
	T.tempIDs = [];
	let i = 0;

	for (i = 0; i < V.hawksTotal; i++){
		if(V.children[V.hawksIDs[i]].localVariables.trait == "dominant"){
			T.tempIDs.push(V.hawksIDs[i]);
		}
	}

	return T.tempIDs.length;
}
window.getAllDominant = getAllDominant;

function hasClever() {
	let tempID = undefined;
	let i = 0;

	for (i = 0; i < V.hawksTotal; i++)
	{
		if(V.children[V.hawksIDs[i]].localVariables.trait == "clever")
		{
			tempID = V.hawksIDs[i];
			break;
		}
	}

	return tempID;
}
window.hasClever = hasClever;

function getAllClever() {
	T.tempIDs = [];
	let i = 0;

	for (i = 0; i < V.hawksTotal; i++){
		if(V.children[V.hawksIDs[i]].localVariables.trait == "clever"){
			T.tempIDs.push(V.hawksIDs[i]);
		}
	}

	return T.tempIDs.length;
}
window.getAllClever = getAllClever;

function hasSympathy() {
	let tempID = undefined;
	let i = 0;

	for (i = 0; i < V.hawksTotal; i++)
	{
		if(V.children[V.hawksIDs[i]].localVariables.trait == "sympathy")
		{
			tempID = V.hawksIDs[i];
			break;
		}
	}

	return tempID;
}
window.hasSympathy = hasSympathy;

function getAllSympathy() {
	T.tempIDs = [];
	let i = 0;

	for (i = 0; i < V.hawksTotal; i++){
		if(V.children[V.hawksIDs[i]].localVariables.trait == "sympathy"){
			T.tempIDs.push(V.hawksIDs[i]);
		}
	}

	return T.tempIDs.length;
}
window.getAllSympathy = getAllSympathy;

function hasClumsy() {
	let tempID = undefined;
	let i = 0;

	for (i = 0; i < V.hawksTotal; i++)
	{
		if(V.children[V.hawksIDs[i]].localVariables.trait == "clumsy")
		{
			tempID = V.hawksIDs[i];
			break;
		}
	}

	return tempID;
}
window.hasClumsy = hasClumsy;

function getAllClumsy() {
	T.tempIDs = [];
	let i = 0;

	for (i = 0; i < V.hawksTotal; i++){
		if(V.children[V.hawksIDs[i]].localVariables.trait == "clumsy"){
			T.tempIDs.push(V.hawksIDs[i]);
		}
	}

	return T.tempIDs.length;
}
window.getAllClumsy = getAllClumsy;