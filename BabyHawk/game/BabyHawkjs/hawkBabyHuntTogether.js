/* 查找狩猎集体中对应性格的小鹰 */
/* 我知道这些乱七八糟的东西可以被整合成一个function，但我懒得重写了 */
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

/* 孤儿崽崽 */
function hasOrphan() {
	let tempID = undefined;
	let i = 0;

	for (i = 0; i < V.hawksTotal; i++)
	{
		if(V.children[V.hawksIDs[i]].childId == "orphanHawk1")
		{
			tempID = V.hawksIDs[i];
			return 1;
		}
	}

	return 0;
}
window.hasOrphan = hasOrphan;

/* 检查所有鹰崽数目，包括了蛋 */
function hasOnlyOrphan() {
	let Number = 0;

	Object.values(V.children).forEach(child => {
		if (child.type == "hawk" && (child.location == "tower" || child.location == "otherNest")) {
			Number++;
		}
	})

	return Number;
}

window.hasOnlyOrphan = hasOnlyOrphan;
/* 狩猎回来之后大吃特吃 */
/* 需要重新考虑每日进食次数…… */
function getAllHungry() {
	T.tempIDs = [];
	let Number = 0;
	let i = 0;

	if(V.hawksTotal > V._lurkerLoot){
		Number = V._lurkerLoot;
	}
	else{
		Number = V.hawksTotal;
	}

	for (i = 0; i < Number; i++){
		if(V.children[V.hawksIDs[i]].localVariables.FeededDaily < 1){
			T.tempIDs.push(V.hawksIDs[i]);
			
			V.children[V.hawksIDs[i]].localVariables.activity = "lurkerEat";
			V.children[V.hawksIDs[i]].localVariables.FeededDaily++;
			updateChildActivity(V.hawksIDs[i]);
		}
	}

	return T.tempIDs.length;
}
window.getAllHungry = getAllHungry;