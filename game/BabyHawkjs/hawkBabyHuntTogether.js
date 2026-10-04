/* 查找狩猎集体中对应性格的小鹰 */
function getHawkTrait(trait) {
	T.tempIDs = [];
	T.length = 0;
	let i = 0;

	for (i = 0; i < V.hawksTotal; i++){
		if(V.childRecords[V.hawksIDs[i]].development.trait == trait){
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
		if(V.childRecords[V.hawksIDs[i]].childId == "orphanHawk1")
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

	Object.values(V.childRecords).forEach(child => {
		if (child.species == "hawk" && (child.development.location == "tower" || child.development.location == "otherNest")) {
			Number++;
		}
	})

	return Number;
}
window.hasOnlyOrphan = hasOnlyOrphan;

/* 日常互动里检查所有活跃鹰崽 */
function hasActiveHawk(location = "tower") {
	T.tempIDs = [];

	Object.values(V.childRecords).forEach(child => {
		if (child.species == "hawk" && childIsBorn(child) && child.development.location == location && child.development.activity != "hunting") {
			T.tempIDs.push(child.childId);
		}
	})

	return T.tempIDs.length;
}
window.hasActiveHawk = hasActiveHawk;
/* 默认在鹰塔，Immature期的小鹰位置设置成otherNest */
/* 日常互动里查找对应性格的小鹰 */
function hasTraitHawk(trait,location = "tower") {
	T.tempIDs = [];

	Object.values(V.childRecords).forEach(child => {
		if (child.species == "hawk" && childIsBorn(child) && child.development.location == location && child.development.trait == trait) {
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
		if(V.childRecords[V.hawksIDs[i]].development.FeededDaily < 2){
			V.childRecords[V.hawksIDs[i]].development.activity = "lurkerEat";
			V.childRecords[V.hawksIDs[i]].development.FeededDaily++;
			T.tempIDs.push(V.hawksIDs[i]);
		}
	}
	T.length = T.tempIDs.length;
	return T.length;
}
window.getAllHungry = getAllHungry;