# simple chinese to tradiction chinese 簡體轉繁體，或者說是簡化字轉正體字，及異體字擇用的工具包。


```

const ChineseAdjustor = require('adjust-chinese');

let tempT = [

];

/**
 * 預設的字典詞庫使用字符串指定，臨時自設的字典使用變量名轉入
 * {standardT, contextT, symbolT, notRenameT, sectionT, daoistDefT,
 *  daoistT, daoistTokenT, abcT, traAdjustT, policsT, correctOcrT, dotT, encodingT}
 * 字典中有些我自己的異體字擇用，比如：「个個箇」選「个」、「𨿽雖」選「𨿽」
 * 建議使用一點明體、花園字體或開心宋體閱讀轉換後的文本
 */
let dicts = ['abcT','traAdjustT','standardT','contextT','symbolT','notRenameT',tempT,['个個箇']];

let adjustor = new ChineseAdjustor(dicts);

let strOrg = '红楼梦个個箇';

//if strOrg is not encoding utf8
strOrg = ChineseAdjustor.encodingToUtf8(strOrg);

let strAdjusted = adjustor.adjust(strOrg);

console.log(strOrg, strAdjusted);


```

## static ChineseAdjustor.encodingToUtf8(str)

