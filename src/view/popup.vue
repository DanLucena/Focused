<template>
  <div class="w-96 h-[37rem] flex flex-col">
    <div class="relative">
      <icon-button class="absolute right-3 top-3" @click="changeConfigMode" />
      <img src="@/assets/output.gif" alt="">
    </div>
    <div :class="`absolute ${menuConfigStyle} bg-white flex flex-col h-[25rem]`">
      <timer-container v-if="!isConfigMode" />
      <div class="h-full w-screen flex flex-col" v-else>
        <timer-configure @back="changeConfigMode" />
      </div>
    </div>
  </div>
</template>

<script>
import IconButton from '@/components/IconButton.vue';
import TimerContainer from '@/components/TimerContainer.vue';
import TimerConfigure from '@/components/TimerConfigure.vue';
import { GlobalConfig } from '../functions/global-config.js';

export default {
  components: { IconButton, TimerContainer, TimerConfigure },
  name: 'popupView',
  data () {
    return {
      globalConfigure: GlobalConfig.getInstance(),
      isConfigMode: false
    }
  },
  methods: {
    changeConfigMode() {
      this.isConfigMode = !this.isConfigMode;
    }
  },
  computed: {
    menuConfigStyle() {
      if(this.isConfigMode) return 'move-up rounded-none h-full';
      return 'top-48 move-down rounded-t-xl'
    }
  },
  async mounted() {
    const test = await this.globalConfigure.getLanguageStatus();
    this.$i18n.locale = test;
  }
}

</script>

<style>
@import '../style/global.css';
</style>
