<template>
  <div v-if="mainContentVisible">
    <v-row>
      <v-col justify-end>
        <MeanieCounter
          :is-meanie="isMeanie()"
          :meanie-counter="meanieCounter"
        />
      </v-col>
    </v-row>
    <v-container class="fill-height">
      <v-responsive class="align-center text-center" background-color="primary">
        <v-row class="d-flex align-center justify-center">
          <v-col cols="12">
            <v-card class="bg-pink-lighten-4" flat>
              <p class="text-body-2 font-weight-light mb-n1 mt-4 text-pink">
                Will you be my
              </p>
              <h1 class="text-h2 font-weight-bold text-pink">Valentine ?</h1>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="d-flex align-center justify-center">
          <v-col cols="12" sm="8" md="6">
            <p class="text-body-2 font-weight-light text-pink">
              {{ currentMeanieText }}
            </p>
          </v-col>
        </v-row>
        <v-carousel
          v-model="activeItem"
          height="50vh"
          hide-delimiter-background
          hide-delimiters
          :show-arrows="false"
          class="mb-8"
        >
          <v-carousel-item
            v-for="(catImage, index) in catImages"
            :key="index"
            :src="catImage"
          >
          </v-carousel-item>
        </v-carousel>

        <v-row class="d-flex align-center justify-center">
          <v-col cols="auto">
            <v-btn
              color="green darken-2"
              min-width="2rem"
              rel="noopener noreferrer"
              size="x-large"
              target="_blank"
              variant="flat"
              @click="onYesClick"
            >
              <v-icon icon="mdi-heart-outline" size="large" start />

              Yes
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn
              :style="btnStyle"
              color="red darken-4"
              min-width="2rem"
              rel="noopener noreferrer"
              size="x-large"
              target="_blank"
              variant="flat"
              @click="moveButton"
            >
              <v-tooltip activator="parent" location="top"
                >Dont be a meanie papini
              </v-tooltip>
              <v-icon icon="mdi-heart-broken-outline" size="large" start />
              NO
            </v-btn>
          </v-col>
        </v-row>
      </v-responsive>
    </v-container>
  </div>
  <div v-else class="d-flex align-center justify-center" style="height: 100vh">
    <v-container>
      <v-row justify="center">
        <v-col cols="auto" class="text-center">
          <h1 class="text-h2 font-weight-bold text-pink">I love you too</h1>
          <h1 class="text-h2 font-weight-bold text-pink">👉 👈</h1>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";

const mainContentVisible = ref(true);

const generateCatImagesArray = (index: number) => {
  const basePath = "/cats/cat";
  return Array.from(
    { length: index },
    (_, index) => `${basePath}${index + 1}.jpg`
  );
};
const catImages = generateCatImagesArray(7);

let meanieCounter = ref(0);
const btnStyle = ref({});
const activeItem = ref(0);
const windowWidth = ref(window.innerWidth);
const windowHeight = ref(window.innerHeight);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
  windowHeight.value = window.innerHeight;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  if (emojiInterval.value) {
    clearInterval(emojiInterval.value);
  }
});

const moveButton = () => {
  meanieCounter.value++;
  activeItem.value = (activeItem.value + 1) % catImages.length;

  const maxTop = windowHeight.value - 100;
  const maxLeft = windowWidth.value - 100;

  const top = Math.random() * maxTop;
  const left = Math.random() * maxLeft;

  btnStyle.value = {
    position: "fixed",
    top: `${top}px`,
    left: `${left}px`,
    transition: "all 0.5s ease",
  };
};

const isMeanie = () => meanieCounter.value >= 1;

const currentMeanieText = computed(() => {
  if (isMeanie()) {
    const index = (meanieCounter.value - 1) % meanieText.length;
    return meanieText[index];
  }
  return "";
});

const meanieText = [
  "Im gonna cry.",
  "Guess you're not into good guys after all.",
  "Guess it's spaghetti for one. Was perfecting your portrait.",
  "Your loss, I'm one of the rare ones.",
  "Too bad, I thought you were different.",
  "Shame, I thought we could have had something special.",
  "Guess it's spaghetti for one. Was perfecting your portrait.",
  "Love poems to the mirror. It's a very forgiving audience.",
  "Shadow and I, dancing alone. We miss your moves.",
  "Kayaking solo. Pictured us paddling through life.",
  "Life's co-star role open. I'll rehearse our lines solo.",
];

const onYesClick = () => {
  mainContentVisible.value = false;
  dropEmojis();
};

const emojiInterval = ref<number | null>(null);

const dropEmojis = () => {
  const mainEl = document.querySelector("main") || document.body;

  emojiInterval.value = window.setInterval(() => {
    createElement(mainEl, "💗");
    createElement(mainEl, "😍 ");
    createElement(mainEl, "🥰");
  }, 200);
};

const createElement = (mainElement: HTMLElement, emoji: string) => {
  const element = document.createElement("div");
  element.classList.add("emoji");
  element.textContent = emoji;
  element.style.left = `${Math.random() * 100}%`;
  element.style.animationDuration = `${Math.random() * 6}s`;
  element.style.fontSize = "2rem";
  mainElement.appendChild(element);

  // Entfernen Sie das Herz nach der Animation, um das DOM sauber zu halten
  element.addEventListener("animationend", () => {
    element.remove();
  });
};
</script>

<style>
@keyframes fall {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
}

.emoji {
  position: fixed;
  font-size: 2.5rem;
  top: -1vh;
  transform: translateY(0);
  z-index: 9999;
  animation: fall 0.5s linear forwards;
}
</style>
