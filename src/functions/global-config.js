class GlobalConfig {
  static instance;

  static getInstance() {
    if(this.instance) return this.instance;
    this.instance = new GlobalConfig();

    return this.instance;
  }

  getBlockedUrls() {
    return new Promise((resolve) => {
      chrome.storage.local.get('blockedPages', (result) => {
        if (Object.keys(result).length === 0) resolve([]);
        resolve(result.blockedPages);
      });
    });
  }

  getNotificationsStatus() {
    return new Promise((resolve) => {
      chrome.storage.local.get('notificationStatus', (result) => {
        if (Object.keys(result).length === 0) resolve(true);
        resolve(result.notificationStatus);
      });
    });
  }

  getBlockPagesStatus() {
    return new Promise((resolve) => {
      chrome.storage.local.get('blockPageStatus', (result) => {
        if (Object.keys(result).length === 0) resolve(true);
        resolve(result.blockPageStatus);
      });
    });
  }

  getDarkThemeStatus() {
    return new Promise((resolve) => {
      chrome.storage.local.get('darkThemeStatus', (result) => {
        if (Object.keys(result).length === 0) resolve(false);
        resolve(result.darkThemeStatus);
      });
    });
  }

  getLanguageStatus() {
    return new Promise((resolve) => {
      chrome.storage.local.get('languageStatus', (result) => {
        if (Object.keys(result).length === 0) resolve('en');
        resolve(result.languageStatus);
      });
    });
  }

  setConfigures(configs) {
    chrome.storage.local.set({ 'notificationStatus': configs.notifications });
    chrome.storage.local.set({ 'blockPageStatus': configs.blockPages });
    chrome.storage.local.set({ 'darkThemeStatus': configs.darkTheme });
    chrome.storage.local.set({ 'languageStatus': configs.language });
  }
}

export { GlobalConfig }