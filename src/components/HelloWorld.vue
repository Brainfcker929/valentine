<template>
  <v-row>
    <v-col justify-end>
      <v-sheet
        v-if="isMeanie()"
        max-height="200"
        class="pa-3 bg-pink-lighten-4 float-end"
      >
        <v-chip color="teal"
          >Meanie Counter:
          <v-icon class="float-right" icon="mdi-emoticon-cry-outline"></v-icon>
          {{ meanieCounter }}</v-chip
        >
      </v-sheet>
    </v-col>
  </v-row>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center" background-color="primary">
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-card class="bg-pink-lighten-4" flat>
            <p class="text-body-2 font-weight-light mb-n1 mt-4 text-pink">
              Will you be my
            </p>
            <h1 class="text-h2 font-weight-bold text-pink">Valentine ?</h1>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-center mb-8">
        <v-col>
          <p class="text-body-2 font-weight-light text-pink">
            {{ currentMeanieText }}
          </p>
        </v-col>
      </v-row>
      <v-carousel
        v-model="activeItem"
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
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            target="_blank"
            variant="flat"
          >
            <v-icon icon="mdi-heart-outline" size="large" start />

            Yes
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn
            :style="btnStyle"
            color="red darken-4"
            min-width="228"
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
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";

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
</script>
