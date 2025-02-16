<script setup>
import { Wheel } from "spin-wheel";

let modifier = 0;
const result = ref('');
const wheel = ref(null)
const idDisableBtn = ref(false);


const initProject = async () => {
  await loadFonts(props.itemLabelFont);

  wheel.value = new Wheel(document.querySelector('.wheel-wrapper'));

  const images = [];

  images.push(initImage(props, 'image'));
  images.push(initImage(props, 'overlayImage'));
  for (const item of props.items) {
    images.push(initImage(item, 'image'));
  }

  await loadImages(images);

  document.querySelector('.wheel-wrapper').style.visibility = 'visible';

  wheel.value.init({
    ...props,
    rotation: wheel.value.rotation,
    onCurrentIndexChange: ({currentIndex}) => {
      result.value = props.items[currentIndex].label;
    },
    onRest: () => {
      idDisableBtn.value = false
      alert(`🎉! Bạn đã quay trúng thưởng ${result.value} 🏆✨!`)
      sendMessage(result.value);
    },
    onSpin:() => {
      idDisableBtn.value = true
    },
  });
}

const spin = () => {
  const {duration, winningItemRotaion} = calcSpinToValues();
  wheel.value.spinTo(winningItemRotaion, duration);
}

const calcSpinToValues = () => {
    const duration = 3000;
    const winningItemRotaion = getRandomInt(360, 360 * 3) + modifier;

    modifier += 360 * 3;

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

const sendMessage = async (text) => {
  try {
    const response = await $fetch('/api/telegram', {
      method: 'POST',
      body: { message: `🎉 Chúc mừng! Bạn đã quay trúng thưởng ${text} 🏆✨` }
    });
    console.log(response);
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

</script>

<template>
  <div class="gui-wrapper">
    <p>Chào mừng bạn đến với vòng quay may mắn của RUNNING STORE!</p>
    <div>
      <button @click="spin" :disabled="idDisableBtn">QUAY</button>
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
  height: calc(100vh - 125px);
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
