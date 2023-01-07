<template>
	<div class="sidebar__info info">
		<div class="info__title">Информация</div>
		<ul class="info__list">
			<li class="info__item">
				<router-link to="/info" class="info__link">
					<i class="las la-file-invoice"></i><span>Информация</span>
				</router-link>
			</li>
			<li class="info__item">
				<router-link to="/info" class="info__link">
					<i class="las la-file-invoice"></i><span>Календарь</span>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'InformationSidebar',
	data: () => ({
		//text: 'Календарь',
	}),
};
</script>

<style lang="scss" scoped></style>
