import { ref, watch } from "vue";
import type { ContestData } from "@/types/ContestData.type";
import defaultContestData from "@/data/2024.json";

const contestData = (() => {
  const localStorageDataJson = localStorage.getItem("contestData");

  if (localStorageDataJson) {
    return ref<ContestData>(JSON.parse(localStorageDataJson))
  }

  return ref<ContestData>(defaultContestData)}
)();

watch(
  contestData,
  (newData) => {
    localStorage.setItem("contestData", JSON.stringify(newData))
  },
  { deep: true }
)

const useContestStore = () => {
  return {
    contestData
  }
} 

export default useContestStore
