let str = "(((3n ** 3n) ** (3n ** 3n)) ** ((3n ** 3n) ** (3n ** 3n))) ** (((3n ** 3n) ** (3n ** 3n)) ** ((3n ** 3n) ** (3n ** 3n)))";

console.log(str);
console.log(str = str.replaceAll("(3n ** 3n)", "27n"));
console.log(str = str.replaceAll("(27n ** 27n)", "b"));
console.log(str = str.replaceAll("(b ** b)", "c"));

/*
 * ((27n ** 27n) ** (27n ** 27n)) ** ((27n ** 27n) ** (27n ** 27n))
 * (b ** b) ** (b ** b)
 * с ** с
 */

