
simpleFrameworks.addto('iModOptions', 'BabyhawkTestFunc');

simpleFrameworks.addto('iModHeader', {
    passage: ['Bird Tower Hunt End BabyHawk','BabyHawk Hunt Accept','BabyHawk Hunt Refuse','BabyHawk Hunt Passout','BabyHawk Hunt Return Ask',
		'Bird Tower FoodForOne BabyHawk','Bird Tower FoodForAll BabyHawk','BabyHawk Childrens Home','BabyHawk Activity Events',
		'BabyHawk FirstFlight','BabyHawk FirstFlight Back','BabyHawk FirstFlight End','BabyHawk FirstFlight Stay',
		'BabyHawk FirstHunt Intro','BabyHawk FirstHunt Intro 2','BabyHawk FirstHunt Intro 3','BabyHawk FirstHunt Intro 4','BabyHawk FirstHunt Intro 5','BabyHawk FirstHunt Intro 6','BabyHawk FirstHunt Intro 7',
		'BabyHawk Build OtherNest','BabyHawk Hunt Goal','BabyHawk Hunt Direction','BabyHawk Hunt Event','BabyHawk Hunt Return',
		'BabyHawk Hunt Plane Chase','BabyHawk Hunt Ignore','BabyHawk Hunt Scavenge Party Site','BabyHawk Hunt Scavenge','BabyHawk Hunt Scavenge Clothes','BabyHawk Hunt Scavenge Leave','BabyHawk Hunt Camp','BabyHawk Hunt Camp 2','BabyHawk Hunt Exit',
		'BabyHawk Hunt Dead Tree','BabyHawk Hunt Dead Tree 2','BabyHawk Hunt Sticks','BabyHawk Hunt Sticks 2','BabyHawk Hunt Leaves','BabyHawk Hunt Underbrush','BabyHawk Hunt Underbrush 2','BabyHawk Hunt Underbrush Fight','BabyHawk Hunt Underbrush Fight Finish',
		'BabyHawk Hunt Flowers','BabyHawk Hunt Flowers Leave','BabyHawk Hunt Flowers Relax','BabyHawk Hunt Shiny','BabyHawk Hunt Shiny Clothes','BabyHawk Hunt Pond Dive','BabyHawk Hunt Pond Dive 2',
		'BabyHawk Hunt Lurkers Lot','BabyHawk Hunt Lurkers Lot Single','BabyHawk Hunt Lurkers Lot Double','BabyHawk Hunt Lurkers Lot Group','BabyHawk Hunt Lurkers Few','BabyHawk Hunt Lurkers Few PokemonGo','BabyHawk Hunt Lurkers Few Ambush','BabyHawk Hunt Lurkers Few Chase',
		'BabyHawk Hunt Animal Watch','BabyHawk Hunt Animal Land','BabyHawk Hunt Fox Take','BabyHawk Hunt Fox Leave','BabyHawk Hunt Fox Play No','BabyHawk Hunt Fox Play Yes','BabyHawk Hunt Fox Pet','BabyHawk Hunt Fox Fight','BabyHawk Hunt Fox Fight Finish','BabyHawk Hunt Animal Screech','BabyHawk Hunt Foxes Land','BabyHawk Hunt Foxes Watch','BabyHawk Hunt People Watching',
		'BabyHawk Hunt OrphanHawk Nest','BabyHawk Hunt OrphanHawk Nest 2','BabyHawk Hunt OrphanHawk Nest Special','BabyHawk Hunt OrphanHawk RingForAntique','BabyHawk Hunt OrphanHawk RingForToy',
		'BabyHawk Hunt Trespasser','BabyHawk Hunt Trespasser 2','BabyHawk Hunt Trespasser 3','BabyHawk Hunt Trespasser 4',
		'Moor BabyHawk Screech','Moor BabyHawk Home','Moor BabyHawk Hug','Moor BabyHawk Bath',
		'Crafting Bird Tower Cooking Pot Exit','Crafting Bird Tower Work Bench Exit','BabyHawk Feed Terraria Food'
	],
    widget: 'BabyhawkModWarning',
});
/* 小鹰单独狩猎完成，回塔的显示检查 */
simpleFrameworks.addto('iModHeader', {
    passage: ['Bird Tower'],
    widget: 'BabyhawkHuntBack',
});

