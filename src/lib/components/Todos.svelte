<!-- components/Todos.svelte -->
<script>
	import Todo from './Todo.svelte';
	import NewTodo from './NewTodo.svelte';
	export let todos = [];
	let todosStatus; // reference to TodosStatus instance
	$: newTodoId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
	function addTodo(name) {
		todos = [...todos, { id: newTodoId, name, completed: false }];
	}
	function removeTodo(todo) {
		todos = todos.filter((t) => t.id !== todo.id);
		todosStatus.focus(); // give focus to status heading
	}
	function updateTodo(todo) {
		const i = todos.findIndex((t) => t.id === todo.id);
		todos[i] = { ...todos[i], ...todo };
	}
</script>

<div>
	<!-- NewTodo -->
	<NewTodo autofocus on:addTodo={(e) => addTodo(e.detail)} />

	<!-- Todos -->
	<ul role="list" aria-labelledby="list-heading">
		{#each todos as todo (todo.id)}
			<li>
				<Todo
					{todo}
					on:update={(e) => updateTodo(e.detail)}
					on:remove={(e) => removeTodo(e.detail)}
				/>
			</li>
		{:else}
			<li>Nothing to do here!</li>
		{/each}
	</ul>
</div>

<!-- <style>
	li {
		list-style-type: none;
	}
</style> -->
