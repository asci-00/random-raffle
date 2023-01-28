export const random = (range: number) => Math.round(Math.random() * range);
export const getMousePos = (canvas: HTMLCanvasElement, event: MouseEvent) => {
  const rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width, // relationship bitmap vs. element for x
    scaleY = canvas.height / rect.height; // relationship bitmap vs. element for y

  return {
    x: (event.clientX - rect.left) * scaleX, // scale mouse coordinates after they have
    y: (event.clientY - rect.top) * scaleY, // been adjusted to be relative to element
  };
};
