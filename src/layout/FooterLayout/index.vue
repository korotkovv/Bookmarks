<template>
	<div class="footer">
		<toaster-list></toaster-list>
	</div>
</template>

<script>
import ToasterList from '@/components/Toaster/ToasterList.vue';

export default {
	name: 'FooterLayout',

	components: {
		ToasterList,
	},
};
</script>

<style lang="scss" scoped></style>
