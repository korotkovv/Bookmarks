<template>
	<div class="main__links lists">
		<template v-if="linksList.length > 0">
			<link-list-item
				v-for="linkItem in linksList"
				:linkItem="linkItem.attributes"
				:key="linkItem.id"
				:id-link="linkItem.id"
				:id-category="menuStore.idCategory"
				@refresh="refreshLinks"
			></link-list-item>
		</template>
		<div class="lists__item addlist" @click="openDialogLinkAdd">
			<div href="#?" class="addlist__url">
				<div class="addlist__img">
					<svg
						width="25"
						height="26"
						viewBox="0 0 25 26"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect y="12" width="25" height="2" fill="#E7E7F1" />
						<rect
							x="11.5"
							y="25.5"
							width="25"
							height="2"
							transform="rotate(-90 11.5 25.5)"
							fill="#E7E7F1"
						/>
					</svg>
				</div>
				<div class="addlist__body">
					<div class="addlist__title">Добавить</div>
					<div class="addlist__desc">Добавить закладку</div>
				</div>
			</div>
		</div>
		<link-add
			v-if="dialogLinkAdd.status"
			:id-category="menuStore.idCategory"
			:is-open="dialogLinkAdd.status"
			@success="dialogYes"
			@close="dialogClose"
		></link-add>
	</div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useMenuStore } from '@/stores/menu';
import LinkListItem from './LinkListItem.vue';
import LinkAdd from './LinkAdd.vue';

const menuStore = useMenuStore();
const emit = defineEmits(['refresh']);
const props = defineProps({
	linksList: {
		type: Array,
		required: false,
		default: [],
	},
});
const isOpenAddLink = ref(true);
const dialogLinkAdd = reactive({
	status: false,
});
const dialogLink = ref(false);

const openDialogLinkAdd = () => {
	dialogLinkAdd.status = true;
};

const dialogClose = () => {
	dialogLinkAdd.status = false;
	//	dialogLinkAdd.idCategory = 2;
};
const dialogYes = () => {
	dialogLinkAdd.status = false;
	//dialogLinkAdd.idCategory = 2;
	emit('refresh');
};

const refreshLinks = () => {
	emit('refresh');
};
</script>

<style lang="scss" scoped></style>
