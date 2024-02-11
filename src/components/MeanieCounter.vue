<template>
  <v-sheet
    v-if="isMeanie"
    max-height="200"
    class="pa-3 bg-pink-lighten-4 float-end"
  >
    <v-chip color="teal"
      >Meanie Counter:
      <v-icon class="float-right" icon="mdi-emoticon-cry-outline"></v-icon>
      {{ meanieCounter }}</v-chip
    >
  </v-sheet>
</template>

<script setup lang="ts">
defineProps<{
  isMeanie: boolean;
  meanieCounter: number;
}>();
</script>
