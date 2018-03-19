;(function(window){

	'use strict';

	class Store {

		constructor(name) {
			let isSupported;
			try {
				window.localStorage.setItem('test', 'test');
				window.localStorage.removeItem('test');
				isSupported = true;
			} catch(e) {
				isSupported = false;
			}
			this.name = name;
			this.isSupported = isSupported;
		}

		save(items) {
			const json = JSON.stringify(items);
			window.localStorage.setItem(this.name, json)
		}

		load() {
			const items = window.localStorage.getItem(this.name);
			return (items && items.length) ? JSON.parse(items) : [];
		}

	}

	window.Store = Store;

})(window);