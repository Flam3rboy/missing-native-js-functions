import { define } from "./Util";

define(String.prototype, {
	capitalize: function () {
		return this.slice(0, 1).toUpperCase() + this.slice(1);
	},
	title: function () {
		return this.split(" ")
			.map((element: string) => {
				return element.capitalize();
			})
			.join(" ");
	},
	replaceAll: function (find: string, replace: string) {
		return this.replace(new RegExp(escapeRegExp(find), "g"), replace);
	},
	similarity: function (second: string) {
		let first = this.replace(/\s+/g, "");
		second = second.replace(/\s+/g, "");
		if (!first.length && !second.length) return 1; // if both are empty strings
		if (!first.length || !second.length) return 0; // if only one is empty string
		if (first === second) return 1; // identical
		if (first.length === 1 && second.length === 1) return 0; // both are 1-letter strings
		if (first.length < 2 || second.length < 2) return 0; // if either is a 1-letter string
		let firstBigrams = new Map();
		let lowBigrams = new Map();
		for (let i = 0; i < first.length - 1; i++) {
			const bigram = first.substring(i, i + 2);
			const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1;
			const countLow = lowBigrams.has(bigram.toLowerCase()) ? lowBigrams.get(bigram.toLowerCase()) + 1 : 1;

			lowBigrams.set(bigram.toLowerCase(), countLow);
			firstBigrams.set(bigram, count);
		}
		let intersectionSize = 0;
		for (let i = 0; i < second.length - 1; i++) {
			const bigram = second.substring(i, i + 2);
			const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;
			const countLow = firstBigrams.has(bigram.toLowerCase()) ? firstBigrams.get(bigram.toLowerCase()) : 0;
			if (count > 0) {
				firstBigrams.set(bigram, count - 1);
				intersectionSize++;
			}
			if (countLow > 0) {
				firstBigrams.set(bigram.toLowerCase(), countLow - 1);
				intersectionSize += 0.9;
			}
		}
		return (2.0 * intersectionSize) / (first.length + second.length - 2);
	},
	join: function (iterate: string[]) {
		if (typeof iterate === "string") return iterate;
		return iterate.join(this);
	},
	partition: function (seperator: string) {
		if (!this.includes(seperator)) {
			return [this];
		}
		let returnArray: string[] = [];
		let splitarray: string[] = this.split(seperator);
		for (let i = 0; i < splitarray.length; i++) {
			returnArray.push(splitarray[i]);
			if (i != splitarray.length - 1) returnArray.push(seperator);
		}
		return returnArray;
	},
	toNumber: function () {
		return Number(this);
	},
	toBigInt: function () {
		try {
			return BigInt(this);
		} catch (error) {
			return NaN;
		}
	},
	equalsIgnoreCase: function (compareString: String) {
		return this.toLowerCase() === compareString.toLowerCase();
	},
	count: function (countString: string) {
		return this.split(countString).length - 1;
	},
	swapcase: function () {
		return this.split("")
			.map((char: string) => {
				if (char === char.toUpperCase()) return char.toLowerCase();
				return char.toUpperCase();
			})
			.join("");
	},
	toObject: function () {
		return JSON.parse(this);
	},
	toBoolean: function () {
		switch (this.toLowerCase().trim()) {
			case "true":
			case "yes":
			case "1":
				return true;
			case "false":
			case "no":
			case "0":
			case null:
				return false;
			default:
				return Boolean(this);
		}
	},
});

// copied from https://github.com/aceakash/string-similarity/blob/master/src/index.js
// MIT License Copyright (c) 2018 Akash Kurdekar
function escapeRegExp(str: string) {
	return str.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
declare global {
	interface String {
		capitalize(): string;
		replaceAll(search: string, replace: string): string;
		similarity(compare: string): number;
		join(iterate: string[]): string;
		partition(separator: string): string[];
		toNumber(): number;
		toBigInt(): bigint;
		equalsIgnoreCase(compareString: string): string;
		count(countString: RegExp | any): number;
		swapcase(): string;
		title(): string;
		toObject(): object;
		toBoolean(): boolean;
	}
}
export {};
