const {standardT, contextT, symbolT, notRenameT, sectionT, daoistDefT, daoistT, daoistTokenT, abcT, traAdjustT, policsT, correctOcrT, dotT, encodingT} = require('./adjust_chinese_dict.js');

class ChineseAdjustor {
	constructor(dictionaries) {
		this.fromT = [];
		this.toT = [];
		if(arguments.length==0) return;
		if(arguments[0]==null) return;
		for(let t=0; t<dictionaries.length; t++) {
			for(let i=0; i<eval(dictionaries[t]).length; i++) {
				let oo = [];
				for(let o of eval(dictionaries[t])[i]) oo.push(o);  /** 這是分割單字的最好方法 */
				if(oo.length<2) continue;
				for(let j=1; j<oo.length; j++) {
					this.fromT.push(new RegExp(oo[j],'g'));
					this.toT.push(oo[0]);
				}
			}
		}
	}

	adjust(utf8str) {
		if(utf8str==null) return '';
//		let newTxt =ChineseAdjustor.encodingToUtf8(str);
		let newTxt =utf8str;  //每次都要編碼太影響效率，要求輸入 utf8 編碼過的字串
		for(let i=0; i<this.fromT.length; i++) {
			newTxt = newTxt.replace(this.fromT[i], this.toT[i]);
		}
		return newTxt;
	}

	static encodingToUtf8(content) {
		const iconv = require('iconv-lite');
		const chardet = require('chardet');  //這個比 jschardet 好用。jschardet 當傳入文件名字串時出錯，認作 ascii 了。
		let buf = Buffer.from(content);
		let encoding = chardet.detect(buf);
		/**
		 * 曾在 encoding=='utf8' 時，直接 return content 造成在 adjust 函數中 newTxt.replace() 調用錯誤，
		 * 似乎轉入的 content 失去了字串性質，由於讀入文本文件時沒有指定編碼（因爲不知道，需偵測）。
		 * 這種錯誤很不好查。小心！
		 * 但是，如果原文件是 utf8 𨿽不能調用 content.replace() 但卻能比較內容
		 * console.log(content==iconv.decode(buf, encoding));  //true
		 */
		//if(iconv.decode(buf, encoding)==content) console.log('pass');
		return iconv.decode(buf, encoding);
	}

	outputDictionary(fileName) {
		const fs = require('fs');
		/** flags: 'as+': Open file for reading and appending in synchronous mode. The file is created if it does not exist. */
		/** https://nodejs.org/api/fs.html#fs_file_system_flags */
		let wstream = fs.createWriteStream(fileName, {flags:'as+'});
		for(let i=0; i<this.fromT.length; i++) {
			wstream.write(`${this.fromT[i]}=${this.toT[i]}\n`);
		}
		wstream.end();
		/**
		 * 這種寫法，當文件管理器剛好開在這個文件的寫入目錄時，可能造成文件管理器類似死機狀態，
		 * 使用流寫入就沒這個問題，由此可見效率差異。流寫入是異步的。
		 *
		for(let i=0; i<this.fromT.length; i++) {
			fs.writeFileSync(fileName, `${this.fromT[i]}=${this.toT[i]}\n`, {flag:'a'});
		}
		//*/
	}
}

module.exports = ChineseAdjustor;
