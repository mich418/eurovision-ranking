<template>
  <div class="final-view">
    <CountryRow
      class="final-view__country-row"
      v-for="(songData, index) in contestData.final"
      :key="songData.country_code"
      :songData="songData"
      :place="index + 1"
      :places="contestData.final.length"
      @moveSong="(newPlace) => changeSongIndex(index, newPlace - 1)"
    />
    <CountryRow
      class="final-view__country-row"
      v-for="(songData, index) in disqualifiedSongs"
      :key="songData.country_code"
      :songData="songData"
      :place="index + 1"
      :places="contestData.final.length"
      :disqualified="true"
    />
  </div>
</template>

<script setup lang="ts">
import CountryRow from '@/components/CountryRow.vue'
import useContestStore from '@/composables/contestStore'

const { contestData, disqualifiedSongs } = useContestStore()

console.log(disqualifiedSongs);

const changeSongIndex = (oldIndex: number, newIndex: number) => {
  const songToMove = contestData.value.final.splice(oldIndex, 1)
  contestData.value.final.splice(newIndex, 0, ...songToMove)
}
</script>

<style lang="scss">
.final-view {
  &__country-row {
    &:not(:last-child) {
      margin-bottom: 1px;
    }
  }
}
</style>