/*
	初始化生长阶段;
	总体换羽过程比现实苍鹰推后一个阶段，总而言之不要太在意和现实的契合度，这里是dol！;
*/
function initGrowStage(childId) {

	const child = V.children[childId];
	if (!child) return null;

	let stage = null;
	if (getChildDays(child.childId) < 14) {
		stage = "Hatchling";/* 雏鸟，没有羽毛 */
	} else if (getChildDays(child.childId) > 14 && getChildDays(child.childId) < 35) {
		stage = "Nestling";	/* 雏鸟，长出雏绒羽，未离巢 */
	} else if (getChildDays(child.childId) > 34 && getChildDays(child.childId) < 65) {
		stage = "Fledgling";/* 幼鸟，长出稚羽，已离巢 */
		child.localVariables.growHintFledgling = 1;		/* 开始雏后换羽，提醒玩家离巢 */ 
	} else if (getChildDays(child.childId) > 64 && getChildDays(child.childId) < 90) {
		stage = "Subadult";/* 亚成鸟，初次飞行 */
		child.localVariables.growHintSubadult = 1;		/* 开始稚后换羽，可飞行 */ 
	} else if (getChildDays(child.childId) > 89 && getChildDays(child.childId) < 200) {
		stage = "Immature";/* 亚成鸟，长出完整飞羽，初次狩猎 */
		child.localVariables.growHintImmature = 1;		/* 幼羽，可狩猎，之后再分单独狩猎期，这个期间不需要喂了，单独分巢住 */ 
		child.localVariables.growHintSubadult = 1;		/* 用来剔除旧档大龄幼崽，先学飞再狩猎！*/
	}

	child.localVariables.stage = stage;

}
window.initGrowStage = initGrowStage;

/*
	初始化性格，参考狐狸的性格特质;
	dominant：强势，领地意识强，个头大，干架猛，喜欢狩猎和干饭;
	clever：聪明，学说话快一点儿，更自我中心，喜欢收集闪亮亮;
	sympathy：同情心高，擅长和各种生物社交，疑似有点太人性化了，喜欢探索世界;
	clumsy：笨拙，字面意思上的动作笨拙，学的比较慢，通常是因为营养不良，喜欢和亲鸟贴贴;
*/
function initTrait(childId) {

	const child = V.children[childId];
	if (!child) return null;

	let randomNumber = 0;
	let trait = null;
	randomNumber = Math.random();

	/* 亚成年才获得性格 */
	if (getChildDays(child.childId) < 64 || child.localVariables.trait != undefined) {
		return;
	}

	/* 大体型增加dom；小体型增加clumsy */
	if (child.features.size == "large") {
		randomNumber += 0.2;
	}
	else if (child.features.size == "small") {
		randomNumber -= 0.1;
	}
	else if (child.features.size == "tiny") {
		randomNumber -= 0.2;
	}

	/* 喂食过多增加dom；喂食过少增加clumsy */
	if (child.localVariables.FeededTotal - getChildDays(child.childId) > 10) {
		randomNumber += 0.2;
	}
	else if (getChildDays(child.childId) - child.localVariables.FeededTotal > 5) {
		randomNumber -= 0.2;
	}
	else if (getChildDays(child.childId) - child.localVariables.FeededTotal > 10) {
		randomNumber = 0;
	}

	/* 概率均匀分配 */
	if (randomNumber < 0.25) {
		trait = "clumsy";
	} else if (between(randomNumber, 0.25, 0.5)) {
		trait = "sympathy";
	} else if (between(randomNumber, 0.5, 0.75)) {
		trait = "clever";
	} else if (randomNumber > 0.75) {
		trait = "dominant";
	}

	child.localVariables.trait = trait;
}
window.initTrait = initTrait;

/*
	-初始化旧档小鹰被喂食的次数，按每日一次计算;
	-遗孤小鹰从被收养的日子开始计算喂食次数，意味着性格特质很大可能是clumsy;
*/
function initFeededDays(childId) {

	const child = V.children[childId];
	if (!child) return null;

	let date1 = null;
	if (childId == "orphanHawk1") {
		date1 = child.adopted.day + " " + child.adopted.month + " " + child.adopted.year;
	} else {
		date1 = child.born.day + " " + child.born.month + " " + child.born.year;
	}
	const date2 = Time.monthDay + " " + Time.monthName + " " + Time.year;
	const calc = Math.abs(Date.parse(date2) - Date.parse(date1));
	let childFeededDaysCap = 200;

	const childFeededDays = Math.clamp(Math.ceil(calc / (1000 * 60 * 60 * 24)), 0, childFeededDaysCap);
	return childFeededDays;
}
window.initFeededDays = initFeededDays;

