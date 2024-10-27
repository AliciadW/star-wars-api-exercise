<script setup lang="ts">
import type { Character, CharacterMeta } from '@/types/filmTypes'

import { computed, ref, watch } from 'vue'

const props = defineProps(['film', 'id'])
const emit = defineEmits(['setCharacters'])

const characterDetails = ref<Character>()
const displayData = ref<CharacterMeta> ({
  gender: '',
  hair_color: '',
  eye_color: '',
  birth_year: ''
});

const dateToDisplay = computed<string>(() => {
  return props.film?.release_date?.split('-')[0] || ''
})

const getCharacter = async (): Promise<void> => {
  const character =  await fetch(`https://swapi.dev/api/people/${props.id}`)

  characterDetails.value  = await character.json()

  displayData.value = {
    gender: characterDetails.value?.gender,
    hair_color: characterDetails.value?.hair_color,
    eye_color: characterDetails.value?.eye_color,
    birth_year: characterDetails.value?.birth_year
  }
}

watch(() => props.id, async () => {
  await getCharacter()
}, { immediate: true })
</script>

<template>
<div class="details-card">
  <div v-if="film" @click="emit('setCharacters', film.url)">
    <h3 class="details-card-title">{{ film.title }}</h3>
    <div class="details-card-meta">
      <p>{{ film.director }}</p>
      <p>{{ dateToDisplay }}</p>
    </div>
  </div>

  <div v-else-if="characterDetails">
    <h3 class="details-card-title">{{ characterDetails?.name }}</h3>
    <div class="details-card-meta" >
      <p v-for="(value, i) in Object.values(displayData)" :key="i">{{ value }}</p>
    </div>
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

  & .details-card-meta {
    display: flex;
    justify-content: space-between;

    p {
      text-transform: capitalize;
    }
  }

  &:hover {
    color: lavender;
    background: slategrey;
  }
}

.details-card-title {
  color: palegoldenrod;
  font-weight: bold;
}
</style>
