<script setup lang="ts">
const props = defineProps(['film', 'character'])
</script>

<template>
<div class="details-card">
  <div v-if="film">
    <h3 class="details-card-title">{{ film.title }}</h3>
    <div>
      <p>{{ film.director }}</p>
      <p>{{ film.release_date }}</p>
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
  border-radius: 5px;
  border: 1px solid slategrey;
  background: lightslategray;
  margin-bottom: 5px;
  padding: 5px;
}
</style>
