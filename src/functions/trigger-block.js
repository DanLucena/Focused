class PageBlocker {
  static instance;

  static getInstance() {
    if(this.instance){
      this.instance.getUpdateBlockingUrls();
      return this.instance;
    }

    this.instance = new PageBlocker();
    this.instance.getUpdateBlockingUrls();

    return this.instance;
  }

  getUpdateBlockingUrls() {
    chrome.storage.local.get('blockedPages', (result) => {
      if(Object.keys(result).length === 0) {
        this.urlBlock = [];
      } else {
        this.urlBlock = Object.values(result.blockedPages);
      }
    });
  }

  extractDomain(url) {
    if(!url) return;

    const domain = url.replace('http://', '').replace('https://', '').split(/[/?#]/)[0];
    return domain;
  }

  blockPage() {
    const reference = this;

    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        let urls = reference.urlBlock.includes(reference.extractDomain(tab.url));
        if(urls){
          chrome.tabs.sendMessage(tab.id, {type: 'vai'});
        }
      });
    });
  }

  unblockPage(time) {
    chrome.tabs.query({}, function(tabs) {
      tabs.forEach(function(tab) {
        chrome.tabs.sendMessage(tab.id, {type: 'volta', time: time});
      });
    });
  }
}

export { PageBlocker }