export function uniqueImageUrls(urls: Array<string | undefined | null>) {
  return Array.from(new Set(urls.filter((url): url is string => Boolean(url))))
}

export function preloadImages(urls: string[]) {
  return Promise.all(urls.map((url) => new Promise<void>((resolve) => {
    const image = new Image()
    image.onload = () => resolve()
    image.onerror = () => resolve()
    image.src = url
  })))
}

export function preloadImagesWithTimeout(urls: string[], timeoutMs = 800) {
  return Promise.race([
    preloadImages(uniqueImageUrls(urls)),
    new Promise<void>((resolve) => window.setTimeout(resolve, timeoutMs)),
  ])
}
