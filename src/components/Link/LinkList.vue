<template>
	<div class="main__links lists">
		<template v-if="linksList.length > 0">
			<link-list-item
				v-for="linkItem in linksList"
				:linkItem="linkItem.attributes"
				:key="linkItem.id"
				:id-link="linkItem.id"
				:id-category="idCategory"
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
import LinkListItem from './LinkListItem.vue';
import LinkAdd from './LinkAdd.vue';

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
	}),
	computed: {
		...mapState(useMenuStore, ['idCategory']),
	},

	methods: {
		openDialogLinkAdd() {
			this.dialogLinkAdd.status = true;
		},
		dialogClose() {
			this.dialogLinkAdd.status = false;
		},
		dialogYes() {
			this.dialogLinkAdd.status = false;
			this.$emit('refresh');
		},
		refreshLinks() {
			this.$emit('refresh');
		},
	},

	mounted() {
		//console.log(this.linksList);
	},

	components: {
		LinkListItem,
		LinkAdd,
	},
};
</script>

<style lang="scss" scoped></style>
