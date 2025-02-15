export async function loadFonts(fontNames = []) {
  if (!('fonts' in document)) return;

  const promises = [];

  for (const i of fontNames) {
    if (typeof i === 'string') promises.push(document.fonts.load('1em ' + i));
  }

  await Promise.all(promises);
}


export async function loadImages(images = []) {
  const promises = [];

  for (const img of images) {
    if (img instanceof HTMLImageElement) promises.push(img.decode());
  }

  try {
    await Promise.all(promises);
  } catch (error) {
    throw new Error('An image could not be loaded');
  }
}
