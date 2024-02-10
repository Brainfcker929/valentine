<template>
  <div class="position-relative fill-height" ref="containerRef">
    <v-container class="fill-height">
      <v-responsive class="align-center text-center fill-height" background-color="primary">
        <v-carousel
        v-model="activeItem"
        hide-delimiter-background
        hide-delimiters
        :show-arrows=false
        >
        <v-carousel-item
        v-for="(catImage, index) in catImages"
        :src="catImage"
        :key="index"
        >
      </v-carousel-item>
    </v-carousel>

    <div class="text-body-2 font-weight-light mb-n1 mt-4 text-pink">Will you be my</div>

    <h1 class="text-h2 font-weight-bold text-pink">Valentine ?</h1>

    <div class="py-8" >
      <span v-if="meaniCounter >= 1">
        <v-chip color="teal">Meani Counter: <v-icon class="mx-1" icon="mdi-emoticon-cry-outline"></v-icon> {{ meaniCounter }}</v-chip>
      </span>
    </div>

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
        <v-icon
        icon="mdi-heart-outline"
        size="large"
        start
        />

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
      <v-tooltip
      activator="parent"
      location="top"
      >Dont be a meanie papini

      </v-tooltip>
      <v-icon
      icon="mdi-heart-broken-outline"
      size="large"
      start
      />
      NO
    </v-btn>
  </v-col>
</v-row>
</v-responsive>
</v-container>
</div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';

  const generateCatImagesArray = (index: number) => {
  const basePath = "/cats/cat";
  return Array.from({ length: index }, (_, index) => `${basePath}${index + 1}.jpg`);
}
  const catImages = generateCatImagesArray(7);

  let meaniCounter = 0;
  const btnStyle = ref({});
  const activeItem = ref(0)
  const windowWidth = ref(window.innerWidth)
  const windowHeight = ref(window.innerHeight)

  const handleResize = () => {
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  const moveButton = () => {
    meaniCounter++;
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
</script>
