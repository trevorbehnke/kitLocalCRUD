<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { selectOnFocus } from '../actions.js';
	export let todo;
	let editing = false; // track editing mode
	let editButtonPressed = false; // track if edit button has been pressed, to give focus to it after cancel or save
	let name = todo.name; // hold the name of the todo being edited
	function update(updatedTodo) {
		todo = { ...todo, ...updatedTodo }; // applies modifications to todo
		dispatch('update', todo); // emit update event
	}
	function onCancel() {
		name = todo.name; // restores name to its initial value
		editing = false; // and exit editing mode
	}
	function onSave() {
		update({ name: name }); // updates todo name
		editing = false; // and exit editing mode
	}
	function onRemove() {
		dispatch('remove', todo); // emit remove event
	}
	function onEdit() {
		editButtonPressed = true; // when Cancel or Save is pressed, focus should go back to the Edit button
		editing = true; // enter editing mode
	}
	function onToggle() {
		update({ completed: !todo.completed }); // updates todo status
	}
	const focusOnInit = (node) => node && typeof node.focus === 'function' && node.focus();
	const focusEditButton = (node) => editButtonPressed && node.focus();
</script>

<div class="stack-small">
	{#if editing}
		<!-- markup for editing todo: label, input text, Cancel and Save Button -->
		<form on:submit|preventDefault={onSave} on:keydown={(e) => e.key === 'Escape' && onCancel()}>
			<div class="form-group">
				<input
					bind:value={name}
					use:selectOnFocus
					use:focusOnInit
					type="text"
					id="todo-{todo.id}"
					autoComplete="off"
					class="todo-text"
				/>
			</div>
			<div>
				<button on:click={onCancel} type="button"> Cancel </button>
				<button type="submit" disabled={!name}> Save </button>
			</div>
		</form>
	{:else}
		<!-- markup for displaying todo: checkbox, label, Edit and Delete Button -->
		<input type="checkbox" id="todo-{todo.id}" on:click={onToggle} checked={todo.completed} />
		<label for="todo-{todo.id}">{todo.name}</label>
		<button type="button" on:click={onEdit} use:focusEditButton> edit </button>
		<button type="button" on:click={onRemove}>-</button>
	{/if}
</div>
