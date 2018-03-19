;(function(State){

	'use strict';

	class App {

		constructor(name) {
			this.name = name;
			this.state = new State(name);
			this.dom = {
				button: document.querySelector('button'),
				date: 	document.querySelector('h2'),
				list: 	document.querySelector('ul'),
				form: 	document.querySelector('form'),
				input:  document.querySelector('input')
			};
			this.bindEvents();
			this.render();
		}

		bindEvents() {
			this.dom.list.addEventListener('click', this.handleClick.bind(this));
			this.dom.form.addEventListener('submit', this.submitForm.bind(this));
			this.dom.input.addEventListener('keyup', this.keyUp.bind(this));
			this.dom.input.addEventListener('focus', this.focus.bind(this));
			this.dom.input.addEventListener('blur', this.blur.bind(this));
			this.dom.button.addEventListener('focus', this.focus.bind(this));
			this.dom.button.addEventListener('blur', this.blur.bind(this));
		}

		submitForm(event) {
			event.preventDefault();
			if (!this.dom.input.value.length) {
				return;
			}
			this.state.addItem(this.dom.input.value);
			this.dom.input.value = '';
			this.render();
		}

		handleClick(event) {
			const e = event;
			if (e && e.target) {
				const element = e.target.type;
				if (element == 'submit' || element == 'checkbox') {
					const id = parseInt(e.target.parentNode.getAttribute('data-id'));
					if (element == 'submit') {
						this.state.deleteItem(id);
					} else {
						this.state.toggleItemStatus(id);
					}
				}
			}
			this.render();
		}




		render() {
			let listHTML = '';
			for (const item of this.state.items) {
				const className = item.status ? 'done' : '';
				listHTML += '<li class="' + className + '" data-id="' + item.id + '">';
				listHTML += '<input type="checkbox"' + (item.status ? ' checked' : '') + '>';
				listHTML += item.value + '<button>x</button></li>';
			}

			this.dom.date.innerHTML = this.state.date;
			this.dom.form.classList.toggle('focus', this.state.form.focus);
			this.dom.form.classList.toggle('valid', this.state.form.valid);
			this.dom.list.innerHTML = listHTML;
		}





		keyUp() {
			this.state.form.valid = (this.dom.input.value.length) ? 1 : 0;
			this.render();
		}

		blur() {
			this.state.form.focus = 0;
			this.render();
		}

		focus() {
			this.state.form.focus = 1;
			this.render();
		}

	}

	const app = new App('todo-list-state-example');

})(window.State);