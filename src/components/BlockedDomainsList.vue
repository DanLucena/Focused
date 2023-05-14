<template>
  <div>
    <h1 class="text-sm font-medium mb-2">{{ $t('config.blockSection.title') }}</h1>
    <div class="w-full flex h-8 mb-5">
      <input type="text" class="border-2 rounded w-max flex-1 px-2" v-model="inputUrl" />
      <button class="bg-violet-400 px-2 py-1 rounded ml-2 text-white" @click="createNewBlock">{{ $t('config.buttons.add') }}</button>
    </div>
    <blocked-domain v-for="(domain, index) in domains" :key="index" :domainName="domain" @deleteDomain="removeDomain" />
  </div>
</template>

<script>
import BlockedDomain from './BlockedDomain.vue';
import { GlobalConfig } from '../functions/global-config.js';

export default {
  components: { BlockedDomain },
  data() {
    return {
      domains: [],
      globalConfig: undefined,
      inputUrl: undefined
    }
  },
  async mounted() {
    this.globalConfig = GlobalConfig.getInstance();
    this.domains = await this.globalConfig.getBlockedUrls();
    this.domains = Object.values(this.domains);
  },
  methods: {
    createNewBlock() {
      if(!this.inputUrl) return;

      const formattedUrl = this.extractDomain(this.inputUrl);
      this.domains.push(formattedUrl);
      chrome.storage.local.set({ 'blockedPages': this.domains });
      chrome.runtime.sendMessage({ type: 'update-blocking-links' });
    },
    extractDomain(url) {
      if(!url) return;

      const domain = url.replace('http://', '').replace('https://', '').split(/[/?#]/)[0];
      return domain;
    },
    removeDomain(domain) {
      this.domains = this.domains.filter(item => item !== domain);
      chrome.storage.local.set({ 'blockedPages': this.domains });
      chrome.runtime.sendMessage({ type: 'update-blocking-links' });
    }
  }
}
</script>
