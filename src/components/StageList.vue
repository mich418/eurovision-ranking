<template>
  <div class="stage-list">
    <CountryRow
      class="stage-list__country-row"
      v-for="(songData, index) in contestData[selectedStage].songs"
      :key="songData.country_code"
      :songData="songData"
      :place="index + 1"
      :places="contestData[selectedStage].songs.length"
      @moveSong="(newPlace) => changeSongIndex(index, newPlace - 1)"
    />
  </div>
</template>

<script setup lang="ts">
import CountryRow from '@/components/CountryRow.vue'
import useContestStore from '@/composables/contestStore'
import type { SongData } from '@/types'

const { contestData, selectedStage } = useContestStore()

const changeSongIndex = (oldIndex: number, newIndex: number) => {
  const songToMove = contestData.value[selectedStage.value].songs.splice(oldIndex, 1)
  contestData.value[selectedStage.value].songs.splice(newIndex, 0, ...songToMove)
}
</script>

<style lang="scss">
.stage-list {
  &__country-row {
    &:not(:last-child) {
      margin-bottom: 1px;
    }
  }
}
</style>
