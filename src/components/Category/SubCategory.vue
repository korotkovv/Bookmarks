<template>
	<div class="main__subcategory subcategory">
		<ul class="subcategory__list">
			<template v-if="subCat">
				<li
					v-for="item in subCat"
					:key="item.id"
					class="subcategory__item"
					:class="item.id === menuStore.idCategory ? 'active' : ''"
					:id="item.id"
					@click="getCatId(item.id, item.attributes.title)"
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

<script setup>
import { onMounted, computed, ref } from 'vue';
import { useMenuStore } from '@/stores/menu';
import { useSettingStore } from '@/stores/settings';

const settingStore = useSettingStore();
const menuStore = useMenuStore();

const isLoading = ref(false);

const subCat = computed(() => {
	if (menuStore.slug) {
		const res = menuStore.menu.filter(
			(item) => item.attributes.slug === menuStore.slug
		);
		const sub = res[0]?.attributes.categoties.data;
		const links = res[0]?.attributes.links.data;
		const id = res[0]?.id;
		const name = res[0]?.attributes.title;
		//	console.log('name', name);
		if (Array.isArray(sub) && sub.length > 0) {
			menuStore.setIdCategory(sub[0].id);
			menuStore.setNameCategory(sub[0]?.attributes.title);
			if (Array.isArray(links) && links.length > 0) {
				const findItem = sub.find((el) => el.attributes.title === 'Общее');
				//		console.log('findItem', findItem);
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
			menuStore.setIdCategory(id);
			menuStore.setNameCategory(name);
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
});

const addToaster = () => {
	settingStore.addToast('error', 'новый тостер подоспел');
};

const getCatId = (id, name) => {
	menuStore.setIdCategory(id);
	menuStore.setNameCategory(name);
};

onMounted(() => {
	isLoading.value = true;
});
</script>

<style lang="scss" scoped></style>
