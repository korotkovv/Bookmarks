<template>
	<div class="toaster" v-if="toasterList.length > 0">
		<div class="toaster__list">
			<toaster-item
				v-for="(item, idx) in toasterList"
				:key="idx"
				:type="item.type"
				:text="item.text"
				@close-toast="closeToast(idx)"
			></toaster-item>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useSettingStore } from '@/stores/settings';
import ToasterItem from '@/components/Toaster/ToasterItem.vue';

export default {
	name: 'ToasterList',

	data: () => ({
		//
	}),
	computed: {
		...mapState(useSettingStore, ['toasterList']),
	},
	methods: {
		...mapActions(useSettingStore, ['closeToast']),
	},

	components: {
		ToasterItem,
	},
};
</script>

<style lang="scss" scoped></style>