function hawkBabyActivity(childId) {
	const child = V.children[childId];
	if (!child) return null;

	const toySets = [];
	const toyNames = [];
	if (V.storedChildrenToys && V.storedChildrenToys[V.location]) {
		V.storedChildrenToys[V.location].forEach(toy => {
			toySets.pushUnique(toy.set);
			toyNames.pushUnique(toy.name);
		});
	}

	let activity = [];

	if (between(T.childTotalDays, 0, 14)) {/* "Hatchling"：雏鸟，没有羽毛 */
		if (Time.dayState === "night" && V.bird.state === "home" && ["sleep", "rest", "brood"].includes(V.bird.activity)) {
			activity = activity.concat(["sleepingWithGreatHawk", "sleepingWithGreatHawk", "sleepingWithGreatHawk", "sleeping"]);
		} else {
			activity = activity.concat(["sleeping", "sleeping", "sleeping", "crying", "reaching", "flap", "perch", "bathe"]);
		}
	} else if (between(T.childTotalDays, 15, 34)) {/* "Nestling"：雏鸟，长出雏绒羽，未离巢 */
		if (Time.dayState === "night" && V.bird.state === "home" && ["sleep", "rest", "brood"].includes(V.bird.activity)) {
			activity = activity.concat(["sleepingWithGreatHawk", "sleepingWithGreatHawk", "sleepingWithGreatHawk", "sleeping"]);
		} else {
			activity = activity.concat(["sleeping", "crying", "reaching", "flap", "preen", "perch", "bathe", "GreatHawk"]);
		}
	} else if (between(T.childTotalDays, 35, 64)) {/* "Fledgling"：幼鸟，长出稚羽，已离巢 */
		if (Time.dayState === "night" && V.bird.state === "home" && ["sleep", "rest", "brood"].includes(V.bird.activity)) {
			activity = activity.concat(["sleepingWithGreatHawk", "sleepingWithGreatHawk", "sleeping"]);
		} else {
			activity = activity.concat(["rest", "crying", "reaching", "explore", "Fledgling_fly", "Fledgling_preen", "Fledgling_perch", "batheSelf", "GreatHawk"]);
		}
	} else if (between(T.childTotalDays, 65, 90)) {/* "Subadult"：亚成鸟，初次飞行，还没学狩猎 */
		if (Time.dayState === "night" && V.bird.state === "home" && ["sleep", "rest", "brood"].includes(V.bird.activity)) {
			activity = activity.concat(["sleepingWithGreatHawk", "sleeping"]);
		} else {
			activity = activity.concat(["rest", "reaching", "explore", "Subadult_fly", "Subadult_preen", "Subadult_perch", "batheSelf", "GreatHawk"]);
		}
	} else if (between(T.childTotalDays, 89, 200)) {/* "Immature"：亚成鸟，长出完整飞羽，单独住一个巢，可出去单独狩猎 */
		if (Time.dayState === "night" && V.bird.state === "home" && ["sleep", "rest", "brood"].includes(V.bird.activity)) {
			activity = activity.concat(["sleeping"]);
		} else {
			activity = activity.concat(["rest", "reaching", "Subadult_fly", "Subadult_preen", "Subadult_perch", "batheSelf", "GreatHawk"]);
		}
	} else {//这里应该做一个报错但我不知道怎么做
		activity = activity.concat(["sleeping", "sleeping", "sleeping", "crying", "reaching", "flap", "perch", "bathe"]);
	}
	if (child.location != "otherNest" && child.localVariables.FeededDaily < 2) {//乞食
		activity.push("beg");
		activity.push("beg");
	} else {
		activity = activity.filter(item => item !== "beg");
	}

	if (child.childId == "orphanHawk1" && V.babyhawk_GoldRing) {//孤儿小鹰玩戒指
		activity.push("GoldRing");
	}

	if (child.location == "otherNest" && Time.dayState != "night") {//单独狩猎
		activity.push("hunting");
		//这里可以做一个小概率的乞食事件，啃老啊！
	}

	if (activity.length) {
		child.localVariables.activity = activity[random(0, activity.length - 1)];
		child.localVariables.event = true;
	} else {
		child.localVariables.activity = "noEvent";
		child.localVariables.event = true;
	}
}
window.hawkBabyActivity = hawkBabyActivity;

