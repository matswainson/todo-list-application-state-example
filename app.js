;(function(State){

	'use strict';

	class App {

		constructor(name) {
			this.name = name;
			this.state = new State(name);
			this.date = document.querySelector('h2');
			this.list = document.querySelector('ul');
			this.button = document.querySelector('button');
			this.form = document.querySelector('form');
			this.input = document.querySelector('input');
			this.bindEvents();
			this.render();
		}

		bindEvents() {
			this.list.addEventListener('click', this.handleClick.bind(this));
			this.form.addEventListener('submit', this.submitForm.bind(this));
			this.input.addEventListener('keyup', this.keyUp.bind(this));
			this.input.addEventListener('focus', this.focus.bind(this));
			this.input.addEventListener('blur', this.blur.bind(this));
			this.button.addEventListener('focus', this.focus.bind(this));
			this.button.addEventListener('blur', this.blur.bind(this));
		}

		submitForm(event) {
			event.preventDefault();
			if (!this.input.value.length) {
				return;
			}
			this.state.addItem(this.input.value);
			this.input.value = '';
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

			this.date.innerHTML = this.state.date;
			this.form.classList.toggle('focus', this.state.form.focus);
			this.form.classList.toggle('valid', this.state.form.valid);
			this.list.innerHTML = listHTML;
		}

		keyUp() {
			this.state.form.valid = (this.input.value.length) ? 1 : 0;
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