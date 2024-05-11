<template>
  <div
    class="country-row"
    :class="{
      'country-row--disqualified': disqualified
    }"
  >
    <div
      class="country-row__place"
      :class="[!disqualified && `country-row__place--${selectedPlace}`]"
    >
      <div class="country-row__place-inner">
        {{ disqualified ? '-' : selectedPlace }}
      </div>
    </div>
    <div class="country-row__flag-wrapper">
      <span :class="`country-row__flag fi fis fi-${songData.country_code.toLocaleLowerCase() }`"></span>
    </div>
    <div class="country-row__song-info">
      <span class="country-row__country-name">{{ songData.country }}{{ disqualified ? ' (Disqualified)' : '' }}</span>
      <span class="country-row__song">{{ songData.song }}</span>
      <span class="country-row__artist">by {{ songData.artist }}</span>
    </div>
    <div class="country-row__actions">
      <a
        v-if="songData.youtubeUrl"
        class="country-row__button country-row__button--youtube"
        :href="songData.youtubeUrl"
        target="_blank"
      >
        <img src="/youtube-app-white-icon.webp?url" alt="YouTube" />
      </a>
      <div class="country-row__button country-row__button--move">
        <select
          v-if="!disqualified && songData.country_code.toLocaleLowerCase() !== 'il'"
          v-model="selectedPlace"
        >
          <option disabled>
            Move to...
          </option>
          <option
            v-for="place in places - 1"
            :value="place"
            :disabled="place === selectedPlace"
          >
            {{ place }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineEmits } from 'vue';
import type { SongData } from '@/types/SongData.type';

const props = defineProps<{
  songData: SongData;
  place: number
  places: number
  disqualified?: boolean
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
  padding: 0 15px 0 80px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &--disqualified {
    filter: grayscale(0.8);
  }

  &__place {
    position: absolute;
    width: 80px;
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
    width: calc(100% - 90px - 30px);
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

  &__actions {
    width: 90px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: relative;

    &--move {
      background: linear-gradient(to right, #d1913c, #ffd194);
      margin-left: 10px;

      &:before,
      &:after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 10px solid #fff;
        left: 50%;
      }

      &:before {
        top: 8px;
        transform: translateX(-50%) rotate(180deg);
      }

      &:after {
        bottom: 8px;
        transform: translateX(-50%);
      }

      select {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
        z-index: 1;
      }
    }

    &--youtube {
      background: linear-gradient(to right, #93291e, #ed213a);

      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 24px;
        height: 24px;
        object-fit: contain;
      }
    }
  }
}
</style>