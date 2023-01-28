<template>
	<div class="main__links links">
		<template v-if="linksList.length > 0">
			<link-grid-item
				v-for="linkItem in linksList"
				:linkItem="linkItem.attributes"
				:key="linkItem.id"
				:id-link="linkItem.id"
				:id-category="menuStore.idCategory"
				@refresh="refreshLinks"
			></link-grid-item>
		</template>
		<div class="links__item addlink" @click="openDialogLinkAdd">
			<div class="addlink__url">
				<div class="addlink__img">
					<svg
						width="97"
						height="97"
						viewBox="0 0 97 97"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle cx="48.5" cy="48.5" r="48" stroke="#242730" />
						<rect x="31" y="48" width="35" height="2" fill="#E7E7F1" />
						<rect
							x="47.5"
							y="65.5"
							width="35"
							height="2"
							transform="rotate(-90 47.5 65.5)"
							fill="#E7E7F1"
						/>
					</svg>
				</div>
				<div class="addlink__body">
					<div class="addlink__title">Добавить</div>
					<div class="addlink__desc">Добавить закладку</div>
				</div>
			</div>
		</div>
		<link-add
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
import LinkGridItem from './LinkGridItem.vue';
import LinkAdd from './LinkAdd.vue';
import links from '@/service/endpoints/links';

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

const getLinks = async (id) => {
	await links
		.getLinks(id)
		.then((response) => {
			//	console.log(response.data.data.attributes.links.data);
			return response.data.data.attributes.links.data;
		})
		.catch((error) => console.log(error));
};

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
