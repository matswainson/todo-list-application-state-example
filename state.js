
;(function(window, Store){

	'use strict';

	class State {

		constructor(name) {
			this.itemId = 1;
			this.date = this.setDate();
			this.form = {
				focus: false,
				valid: false
			};
			this.items = [];
			this.store = new Store(name);
			if (this.store.isSupported) {
				this.items = this.store.load();
			}
			if (this.items.length) {
				for (const item of this.items) {
					if (item.id >= this.itemId) {
						this.itemId = item.id + 1;
					}
				}
			}
			this.orderItems();
		}

		saveItems() {
			if (this.store.isSupported) {
				this.store.save(this.items);
			}
		}

		addItem(item) {
			this.items.unshift({
				id: this.itemId++,
				status: 0,
				value: item
			});
			this.saveItems();
		}

		orderItems() {
			const todo = this.items.filter((item) => {
				return item.status === 0;
			});
			const done = this.items.filter((item) => {
				return item.status === 1;
			});
			this.items = todo.concat(done);
		}

		findItemIndex(id) {
			return this.items.findIndex((item) => {
				return item.id === id;
			});
		}

		deleteItem(id) {
			const itemIndex = this.findItemIndex(id);
			this.items.splice(itemIndex, 1);
			this.saveItems();
		}


		toggleItemStatus(id) {
			const itemIndex = this.findItemIndex(id);
			this.items[itemIndex].status = this.items[itemIndex].status ? 0 : 1;
			this.orderItems();
			this.saveItems();
		}

		setDate() {
			const date = new Date();
			const monthNames = [
				'January', 'February', 'March',
				'April', 'May', 'June', 'July',
				'August', 'September', 'October',
				'November', 'December'
			];
			let day = date.getDate();
			let monthIndex = date.getMonth();
			let year = date.getFullYear();
			return day + ' ' + monthNames[monthIndex] + ' ' + year;
		}

	}

	window.State = State;

})(window, window.Store);



