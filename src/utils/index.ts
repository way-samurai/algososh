export const pause = (delay: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, delay)
  })
}