<template>
	<main class="main">
		<sub-category></sub-category>
		<div class="main__header">
			<div class="main__title">Docs</div>
			<div class="main__switcher switcher">
				<button
					class="switcher__grid"
					:class="switcher === 'grid' ? 'active' : ''"
					@click="switcherGridHandle"
				>
					<i class="lab la-buromobelexperte"></i>
				</button>
				<button
					class="switcher__list"
					:class="switcher === 'list' ? 'active' : ''"
					@click="switcherListHandle"
				>
					<i class="las la-list"></i>
				</button>
			</div>
		</div>
		<div class="main__body">
			<link-grid
				v-if="switcher === 'grid'"
				:linksList="linksList"
				@refresh="refreshLinksList"
			></link-grid>
			<link-list
				v-else="switcher === 'list'"
				:linksList="linksList"
				@refresh="refreshLinksList"
			></link-list>
			<the-widgets></the-widgets>
		</div>
	</main>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useSettingStore } from '@/stores/settings';
import { useMenuStore } from '@/stores/menu';
import TheWidgets from '@/components/Widgets/TheWidgets.vue';
import SubCategory from '@/components/Category/SubCategory.vue';
import LinkGrid from '@/components/Link/LinkGrid.vue';
import LinkList from '@/components/Link/LinkList.vue';
import links from '@/service/endpoints/links';

export default {
	name: 'HomeView',

	data: () => ({
		linksList: [],
	}),

	computed: {
		...mapState(useSettingStore, ['switcher']),
		...mapState(useMenuStore, ['slug', 'idCategory']),
	},

	methods: {
		/**
		 * Получаем список ссылок категории
		 * @param {number} id - ID Категории
		 */
		async getLinks(id) {
			this.linksList = await links
				.getLinks(id)
				.then((response) => {
					//	console.log(response.data.data.attributes.links.data);
					return response.data.data.attributes.links.data;
				})
				.catch((error) => console.log(error));
		},
		...mapActions(useSettingStore, [
			'switcherGridHandle',
			'switcherListHandle',
		]),
		refreshLinksList() {
			this.getLinks(this.idCategory);
		},
		...mapActions(useMenuStore, ['setSlug']),
	},
	mounted() {
		this.setSlug(this.$route.params.slug);
	},

	watch: {
		'$router.currentRoute.value.params.slug': {
			handler: function () {
				this.setSlug(this.$route.params.slug);
			},
		},
		idCategory() {
			if (this.idCategory) {
				this.getLinks(this.idCategory);
			}
		},
	},

	components: {
		TheWidgets,
		SubCategory,
		LinkGrid,
		LinkList,
	},
};
</script>

<style lang="scss" scoped></style>
