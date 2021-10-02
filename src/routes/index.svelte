<!-- App.svelte -->
<script>
	import Todos from '$lib/components/Todos.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import { todos } from '../stores.js';
</script>

<Alert />
<Todos bind:todos={$todos} />
