<template>
	<div class="main__links links">
		<template v-if="linksList.length > 0">
			<link-grid-item
				v-for="linkItem in linksList"
				:linkItem="linkItem.attributes"
				:key="linkItem.id"
				:id-link="linkItem.id"
				:id-category="idCategory"
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
			:id-category="idCategory || 1"
			:is-open="dialogLinkAdd.status"
			@success="dialogYes"
			@close="dialogClose"
		></link-add>
	</div>
</template>

<script>
import { mapState } from 'pinia';
import { useMenuStore } from '@/stores/menu';
import LinkGridItem from './LinkGridItem.vue';
import LinkAdd from './LinkAdd.vue';
import links from '@/service/endpoints/links';

export default {
	emits: ['refresh'],
	props: {
		linksList: {
			type: Array,
			required: false,
			default: [],
		},
	},
	data: () => ({
		isOpenAddLink: true,
		dialogLinkAdd: {
			status: false,
		},
		dialogLink: false,
	}),

	computed: {
		...mapState(useMenuStore, ['idCategory']),
	},

	methods: {
		async getLinks(id) {
			this.newLinkList = await links
				.getLinks(id)
				.then((response) => {
					//	console.log(response.data.data.attributes.links.data);
					return response.data.data.attributes.links.data;
				})
				.catch((error) => console.log(error));
		},

		openDialogLinkAdd() {
			this.dialogLinkAdd.status = true;
		},
		dialogClose() {
			this.dialogLinkAdd.status = false;
			//	this.dialogLinkAdd.idCategory = 2;
		},
		dialogYes() {
			this.dialogLinkAdd.status = false;
			//this.dialogLinkAdd.idCategory = 2;
			this.$emit('refresh');
		},
		refreshLinks() {
			this.$emit('refresh');
		},
	},

	mounted() {
		//	console.log(this.linksList);
	},

	components: {
		LinkGridItem,
		LinkAdd,
	},
};
</script>

<style lang="scss" scoped></style>
