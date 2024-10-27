<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps(['film', 'character'])
const emit = defineEmits(['setCharacters'])

const dateToDisplay = computed<string>(() => {
  return props.film?.release_date?.split('-')[0] || ''
})

</script>

<template>
<div class="details-card">
  <div v-if="film" @click="emit('setCharacters', film.episode_id)">
    <h3 class="details-card-title">{{ film.title }}</h3>
    <div class="details-card-film-meta">
      <p>{{ film.director }}</p>
      <p>{{ dateToDisplay }}</p>
    </div>
  </div>

  <div v-else-if="character">
    <h3 class="details-card-title">{{ character.name }}</h3>
    <p>attribute 1</p>
    <p>attribute 2</p>
    <p>attribute 3</p>
    <p>attribute 4</p>
  </div>
</div>
</template>

<style scoped>
.details-card {
  text-align: left;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid slategrey;
  background: lightslategray;
  margin-bottom: 5px;
  padding: 5px;

  & .details-card-film-meta {
    display: flex;
    justify-content: space-between;
  }

  &:hover {
    color: lavender;
    background: slategrey;
  }
}
</style>
