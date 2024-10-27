<script setup lang="ts">
import { ref, computed } from 'vue'

import type { Film, FilmsResponse } from '@/types/filmTypes'

import DetailsCard from '@/components/base/DetailsCard/DetailsCard.vue'

const films = ref<Film[]>([])
const characterIds = ref<string[]>([])
const showTryLater = ref<boolean>(false)
const countStart  =ref<number>(0)
const countEnd = ref<number>(countStart.value + 6)
const showNextButton = computed<boolean>(() => {
  return countEnd.value < characterIds.value.length
})

const showFiveAtATime = computed<string[]>(() => {
  // hacky way to set up POC for pagination
  return characterIds.value.slice(countStart.value, countEnd.value)
})

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

const setCharacters = async (filmUrl: string): Promise<void> => {
  // clear out to avoid duplicates
  characterIds.value = []

  // reset countStart and countEnd
  countStart.value = 0
  countEnd.value = 5

  // find the characters - use film url
  const filmData = await fetch(filmUrl)
  const film = await filmData.json()
  const filmCharacters = film.characters

  // loop through character urls, get ids for all
  filmCharacters.forEach((characterUrl: string) => {
    characterIds.value.push(characterUrl.split('/')[5])
  })
}

const getNextSet = async (): Promise<void> => {
  if (countEnd.value <= characterIds.value.length) {
    countStart.value = countStart.value + 5
    countEnd.value = countEnd.value + 5
  }
}

</script>

<template>
  <div>
    <h1 class="app-title">Star Wars App</h1>

    <div class="cards-container">
      <div v-if="showTryLater">
        <p>We can't load the films right now, please try again.</p>
      </div>

      <template v-else-if="films">
        <suspense>
          <div class="cards-container-left">
            <h3 class="cards-container-title">Films</h3>

            <details-card v-for="film in films" :key="film.episode_id" :film @set-characters="setCharacters" />
          </div>
        </suspense>

        <div class="cards-container-right">
          <div class="cards-container-with-button" v-if="characterIds.length > 0">
            <div>
              <h3 class="cards-container-title">Characters</h3>
              <details-card v-for="id in showFiveAtATime" :key="id"  :id="id" />
            </div>

            <button v-if="showNextButton" @click="getNextSet">Show next 5</button>
          </div>
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

  button {
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;

    &:hover {
      background: lavender;
    }
  }
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

.cards-container-with-button {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>

