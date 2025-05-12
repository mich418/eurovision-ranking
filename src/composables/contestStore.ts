import { ref, watch, computed } from "vue"
import currentContenstDataJSON from "@/data/2025.json"
import { LOCAL_STORAGE_SAVED_DATA_KEY } from "@/variables/const"
import type { SavedData } from "@/types/SavedData.type"
import type { SongData } from "@/types/SongData.type"
import type { ContestData } from "@/types/ContestData.type"
import type { Stage } from "@/types/Stage.type"

const year = 2025

const currentContenstData = currentContenstDataJSON as ContestData

const contestData = (() => {
  const localStorageRankingDataJSON = localStorage.getItem(LOCAL_STORAGE_SAVED_DATA_KEY)
  let userRankingData = {
    [year]: {
      semi1: [],
      semi2: [],
      final: []
    }
  }

  if (localStorageRankingDataJSON) {
    const localStorageRankingData: SavedData = JSON.parse(localStorageRankingDataJSON)

    userRankingData = {
      ...userRankingData,
      ...localStorageRankingData
    }
  }

  let semi1Songs: SongData[] = []
  let semi2Songs: SongData[] = []
  let finalSongs: SongData[] = []

  for (const countryCode of userRankingData[year].semi1) {
    const songIndex = currentContenstData.semi1.songs.findIndex((song) => song.country_code === countryCode)

    if (songIndex !== -1) {
      const [song] = currentContenstData.semi1.songs.splice(songIndex, 1)
      semi1Songs.push(song)
    }
  }

  semi1Songs = [...semi1Songs, ...currentContenstData.semi1.songs]

  for (const countryCode of userRankingData[year].semi2) {
    const songIndex = currentContenstData.semi2.songs.findIndex((song) => song.country_code === countryCode)

    if (songIndex !== -1) {
      const [song] = currentContenstData.semi2.songs.splice(songIndex, 1)
      semi2Songs.push(song)
    }
  }

  semi2Songs = [...semi2Songs, ...currentContenstData.semi2.songs]

  for (const countryCode of userRankingData[year].final) {
    const songIndex = currentContenstData.final.songs.findIndex((song) => song.country_code === countryCode)

    if (songIndex !== -1) {
      const [song] = currentContenstData.final.songs.splice(songIndex, 1)
      finalSongs.push(song)
    }
  }

  finalSongs = [...finalSongs, ...currentContenstData.final.songs]

  return ref<ContestData>({
    semi1: {
      ...currentContenstData.semi1,
      songs: semi1Songs
    },
    semi2: {
      ...currentContenstData.semi2,
      songs: semi2Songs
    },
    final: {
      ...currentContenstData.final,
      songs: finalSongs
    }
  })
})();

const selectedStage = (() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const semi1Date = new Date(currentContenstData.semi1.date)
  const semi2Date = new Date(currentContenstData.semi2.date)
  let stage: Stage

  if (today > semi2Date && currentContenstData.final.songs.length > 0) {
    stage = "final"
  } else if (today > semi1Date) {
    stage ="semi2"
  } else {
    stage ="semi1"
  }

  return ref<Stage>(stage)
})()

watch(
  contestData,
  (newData) => {
    localStorage.setItem(LOCAL_STORAGE_SAVED_DATA_KEY, JSON.stringify({
      [year]: {
        semi1: newData.semi1.songs.map((song) => song.country_code),
        semi2: newData.semi2.songs.map((song) => song.country_code),
        final: newData.final.songs.map((song) => song.country_code)
      }
    }))
  },
  { deep: true }
)

const useContestStore = () => {
  return {
    year,
    contestData,
    selectedStage,
  }
} 

export default useContestStore
