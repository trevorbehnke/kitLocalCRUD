<script>
	let items = [
		{ id: 1, title: 'eat', start: '03:00', end: '04:00' },
		{ id: 2, title: 'sleep', start: '04:00', end: '05:00' },
		{ id: 3, title: 'code', start: '06:00', end: '07:00' }
	];
	let title = '';
	let start = null;
	let end = null;

	const create = () => {
		items = [
			...items,
			{
				id: Math.random(),
				title,
				start,
				end
			}
		];
		title = '';
		start = null;
		end = null;
	};

	const remove = (item) => {
		items = items.filter((i) => i !== item);
	};

	const changeTitle = (e, item) => {
		let x = items.find((x) => x.id === item.id);
		console.log(x);
		x = { ...x, title: e.target.value };
		console.log(x);
		items = [...items, x];
		remove(item);
	};

	$: console.log(items);
</script>

<form autocomplete="off" on:submit|preventDefault={create}>
	<label for="title">Add an item</label>
	<input id="title" type="text" bind:value={title} />
	<input id="start" type="time" bind:value={start} />
	<input id="end" type="time" bind:value={end} />
	<button type="submit">+</button>
</form>

<ul>
	{#each items as item}
		<li>
			<input on:change={(e) => changeTitle(e, item)} value={item.title} />

			<button on:click={() => remove(item)}>-</button>
		</li>
	{/each}
</ul>
