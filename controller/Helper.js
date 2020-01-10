
class Helper {

	static array_delete_item = (array, index) => {
		let aux = [];
		for(let i = 0; i < array.length; i ++) {
			if(i != index) {
				aux.push(array[i]);
			}
		}
		return aux;
	};
}

module.exports = Helper;