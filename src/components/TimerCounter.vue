<template>
  <div class="w-full items-center flex flex-col">
    <div class="w-full mb-4 mt-3">
      <p class="ml-4 text-sm font-medium">{{ $t('timer.title') }}</p>
    </div>
    <div class="flex w-full pl-6 pr-3">
      <timer-digit :labelTimer="$t('timer.labels.times')" timerType="Times" :timerNumber="times" />
      <div class="h-4/6 mt-2 bg-neutral-200 w-[1px] mx-auto"></div>
      <timer-digit class="mr-3" :labelTimer="$t('timer.labels.hour')" timerType="Hours" :timerNumber="hours" />
      <timer-digit :labelTimer="$t('timer.labels.minute')" timerType="Minutes" :timerNumber="minutes" />
      <timer-digit :labelTimer="$t('timer.labels.second')" class="mx-3" timerType="Seconds" :timerNumber="seconds" />
    </div>
  </div>
</template>

<script>
import TimerDigit from '@/components/TimerDigit.vue';
import { mapState } from 'vuex';

export default {
  components: { TimerDigit },
  data () {
    return {
      times: 0,
      interval: undefined
    }
  },
  created() {
    chrome.runtime.sendMessage({ type: 'get-actual-time' });
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === 'timer-update') {
        this.$store.commit('updateTimer', message.timer)
      }
    })
  },
  computed: {
    hours() {
      return Math.floor(this.count / 3600);
    },
    minutes() {
      return Math.floor((this.count % 3600) / 60);
    },
    seconds() {
      return this.count % 60;
    },
    ...mapState(['count'])
  },
}

</script>

<style>
@import '../style/global.css';
</style>
