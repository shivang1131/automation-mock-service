function ARE_UNIQUE(operand: string[]) {
	const valuesSet = new Set(operand);
	return valuesSet.size === operand.length;
}

function ALL_IN(left: string[], right: string[]) {
	const leftSet = new Set(left);
	return right.every((v) => leftSet.has(v));
}

function ANY_IN(left: string[], right: string[]) {
	const leftSet = new Set(left);
	return right.some((v) => leftSet.has(v));
}

function NONE_IN(left: string[], right: string[]) {
	const leftSet = new Set(left);
	return !right.some((v) => leftSet.has(v));
}

function EQUAL_TO(left: string[], right: string[]) {
	if (left.length !== right.length) return false;
	return left.every((v, i) => v === right[i]);
}

function FOLLOW_REGEX(left: string[], regexArray: string[]) {
	for (const regex of regexArray) {
		const re = new RegExp(regex);
		if (left.some((v) => !re.test(v))) return false;
	}
	return true;
}

export default {
	FOLLOW_REGEX,
	ARE_UNIQUE,
	ALL_IN,
	ANY_IN,
	NONE_IN,
	EQUAL_TO,
};
