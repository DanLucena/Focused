<template>
  <div>
    <div :class="`w-14 h-14 rounded-md bg-neutral-100 flex justify-center items-center shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2)] ${isFocused}`">
      <span :class="`text-3xl text-neutral-600 ${focusColor}`">{{formattedNumber}}</span>
    </div>
    <div :class="`w-full flex justify-center ${focusColor}`">
      <span>{{labelTimer}}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    timerType: {
      type: String,
      required: true
    },
    timerNumber: {
      type: Number,
      required: true
    },
    labelTimer: {
      type: String,
      required: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
    formattedNumber() {
      if(this.timerNumber < 10) return `0${this.timerNumber}`
      return `${this.timerNumber}`
    },
    hours() {
      return Math.floor(this.count / 3600);
    },
    minutes() {
      return Math.floor((this.count % 3600) / 60);
    },
    seconds() {
      return this.count % 60;
    },
    isHourBiggerThanZero() {
      return this.timerType == 'Hours' && this.hours > 0
    },
    isMinutesBiggerThanZero() {
      return this.timerType == 'Minutes' && (this.minutes > 0 || this.hours > 0);
    },
    isSecondsBiggerThanZero() {
      return this.timerType == 'Seconds' && (this.minutes > 0 || this.hours > 0 || this.seconds > 0)
    },
    focusColor() {
      if(this.isHourBiggerThanZero) return 'text-violet-600';
      if(this.isMinutesBiggerThanZero) return 'text-violet-600';
      if(this.isSecondsBiggerThanZero) return 'text-violet-600';
      return ''
    },
    isFocused() {
      if(this.timerType == 'Times') return '';
      if(this.isHourBiggerThanZero) return 'border-[2px] border-violet-400';
      if(this.isMinutesBiggerThanZero) return 'border-[2px] border-violet-400';
      if(this.isSecondsBiggerThanZero) return 'border-[2px] border-violet-400';
      return ''
    },
    ...mapState(['count'])
  }
}

</script>

<style>
@import '../style/global.css';
</style>
