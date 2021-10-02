import { localStore } from './localStore.js';

const initialTodos = [
	{ id: 1, name: 'eat', start: '13:30', end: '14:30', completed: true },
	{ id: 2, name: 'sleep', start: '16:15', end: '17:15', completed: false }
];

export const todos = localStore('data', initialTodos);
