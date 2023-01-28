<template>
	<div class="toaster" v-if="settingStore.toasterList.length > 0">
		<div class="toaster__list">
			<toaster-item
				v-for="(item, idx) in settingStore.toasterList"
				:key="idx"
				:type="item.type"
				:text="item.text"
				@close-toast="settingStore.closeToast(idx)"
			></toaster-item>
		</div>
	</div>
</template>

<script setup>
import { useSettingStore } from '@/stores/settings';
import ToasterItem from '@/components/Toaster/ToasterItem.vue';

const settingStore = useSettingStore();
</script>

<style lang="scss" scoped></style>
