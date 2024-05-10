<template>
  <div class="country-row">
    <div
      class="country-row__place"
      :class="[`country-row__place--${selectedPlace}`]"
    >
      <div class="country-row__place-inner">
        {{ selectedPlace }}
      </div>
    </div>
    <div class="country-row__flag-wrapper">
      <span :class="`country-row__flag fi fis fi-${songData.country_code.toLocaleLowerCase() }`"></span>
    </div>
    <div class="country-row__song-info">
      <span class="country-row__country-name">{{ songData.country }}</span>
      <span class="country-row__song">{{ songData.song }}</span>
      <span class="country-row__artist">by {{ songData.artist }}</span>
    </div>
    <div class="country-row__move">
      <span>MOVE</span>
      <select v-model="selectedPlace">
        <option
          v-for="place in places"
          :value="place"
          :disabled="place === selectedPlace"
        >
          {{ place }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineEmits } from 'vue';
import type { SongData } from '@/types/SongData.type';

const props = defineProps<{
  songData: SongData;
  place: number;
  places: number;
}>();

const emit = defineEmits<{
  moveSong: [number]
}>()

const selectedPlace = computed({
  get() {
    return props.place;
  },
  set(value: number) {
    emit('moveSong', value);
  },
});
</script>

<style lang="scss">
.country-row {
  background: linear-gradient(to right, #373b44, #4286f4);
  color: #fff;
  position: relative;
  padding: 0 15px 0 85px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__place {
    position: absolute;
    width: 85px;
    height: calc(100% + 10px);
    top: -5px;
    left: -15px;
    transform: skew(-15deg);
    box-shadow: 0 0 10px 0 #000;

    &--1 {
      background: linear-gradient(to right, #d1913c, #ffd194);
    }

    &--2 {
      background: linear-gradient(to right, #ededed, #bdbdbd);
    }

    &--3 {
      background: linear-gradient(to right, #ffa17f, #a7644b);
    }
  }

  &__place-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    transform: skew(15deg);
    padding-left: 10px;
  }

  &__flag-wrapper {
    width: 30px;
    height: 30px;
    flex: 0 0 30px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
  }

  &__flag {
    width: 30px !important;
    height: 30px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  &__song-info {
    padding: 10px 15px;
    width: calc(100% - 85px - 30px);
  }

  &__country-name {
    font-size: 12px;
    text-transform: uppercase;
    display: block;
    color: #ffd194;
    font-weight: 500;
  }

  &__song,
  &__artist {
    display: block;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__song {
    font-size: 16px;
    font-weight: 500;
  }

  &__artist {
    font-size: 12px;
  }

  &__move {
    width: 75px;
    height: 40px;
    border-radius: 20px;
    background: linear-gradient(to right, #d1913c, #ffd194);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    select {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
  }
}
</style>