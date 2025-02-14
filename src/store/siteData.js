import { defineStore } from "pinia";

const useSiteDataStore = defineStore("siteData", {
  state: () => {
    return {
      // 站点标题
      siteTitle: "SPlayer",
      // 封面主题色
      songPicColor: "rgb(128,128,128)",
    };
  },
  getters: {},
  actions: {},
  // 开启数据持久化
  persist: [
    {
      storage: localStorage,
      paths: [""],
    },
  ],
});

export default useSiteDataStore;
