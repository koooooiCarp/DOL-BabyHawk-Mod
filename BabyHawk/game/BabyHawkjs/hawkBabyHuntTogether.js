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