<script setup lang="ts">
import {ref} from 'vue'

import type { Character, Film, FilmsResponse } from '@/types/filmTypes'

import DetailsCard from '@/components/base/DetailsCard/DetailsCard.vue'

const films = ref<Film[]>([])
const character = ref<Character>()
const showTryLater = ref<boolean>(false)

const getFilms = async (): Promise<void> => {
  const response = await fetch('https://swapi.dev/api/films')

  if (response && response.status == 200) {
    const filmsResponse: FilmsResponse = await response.json()

    films.value = filmsResponse.results
  } else {
    showTryLater.value = true
  }
}

getFilms()
</script>

<template>
  <div>
    <div class="title">
      Star Wars App
    </div>
    <div class="container">
      <div class="left-block">
        Films

        <details-card v-for="film in films" :key="film.episode_id" :film />
      </div>
      <div class="right-block">
        Characters

        <details-card :character />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}
</style>

