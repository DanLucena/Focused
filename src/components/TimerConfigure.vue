<template>
  <div class="flex flex-col py-2 px-4">
    <div class="flex justify-between">
      <h1 class="text-base">{{ $t('config.labels.settings') }}</h1>
      <button @click="backToCounter">{{ $t('config.buttons.back') }}</button>
    </div>
    <div class="mt-4">
      <div class="flex items-center justify-between mt-4">
        <span class="text-sm font-medium">{{ $t('config.labels.block') }}</span>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" class="sr-only peer" :checked="config.blockPages" v-model="config.blockPages">
          <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-400"></div>
        </label>
      </div>
      <div class="flex items-center justify-between mt-4">
        <span class="text-sm font-medium text-neutral-400">{{ $t('config.labels.theme') }}</span>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" class="sr-only peer" :checked="config.darkTheme" v-model="config.darkTheme" disabled>
          <div class="w-11 h-6 bg-neutral-200 rounded-full peer dark:bg-neutral-200 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-400"></div>
        </label>
      </div>
      <div class="flex items-center justify-between mt-4">
        <span class="text-sm font-medium">{{ $t('config.labels.language') }}</span>
        <select name="select" v-model="config.language">
          <option value="pt">Português</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
    <div class="w-full mt-4 h-10">
      <button :class="`w-full bg-violet-400 h-10 py-2 text-white rounded ${isSaveClickedAnimation}`" @click="saveConfigures">{{ $t('config.buttons.save') }}</button>
    </div>
    <div class="w-full h-[1px] bg-neutral-200 my-4"></div>
    <div :class="`w-11/12 absolute bottom-4 bg-violet-400 rounded p-2 flex text-white items-center ${firstLoading}`">
      <img src="@/assets/solar_confetti-bold.svg" alt="" />
      <span class="ml-3">{{ $t('snackBar.success') }}</span>
    </div>
    <blocked-domains-list />
  </div>
</template>

<script>
import BlockedDomainsList from './BlockedDomainsList.vue';
import { GlobalConfig } from '../functions/global-config.js';

export default {
  components: { BlockedDomainsList },
  data() {
    return {
      globalConfigure: GlobalConfig.getInstance(),
      isSnackBarVisible: true,
      isSavedClicked: false,
      firstLoading: 'left-[25rem]',
      config: {
        notifications: true,
        blockPages: true,
        darkTheme: true,
        language: 'en',
      }
    }
  },
  methods: {
    backToCounter() {
      this.$emit('back');
    },
    saveConfigures() {
      this.saveAnimation();
      this.globalConfigure.setConfigures(this.config);
      this.$i18n.locale = this.config.language;
      this.firstLoading = 'move-right left-0 right-0 mx-auto';

      setTimeout(()=> {
        this.firstLoading = 'move-left left-[25rem]';
      }, 2000);

    },
    saveAnimation() {
      this.isSavedClicked = true;

      setTimeout(()=> {
        this.isSavedClicked = false;
      }, 150);
    }
  },
  computed: {
    isSaveClickedAnimation() {
      if(this.isSavedClicked) return 'mt-1';
      return 'shadow-[0_4px_0_rgba(0,0,0,0.15)]'
    }
  },
  async mounted() {
    this.config = {
      notifications: await this.globalConfigure.getNotificationsStatus(),
      blockPages: await this.globalConfigure.getBlockPagesStatus(),
      darkTheme: await this.globalConfigure.getDarkThemeStatus(),
      language: await this.globalConfigure.getLanguageStatus()
    }
  },
}
</script>

<style scoped>
@import '../style/global.css';
</style>