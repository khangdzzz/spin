<script setup>
import { Wheel } from "spin-wheel";

let modifier = 0;
const wheel = ref(null)


const initProject = async () => {
  await loadFonts(props.map(i => i.itemLabelFont));

  wheel.value = new Wheel(document.querySelector('.wheel-wrapper'));
  const dropdown = document.querySelector('select');

  const images = [];

  for (const p of props) {
    // Initalise dropdown with the names of each example:
    const opt = document.createElement('option');
    opt.textContent = p.name;
    dropdown.append(opt);

    // Convert image urls into actual images:
    images.push(initImage(p, 'image'));
    images.push(initImage(p, 'overlayImage'));
    for (const item of p.items) {
      images.push(initImage(item, 'image'));
    }
  }

  await loadImages(images);

  // Show the wheel once everything has loaded
  document.querySelector('.wheel-wrapper').style.visibility = 'visible';

  // Handle dropdown change:
  dropdown.onchange = () => {
    wheel.value.init({
      ...props[dropdown.selectedIndex],
      rotation: wheel.value.rotation, // Preserve value.
    });
  };

  // Select default:
  dropdown.options[0].selected = 'selected';
  dropdown.onchange();


}

const spin = () => {
  const {duration, winningItemRotaion} = calcSpinToValues();
  wheel.value.spinTo(winningItemRotaion, duration);
}

const calcSpinToValues = () => {
    const duration = 3000;
    const winningItemRotaion = getRandomInt(360, 360 * 1.75) + modifier;
    modifier += 360 * 1.75;
    return {duration, winningItemRotaion};
  }

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const initImage = (obj, pName) => {
  if (!obj[pName]) return null;
  const i = new Image();
  i.src = obj[pName];
  obj[pName] = i;
  return i;
}

onMounted(async () => {
  await initProject();
});

</script>

<template>
  <div class="gui-wrapper">
    <p>Click-drag (or touch-flick) to spin the wheel.</p>
    <div>
      <button @click="spin">Spin</button>
      <p><label>Theme:</label><select></select></p>
    </div>
  </div>

  <div class="wheel-wrapper" ref="wheelContainer"></div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Pragati+Narrow&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap');

* {
  margin: 0;
  padding: 0;
  font-family: 'Lucida Grande', sans-serif;
  font-size: 15px;
  -webkit-tap-highlight-color: transparent;
  user-select: none; /* Prevent selecting ui text when dragging */
}

html, body {
  height: 100%;
}

body {
  /* Prevent pull-down-to-refresh gesture */
  overscroll-behavior-y: contain;

  /* Prevent iOS rubber-band effect */
  position: fixed;
  width: 100%;

  /* Prevent browser from handling touch events */
  touch-action: none;

  display: flex;
  flex-direction: column;
  justify-items: stretch;
  align-items: stretch;
}

.wheel-wrapper {
  /* Hide UI during page load */
  visibility: hidden;

  overflow: hidden;
  height: 100%;
  width: 100%;
}

.gui-wrapper {
  padding: 10px;
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.gui-wrapper > div {
  display: flex;
  flex-direction:row;
  gap: 10px;
  align-items: center;
}

select {
  padding: 2px;
}

label {
  margin-right: 5px;
}

button {
  padding: 10px 20px;
  cursor: pointer;
  margin-right: 10px;
  max-width: 100px;
}
</style>
