<template>
  <div class="h-full flex flex-col">
    <timer-counter />
    <div class="px-5">
      <div class="flex py-5 items-center">
        <div class="flex-grow border-t border-neutral-200"></div>
      </div>
    </div>
    <presets-timer />
    <div class="mx-4 flex gap-2 mt-auto mb-10">
      <div class="h-5 w-2/4">
        <button :disabled="isDisabled" :class="`w-full h-10 bg-neutral-300 rounded bg-violet-400 text-base font-medium transition duration-150 text-white ${buttonStatus}`" @click="changeButtonState">{{buttonText}}</button>
      </div>
      <div class="h-5 w-2/4">
        <button :class="`w-full h-10 bg-stone-200 rounded text-base ${resetStatus}`" @click="resetButton">{{ $t('timer.buttons.reset') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import TimerCounter from '@/components/TimerCounter.vue'
import PresetsTimer from '@/components/PresetsTimer.vue'

export default {
  components: { TimerCounter, PresetsTimer },
  data () {
    return {
      isRunning: undefined,
      isResetPressed: false,
      isDisabled: false,
    }
  },
  created() {
    chrome.runtime.sendMessage({ type: 'get-active' });

    chrome.runtime.onMessage.addListener((request) => {
      if (request.type === 'is-active') {
        this.isRunning = request.isActive
      }
    });
  },
  methods: {
    changeButtonState() {
      const vm = this;
      chrome.storage.local.get('timerPreset', function(result) {
        if(result.timerPreset == 0) return;
        vm.isRunning = !vm.isRunning;

        let audio = new Audio(`https://dl.sndup.net/n29f/click.mp3`);
        audio.play();

        if(vm.isRunning) {
          chrome.alarms.create('timer', {
            delayInMinutes: 0.01,
            periodInMinutes: 0.01
          });
          chrome.storage.local.set({ 'isActivated': true });
        } else {
          chrome.runtime.sendMessage({ type: 'clean-timer' });
          chrome.storage.local.set({ 'isActivated': false });
        }
      });
    },
    resetButton() {
      chrome.runtime.sendMessage({ type: 'reset' });
      this.isResetPressed = true;
      setTimeout(() => { this.isResetPressed = false }, 150);
    }
  },
  computed: {
    buttonStatus() {
      if(this.isRunning) return 'mt-1';
      return 'shadow-[0_4px_0_rgba(0,0,0,0.15)]'
    },
    resetStatus() {
      if(this.isResetPressed) return 'mt-1';
      return 'shadow-[0_4px_0_rgba(0,0,0,0.15)]'
    },
    buttonText() {
      if(this.isRunning) return this.$t('timer.buttons.stop');
      return this.$t('timer.buttons.start');
    },
  }
}
</script>
