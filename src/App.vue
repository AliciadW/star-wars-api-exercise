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

const setCharacters = async (filmId: number): Promise<void> => {
  // characterArray: string[]
  // const characterListIds =

  console.log(filmId)
  const response = await fetch(`https://swapi.dev/api/people/${3}`)

  console.log(await response.json())
}

</script>

<template>
  <div>
    <h1 class="app-title">Star Wars App</h1>

    <div class="cards-container">
      <div v-if="showTryLater">
        <p>We can't load the films right now, please try again.</p>
      </div>

      <template v-else>
        <div class="cards-container-left">
          <h3 class="cards-container-title">Films</h3>

          <details-card v-for="film in films" :key="film.episode_id" :film @set-characters="setCharacters" />
        </div>
        <div class="cards-container-right">
          <h3 class="cards-container-title">Characters</h3>

          <details-card v-if="character" :character />
        </div>
      </template>

    </div>
  </div>
</template>

<style scoped>
.app-title {
  text-align: center;
  margin-bottom: 20px;
  color: gold;
}

.cards-container {
  display: flex;
  justify-content: space-between;
}

.cards-container-title {
  font-weight: 700;
}

.cards-container-left {
  margin-right: 20px;
}

.cards-container-left, .cards-container-right {
  width: 90%;
  text-align: center;
  border: 1px solid dimgray;
  border-radius: 5px;
  padding: 5px;
}
</style>

