<template>
	<div class="modal modal__addcategory active">
		<div class="modal__dialog">
			<div class="modal__header">
				<div class="modal__title">Добавить категорию</div>
				<div class="modal__close">&times;</div>
			</div>
			<div class="modal__body"></div>

			<div class="modal__footer">
				<button class="btn modal__btn_save">Сохранить</button>
				<button class="btn_outline modal__btn_close">Закрыть</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CategoryAdd',
};
</script>

<style lang="scss" scoped></style>
