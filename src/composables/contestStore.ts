import { ref, watch, computed } from "vue";
import type { ContestData } from "@/types/ContestData.type";
import defaultContestData from "@/data/2024.json";
import type { SongData } from "@/types/SongData.type";

const contestData = (() => {
  const localStorageRankingData = localStorage.getItem("rankingData");
  const finalSongs = defaultContestData.final.filter(song => !song.disqualified);

  if (localStorageRankingData) {
    const rankingData = JSON.parse(localStorageRankingData);

    const final = rankingData.final.map((country_code: string) => {
      return finalSongs.find((song) => song.country_code === country_code)
    }).filter((song: any) => song !== undefined)

    return ref<ContestData>({ final })
  }

  // Just in case someone has the old localStorage data
  const localStorageDataJson = localStorage.getItem("contestData");

  if (localStorageDataJson) {
    return ref<ContestData>({
      final: JSON.parse(localStorageDataJson).final.map(({country_code}: SongData) => {
        return finalSongs.find((song) => song.country_code === country_code)
      }).filter((song: any) => song !== undefined)
    })
  }

  return ref<ContestData>(defaultContestData)}
)();

watch(
  contestData,
  (newData) => {
    localStorage.setItem("rankingData", JSON.stringify({
      final: newData.final.map(song => song.country_code)
    }))
  },
  { deep: true }
)

const useContestStore = () => {
  return {
    contestData,
    disqualifiedSongs: computed(() => defaultContestData.final.filter(song => song.disqualified))
  }
} 

export default useContestStore
