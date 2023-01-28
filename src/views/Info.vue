<template>
	<main class="main">
		<div class="main__header">
			<div class="main__title">
				<h1>{{ title }}</h1>
			</div>
		</div>
	</main>
</template>

<script>
export default {
	name: 'InfoView',
};
</script>

<script setup>
import {
	onBeforeMount,
	onBeforeUpdate,
	onMounted,
	onUpdated,
	provide,
	reactive,
	ref,
	watch,
} from 'vue';

const title = ref('Info Page');
const version = ref(3);
const textInput = ref(null);
</script>

<style scoped></style>
