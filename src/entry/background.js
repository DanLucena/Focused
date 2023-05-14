import { GlobalConfig } from '../functions/global-config';
import { PageBlocker } from '../functions/trigger-block';
import { Timer } from '../functions/timer';
import { store } from '../storage/storage';

const timerService = Timer.getInstance();
const blocker = PageBlocker.getInstance();
const globalConfig = GlobalConfig.getInstance();

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== 'timer') return;

  const isBlockActive = await globalConfig.getBlockPagesStatus();
  if(blocker && isBlockActive) blocker.blockPage();

  chrome.storage.local.get('timerPreset', (result) => {
    timerService.insertTimer(result.timerPreset);
    timerService.updateTimer();

    if(timerService.timer == 0) blocker.unblockPage(timerService.timer);
  });
});

chrome.runtime.onMessage.addListener((message) => {
  if(message.type === 'clean-timer') {
    chrome.alarms.clear('timer');
    blocker.unblockPage(timerService.timer);
  }

  if (message.type === 'preset-timer') {
    store.commit('updateTimer', message.timer);
    chrome.storage.local.set({ 'timerPreset': message.timer });
  }

  if(message.type === 'get-active') {
    chrome.storage.local.get('isActivated', function(result) {
      chrome.runtime.sendMessage({ type: 'is-active', isActive: result.isActivated });
    });
  }

  if(message.type === 'get-actual-time') {
    chrome.storage.local.get('timerPreset', function(result) {
      if(result.timerPreset) {
        chrome.runtime.sendMessage({ type: 'timer-update', timer: result.timerPreset });
      } else {
        chrome.runtime.sendMessage({ type: 'timer-update', timer: 0 });
      }
    });
  }

  if(message.type === 'update-blocking-links') {
    blocker.getUpdateBlockingUrls();
  }

  if(message.type === 'reset') {
    chrome.storage.local.get('isActivated', function(result) {
      if(result.isActivated) return;
      timerService.resetTimer();
    });
  }
});