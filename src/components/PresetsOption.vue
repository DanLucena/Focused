<template>
  <div class="max-h-5">
    <div :class="`flex bg-neutral-100 py-1 px-[12px] rounded cursor-pointer ${isActiveStyling} ${buttonStatus}`">
      <span>{{hours}}:{{minutes}}:{{seconds}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    presetValue: {
      type: Number,
      required: true
    },
    presetActive: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      isActive: false,
    }
  },
  computed: {
    buttonStatus() {
      if(this.presetActive) return 'mt-1';
      return 'shadow-[0_4px_0_rgba(0,0,0,0.15)]'
    },
    isActiveStyling() {
      if(this.isActive) return 'border-2 border-violet-400'
      return ''
    },
    hours() {
      const hour = Math.floor(this.presetValue / 3600);

      if(hour >= 10) return hour
      return `0${hour}`
    },
    minutes() {
      const minutes = Math.floor((this.presetValue % 3600) / 60);

      if(minutes >= 10) return minutes;
      return `0${minutes}`;
    },
    seconds() {
      const seconds = this.presetValue % 60;

      if(seconds >= 10) return seconds;
      return `0${seconds}`;
    }
  }
}
</script>

<style>
@import '../style/global.css';
</style>
