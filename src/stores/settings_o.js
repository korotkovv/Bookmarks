import { defineStore } from 'pinia';

export const useSettingStore = defineStore('setting', {
	state: () => ({
		name: 'Bookmarks',
		switcher: localStorage.getItem('switcher')
			? localStorage.getItem('switcher')
			: 'grid',
		isOpenSettings: false,
		toasterList: [
			/* { type: 'success', text: 'Какое-то сообщение' },
			{ type: 'error', text: 'Какое-то сообщение и предупреждение' },
			{
				type: 'warning',
				text: 'Какое-то длинное сообщение, чтобы был текст в несколько строчек, для теста уведомлений',
			}, */
		],
	}),
	actions: {
		/**
		 * Переключить в режим grid
		 */
		switcherGridHandle() {
			if (this.switcher === 'list') {
				this.switcher = 'grid';
				localStorage.setItem('switcher', 'grid');
			}
		},
		/**
		 * Переключить в режим list
		 */
		switcherListHandle() {
			if (this.switcher === 'grid') {
				this.switcher = 'list';
				localStorage.setItem('switcher', 'list');
			}
		},

		/**
		 * Закрытие одного уведомления
		 * @param {number} idx - индекс уведомления в массиве
		 */
		closeToast(idx) {
			this.toasterList.splice(idx, 1);
		},
		/**
		 * Добавление уведомления в список
		 * @param {string} type - тип уведомления success | warning | error
		 * @param {string} text - текст уведомления
		 */
		addToast(type, text) {
			this.toasterList.push({ type: type, text: text });
		},

		/**
		 * Удаление первого элемента из списка уведомлений
		 */
		removeToast() {
			this.toasterList.shift();
		},
	},
});
