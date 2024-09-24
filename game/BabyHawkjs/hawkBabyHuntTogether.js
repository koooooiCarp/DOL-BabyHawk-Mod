/* 查找狩猎集体中对应性格的小鹰 */
function getHawkTrait(trait) {
	T.tempIDs = [];
	T.length = 0;
	let i = 0;

	for (i = 0; i < V.hawksTotal; i++){
		if(V.children[V.hawksIDs[i]].localVariables.trait == trait){
			T.tempIDs.push(V.hawksIDs[i]);
		}
	}

	T.length = T.tempIDs.length;
	return T.length;
}
window.getHawkTrait = getHawkTrait;

/* 查找狩猎集体中的孤儿崽崽 */
function hasOrphan() {
	let i = 0;

	for (i = 0; i < V.hawksTotal; i++)
	{
		if(V.children[V.hawksIDs[i]].childId == "orphanHawk1")
		{
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

/* 日常互动里检查所有活跃鹰崽数目 */
function hawkAmount(location = "tower") {
	let Number = 0;

	Object.values(V.children).forEach(child => {
		if (child.type == "hawk" && !child.eggTimer && child.location == location) {
			Number++;
		}
	})

	return Number;
}
window.hawkAmount = hawkAmount;
/* 默认在鹰塔，Immature期的小鹰位置设置成otherNest */
/* 日常互动里查找对应性格的小鹰 */
function hasTraitHawk(trait,location = "tower") {
	T.tempIDs = [];

	Object.values(V.children).forEach(child => {
		if (child.type == "hawk" && !child.eggTimer && child.location == location && child.localVariables.trait == trait) {
			T.tempIDs.push(child.childId);
		}
	})

	return T.tempIDs.length;
}
window.hasTraitHawk = hasTraitHawk;

/* 狩猎回来之后大吃特吃 */
/* 需要重新考虑每日进食次数…… */
function getAllHungry() {
	T.tempIDs = [];T.length = 0;
	let Number = 0;let i = 0;
	

	if(V.hawksTotal > V._lurkerLoot){
		Number = V._lurkerLoot;
	}
	else{
		Number = V.hawksTotal;
	}

	for (i = 0; i < Number; i++){
		if(V.children[V.hawksIDs[i]].localVariables.FeededDaily < 2){
			V.children[V.hawksIDs[i]].localVariables.activity = "lurkerEat";
			V.children[V.hawksIDs[i]].localVariables.FeededDaily++;
			T.tempIDs.push(V.hawksIDs[i]);
		}
	}
	T.length = T.tempIDs.length;
	return T.length;
}
window.getAllHungry = getAllHungry;