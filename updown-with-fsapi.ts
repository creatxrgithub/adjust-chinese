import { showSaveFilePicker } from 'native-file-system-adapter';

/*
class MyStream {
	stream: any = null;

	constructor(stream) {
		this.stream = stream;
	}

	write = async(data) => {
		//console.log('writing........................');
		await this.stream;
		await this.stream?.write(data);
	}

	end = async() => {
		await this.stream?.close();
	}
}
*/

export async function createWriteStream(path, options) {
	const fileHandle = await showSaveFilePicker({
			_preferPolyfill: false,
			suggestedName: 'untitled',
			excludeAcceptAllOption: false // default
		});
	//const wstream = await fileHandle.createWritable();
	//const retObj = new MyStream(wstream);
	const retObj = {
		stream: await fileHandle.createWritable(),

		async write(data) {
			//console.log('writing........................');
			//await this.stream;
			await this.stream?.write(data);
		},

		async end() {
			await this.stream?.close();
		}
	}
	return retObj;
}
