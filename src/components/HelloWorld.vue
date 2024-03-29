<template>
  <div v-if="state.mainContentVisible">
    <v-row>
      <v-col justify-end>
        <MeanieCounter
          :is-meanie="isMeanie"
          :meanie-counter="state.meanieCounter"
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
          v-model="state.activeItem"
          height="50vh"
          hide-delimiter-background
          hide-delimiters
          :show-arrows="false"
          class="mb-8"
        >
          <v-carousel-item
            v-for="(catImage, index) in state.catImages"
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
              :style="state.btnStyle"
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
import { onMounted, onUnmounted, computed, reactive } from "vue";
import { useEmojiDrop } from "@/composables/useEmojiDrop";
import { meanieText } from "@/data/meanieText";
import {
  generateCatImagesArray,
  handleWindowResize,
} from "@/utilities/helpers";
const { dropEmojis } = useEmojiDrop();

const state = reactive({
  mainContentVisible: true,
  meanieCounter: 0,
  btnStyle: {},
  activeItem: 0,
  catImages: generateCatImagesArray(7),
  windowDimensions: { width: window.innerWidth, height: window.innerHeight },
});

onMounted(() => {
  window.addEventListener("resize", () =>
    handleWindowResize(state.windowDimensions)
  );
});

onUnmounted(() => {
  window.removeEventListener("resize", () =>
    handleWindowResize(state.windowDimensions)
  );
});

const nextImage = () =>
  (state.activeItem = (state.activeItem + 1) % state.catImages.length);

const incrementMeanieCounter = () => state.meanieCounter++;

const moveButton = () => {
  incrementMeanieCounter();
  nextImage();
  const { height, width } = state.windowDimensions;
  const maxTop = height - 100;
  const maxLeft = width - 100;

  const top = Math.random() * maxTop;
  const left = Math.random() * maxLeft;

  state.btnStyle = {
    position: "fixed",
    top: `${top}px`,
    left: `${left}px`,
    transition: "all 0.5s ease",
  };
};

const isMeanie = computed(() => state.meanieCounter >= 1);

const currentMeanieText = computed(() => {
  return isMeanie.value
    ? meanieText[(state.meanieCounter - 1) % meanieText.length]
    : "";
});

const onYesClick = () => {
  state.mainContentVisible = false;
  dropEmojis("main");
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
