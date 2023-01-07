<template>
	<div class="main__subcategory subcategory">
		<ul class="subcategory__list">
			<template v-if="subCat">
				<li
					v-for="item in subCat"
					:key="item.id"
					class="subcategory__item"
					:class="item.id === idCategory ? 'active' : ''"
					:id="item.id"
					@click="getCatId(item.id)"
				>
					<span class="subcategory__link">
						<i
							:class="
								item.attributes.icon ? item.attributes.icon : 'las la-code'
							"
						></i>
						{{ item.attributes.title }}
					</span>
				</li>
			</template>

			<li class="subcategory__add" @click="addToaster">
				<i class="las la-plus"></i> <span>Добавить</span>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useMenuStore } from '@/stores/menu';
import { useSettingStore } from '@/stores/settings';

export default {
	name: 'SubCategory',
	data: () => ({
		isLoading: false,
	}),
	computed: {
		subCat() {
			if (this.slug) {
				const res = this.menu.filter(
					(item) => item.attributes.slug === this.slug
				);
				const sub = res[0]?.attributes.categoties.data;
				const links = res[0]?.attributes.links.data;
				const idMain = res[0]?.id;
				const id = res[0]?.id;
				console.log(idMain);

				if (Array.isArray(sub) && sub.length > 0) {
					this.setIdCategory(sub[0].id);
					if (Array.isArray(links) && links.length > 0) {
						const findItem = sub.find((el) => el.attributes.title === 'Общее');
						console.log('findItem', findItem);
						if (!findItem)
							sub.push({
								id: id,
								attributes: {
									icon: 'las la-code',
									title: 'Общее',
								},
							});
					}
					return sub;
				} else {
					this.setIdCategory(id);
					return [
						{
							id: id,
							attributes: {
								icon: 'las la-code',
								title: 'Общее',
							},
						},
					];
				}
			}
			return false;
		},

		...mapState(useMenuStore, ['menu', 'idCategory', 'slug']),
	},
	methods: {
		addToaster() {
			this.addToast('error', 'новый тостер подоспел');
		},

		getCatId(id) {
			this.setIdCategory(id);
		},
		...mapActions(useMenuStore, ['getSubCategoryMenu', 'setIdCategory']),
		...mapActions(useSettingStore, ['addToast']),
	},
	created() {
		this.isLoading = true;
	},
	mounted() {},
	watch: {},
};
</script>

<style lang="scss" scoped></style>
