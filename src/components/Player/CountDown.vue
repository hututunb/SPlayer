<template>
  <Transition mode="out-in" appear>
    <div
      class="countdown"
      :style="{ animationPlayState: music.getPlayState ? 'running' : 'paused' }"
      v-if="
        remainingPoint <= 2 &&
        totalDuration > 3 &&
        music.getPlaySongLyric.lrc[0]
      "
    >
      <span class="point" :class="remainingPoint > 2 ? 'hidden' : null">●</span>
      <span class="point" :class="remainingPoint > 1 ? 'hidden' : null">●</span>
      <span class="point" :class="remainingPoint > 0 ? 'hidden' : null">●</span>
    </div>
  </Transition>
</template>

<script setup>
import { musicStore } from "@/store";

const music = musicStore();

// 剩余点数
const remainingPoint = ref(0);
// 总时长
const totalDuration = ref(
  music.getPlaySongLyric.hasYrc
    ? music.getPlaySongLyric?.yrc[0].time
    : music.getPlaySongLyric?.lrc[0].time
);

// 监听歌曲时长变化
watch(
  () => music.getPlaySongTime.currentTime,
  (val) => {
    if (music.getPlaySongLyric.lrc[0]) {
      const remainingTime = totalDuration.value - val - 0.5;
      const progress = 1 - remainingTime / totalDuration.value;
      remainingPoint.value = Number(Math.floor(3 * progress));
    }
  }
);

// 监听歌曲改变
watch(
  () => music.getPlaySongLyric?.lrc,
  (val) => {
    if (music.getPlaySongLyric.lrc[0]) {
      totalDuration.value = music.getPlaySongLyric.hasYrc
        ? music.getPlaySongLyric?.yrc[0].time
        : val[0].time;
      remainingPoint.value = 0;
    }
  }
);
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scale(0);
}
.countdown {
  animation: breathe 5s ease-in-out infinite;
  .point {
    margin-right: 4px;
    transition: all 0.3s;
    &.hidden {
      opacity: 0.2;
    }
  }
}
@keyframes breathe {
  0% {
    transform: scale(0.95);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(0.95);
  }
}
</style>
