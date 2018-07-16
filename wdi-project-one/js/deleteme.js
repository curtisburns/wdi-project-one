window.originalSetTimeout=window.setTimeout;
window.originalClearTimeout=window.clearTimeout;
window.activeTimers=0;

window.setTimeout=function(func,delay) {
  window.activeTimers++;
  return window.originalSetTimeout(func,delay);
};

window.clearTimeout=function(timerID) {
  window.activeTimers--;
  window.originalClearTimeout(timerID);
};