new TimeEvent('onDay', 'DailyBabyHawkCheck')
	.Action(timeData => {
		Object.values(V.children).forEach(child => {
			if (child.type == "hawk" && !child.eggTimer && (child.location == "tower" || child.location == "otherNest") ) {
				/* 检测初始化 */
				BabyHawkInitCheck(child.childId);
				/* 检测喂食情况 */
				updateFeeded(child.childId);
				/* 喂食过多时体型增长，可能会把崽喂超肥 */
				updateSize(child.childId);
				/* 检测成长阶段 */
				updateGrowStage(child.childId);
				/* 更新事件 */
				updateChildActivity(child.childId);
			}
		})
		V.atBirdTower = 0;
	});

/*取消更新事件的时间限制：hawkBabyActivity(child.childId);*/
new TimeEvent('onHour', 'updateBabyHawkActivity')
	.Cond(V.location == "tower")
	.Action(timeData => {
		Object.values(V.children).forEach(child => {
			if (child.type == "hawk" && !child.eggTimer) {
				updateChildActivity(child.childId);
			}
		})
	});

/* 小鹰狩猎定时器 */
new TimeEvent('onMin', 'BabyHawkHuntTimer')
	.Cond(V.location == "tower" || V.location == "moor")
	.Action(timeData => {
		Object.values(V.children).forEach(child => {
			if (child.localVariables.timer && timeData.min > 0) {
				/* 更新定时器 */
				child.localVariables.timer -= timeData.min;
			}
		})
	});

/*
	初始化检查;
*/
function BabyHawkInitCheck(childId) {
	const child = V.children[childId];
	if (!child) return null;

	if (!child.localVariables.FeededTotal || child.localVariables.FeededTotal == undefined) {
		child.localVariables.FeededTotal = initFeededDays(child.childId);
	}
	if (child.localVariables.stage == undefined) {
		initGrowStage(childId);
	}
}

/*
	检测喂食情况;
*/
function updateFeeded(childId) {
	const child = V.children[childId];
	if (!child) return null;

	let feed = child.localVariables.FeededDaily;
	
	/* PC当天晚上0点前都未踏入塔中，视为不在鹰塔，大鹰自力更生，更新统计喂食次数 */
	if (!V.atBirdTower && !V.bird.injured && !npcIsPregnant("Great Hawk")) { child.localVariables.FeededTotal++; }
	/* 离巢后的小鹰每天要吃两顿才够饱，妈呀 */
	if (getChildDays(child.childId) > 34) {
		feed = Math.floor(feed/2);
	}

	child.localVariables.FeededTotal += feed;
	child.localVariables.FeededDaily = 0;
}

/*
	喂食过多时体型增长，体型影响性格因素;
*/
function updateSize(childId) {
	const child = V.children[childId];
	if (!child) return null;

	if (child.features.size == "large") {
		return;
	} else if (child.features.size == "normal" && ((child.localVariables.FeededTotal - getChildDays(child.childId)) >= 9)) {
		child.features.size = "large";
	} else if (child.features.size == "small" && ((child.localVariables.FeededTotal - getChildDays(child.childId)) >= 7)) {
		child.features.size = "normal";
	} else if (child.features.size == "tiny" && ((child.localVariables.FeededTotal - getChildDays(child.childId)) >= 5)) {
		child.features.size = "small";
	} else {
		return;
	}

	child.localVariables.sizeHint = 1;
}

/*
	检测生长阶段，切换阶段时触发事件;
*/
function updateGrowStage(childId) {

	const child = V.children[childId];
	if (!child) return null;

	let newStage = null;
	if (child.localVariables.stage == undefined && getChildDays(child.childId) < 14) {
		/* 雏鸟，没有羽毛 */
		newStage = "Hatchling";
	} else if (child.localVariables.stage == "Hatchling" && getChildDays(child.childId) > 14) {
		/* 雏鸟，长出一层羽毛，未离巢 */
		newStage = "Nestling";
	} else if (child.localVariables.stage == "Nestling" && getChildDays(child.childId) > 34) {
		/* 幼鸟，长出初级飞羽，已离巢 */
		newStage = "Fledgling";
		child.localVariables.growHintFledgling = 1;
	} else if (child.localVariables.stage == "Fledgling" && getChildDays(child.childId) > 64) {
		/* 亚成鸟，长出完整飞羽 */
		newStage = "Subadult";
		child.localVariables.growHintSubadult = 1;
		initTrait(child.childId);
	} else if (child.localVariables.stage == "Subadult" && getChildDays(child.childId) > 89) {
		/* 留给后续的阶段划分，反正不会成年的 */
		newStage = "Immature";
		child.localVariables.growHintImmature = 1;
	} else {
		return;
	}

	child.localVariables.stage = newStage;
}
