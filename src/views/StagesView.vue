<template>
  <div class="stages-view">
    <StageSelect class="stages-view__select" />
    <StageList class="stages-view__list" />
  </div>
</template>

<script setup lang="ts">
import StageSelect from '@/components/StageSelect.vue'
import StageList from '@/components/StageList.vue'
</script>

<style lang="scss">
.stages-view {
  &__select {
    margin-bottom: 1px;
  }
}
</style>
