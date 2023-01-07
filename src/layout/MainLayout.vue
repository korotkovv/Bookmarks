<template>
	<div class="wrapper">
		<header-layout></header-layout>
		<div class="wrapper__body">
			<sidebar-layout></sidebar-layout>
			<router-view></router-view>
		</div>
		<footer-layout></footer-layout>
	</div>
</template>

<script>
import HeaderLayout from './HeaderLayout/index.vue';
import SidebarLayout from './SidebarLayout/index.vue';
import FooterLayout from './FooterLayout/index.vue';

export default {
	data: () => ({}),

	components: {
		'header-layout': HeaderLayout,
		'sidebar-layout': SidebarLayout,
		'footer-layout': FooterLayout,
	},
};
</script>

<style lang="scss" scoped></style>
