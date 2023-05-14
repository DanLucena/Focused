<template>
  <div class="flex flex-col">
    <p class="ml-4 text-sm font-medium">{{ $t('presetSection.title') }}</p>
    <div class="flex ml-4 mr-4 mt-1 flex-wrap gap-x-2 gap-y-4">
      <presets-option v-for="(presetValue, index) in presetValuesInSeconds"
        @click="checkPresetSelected(presetValue)"
        :key="index"
        :presetValue="presetValue.time"
        :presetActive="presetValue.active"
      />
    </div>
  </div>
</template>

<script>
import PresetsOption from '@/components/PresetsOption.vue';
import { mapMutations } from 'vuex';

export default {
  components: { PresetsOption },
  data () {
    return {
      presetValuesInSeconds: [
        { id:1, active: false, time: 3600 },
        { id:2, active: false, time: 2700 },
        { id:3, active: false, time: 1800 },
        { id:4, active: false, time: 900 },
        { id:5, active: false, time: 300 }
      ],
    }
  },
  created() {
    const vm = this;
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === 'remove-timer-preset') {
        vm.presetValuesInSeconds.forEach(item => item.active = false);
      }
    });

    chrome.storage.local.get('timerPresetSelected', function(result) {
      if(result && result.timerPresetSelected) {
        vm.presetValuesInSeconds.find(preset => preset.id == result.timerPresetSelected).active = true
      }
    });
  },
  methods: {
    checkPresetSelected(preset) {
      const vm = this;

      chrome.storage.local.get('timerPresetSelected', function(result) {
        if(result.timerPresetSelected != preset.id) {
          vm.changeButtonState(preset);
        }
      });
    },
    changeButtonState(preset) {
      let audio = new Audio(`assets/click.mp3`);
      audio.play();

      this.presetValuesInSeconds.forEach(item => item.active = false);
      preset.active = true;
      chrome.runtime.sendMessage({ type: 'preset-timer', timer: preset.time })
      this.setInitialState(preset.time);
      chrome.storage.local.set({ 'timerPresetSelected': preset.id });
    },
    ...mapMutations(['setInitialState'])
  }
}
</script>

<style>
@import '../style/global.css';
</style>
