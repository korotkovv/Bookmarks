<template>
	<div class="sidebar__info info-block">
		<div class="info-block__title">{{ title }}</div>
		<ul class="info-block__list">
			<li class="info-block__item">
				<router-link to="/info" class="info-block__link">
					<i class="las la-file-invoice"></i><span>Информация</span>
				</router-link>
			</li>
			<!-- 	<li class="info-block__item">
				<router-link to="/info" class="info-block__link">
					<i class="las la-file-invoice"></i><span>Календарь</span>
				</router-link>
			</li> -->
		</ul>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const title = ref('Информация');
</script>

<style lang="scss" scoped></style>
