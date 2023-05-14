import { createApp } from 'vue';
import Blocker from '../view/blocker.vue';

chrome.runtime.onMessage.addListener((request) => {
  const alreadyHaveModal = !!document.getElementById('focused-blocker');
  const videos = document.getElementsByTagName('video');

  if (request.type === 'vai' && !alreadyHaveModal) {
    showModal();
    pauseAndMuteVideos(videos);
    document.body.style.overflow = 'hidden';
  }

  if(request.type === 'volta' && alreadyHaveModal) {
    unmuteVideos(videos);
    document.getElementById('focused-blocker').remove();
    document.body.style.overflow = 'auto';
  }
});

function showModal() {
  const div = document.createElement('div');
  div.id = 'focused-blocker';
  div.style.width = '100vw';
  div.style.height = '100vh';
  div.style.position = 'fixed';
  div.style.zIndex = '99999';
  div.style.top = '0';

  document.body.appendChild(div);

  const blocker = createApp(Blocker);
  blocker.mount('#focused-blocker');
}

function pauseAndMuteVideos(videos) {
  for (let i = 0; i < videos.length; i++) {
    videos[i].muted = true;
    videos[i].pause();
  }
}

function unmuteVideos(videos) {
  for (let i = 0; i < videos.length; i++) {
    videos[i].muted = false;
  }
}