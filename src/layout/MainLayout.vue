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

<script setup>
import HeaderLayout from './HeaderLayout/index.vue';
import SidebarLayout from './SidebarLayout/index.vue';
import FooterLayout from './FooterLayout/index.vue';
</script>

<style lang="scss" scoped></style>
