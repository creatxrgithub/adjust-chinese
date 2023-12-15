declare module 'adjust-chinese';
declare class ChineseAdjustor {
	constructor(dictionaries: any);
	adjust(utf8str: any);
	static encodingToUtf8(content: any);
	outputDictionary(fileName);
};
