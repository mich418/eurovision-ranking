<template>
  <div class="stage-select">
    <label
      v-for="option in stageOptions"
      :key="option.value"
      class="stage-select__option"
    >
      <input
        type="radio"
        name="stage"
        :value="option.value"
        v-model="selectedStage"
        :disabled="option.disabled"
      />
      <span class="stage-select__name">{{ option.name }}</span>
      <small class="stage-select__date">{{ option.date }}</small>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useContestStore from '@/composables/contestStore'
import type { Stage } from "@/types/Stage.type"

const { contestData, selectedStage } = useContestStore()

const stageOptions: {name: string, date: string, value: Stage, disabled?: boolean} = [
  {
    name: 'Semi-Final 1',
    value: 'semi1',
    date: new Date(contestData.value.semi1.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
  },
  {
    name: 'Semi-Final 2',
    value: 'semi2',
    date: new Date(contestData.value.semi2.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
  },
  {
    name: 'Final',
    value: 'final',
    date: new Date(contestData.value.final.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
    disabled: !contestData.value.final.songs.length
  }
]

</script>

<style lang="scss">
.stage-select {
  $root: &;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  padding-bottom: 4px;

  input {
    display: none;
  }

  &__option {
    background: linear-gradient(to right, rgb(55 59 68 / 80%), rgb(66 134 244 / 80%));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    padding: 5px 10px;
    position: relative;
    cursor: pointer;

    &:has(input:checked) {
      background: linear-gradient(to right, rgb(55, 59, 68), rgb(66, 134, 244));

      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 3px;
        background: linear-gradient(to right, rgb(55, 59, 68), rgb(66, 134, 244));
        bottom: -4px;
      }
    }

    &:has(input:disabled) {
      background: linear-gradient(to right, rgb(195, 195, 195), rgb(222, 221, 221));
      cursor: not-allowed;
    }
  }
}
</style>