import { loadPlguin } from '@/components/loading/load';

const $loading = loadPlguin;

let needLoadingRequestCount: number = 0;

export function startLoading(): void {
  $loading.show({
    title: 'loading...',
  });
}

export function endLoading(): void {
  $loading.hide();
}

export function showFullScreenLoading(): void {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}

export function hideFullScreenLoading(): void {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}
