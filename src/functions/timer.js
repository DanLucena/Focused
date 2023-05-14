class Timer {
  static instance;

  static getInstance() {
    if(this.instance) return this.instance;

    this.instance = new Timer();
    return this.instance;
  }

  insertTimer(receivedTime) {
    this.timer = receivedTime;
  }

  updateTimer() {
    this.timer -= 1;

    chrome.runtime.sendMessage({ type: 'timer-update', timer: this.timer });
    chrome.storage.local.set({ 'timerPreset': this.timer });

    if(this.timer == 0) this.cleanTimer();
  }

  cleanTimer() {
    chrome.alarms.clear('timer');

    chrome.storage.local.set({ 'isActivated': false });
    chrome.runtime.sendMessage({ type: 'is-active', isActive: false });

    chrome.storage.local.remove('timerPresetSelected');
    chrome.runtime.sendMessage({ type: 'remove-timer-preset' });
  }

  resetTimer() {
    this.cleanTimer();

    chrome.runtime.sendMessage({ type: 'timer-update', timer: 0 });
    chrome.storage.local.set({ 'timerPreset': 0 });
  }
}

export { Timer }