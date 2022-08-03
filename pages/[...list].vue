<script setup lang="ts">
const route = useRoute()
let page = computed(() => +route.query.page || 1);
let type = computed(() => route.params.list?.[0] || "top");
const { data: stories } = await useAsyncData(() => getStories(type.value, page.value), {
  watch: [page, type],
  initialCache: false
});
</script>

<template>
  <div class="news-view">
    <div class="news-list-nav">
      <NuxtLink v-if="page > 1" :to="'/' + type + '?page=' + (page - 1)" class="page-link">&lt; prev</NuxtLink>
      <a v-else class="disabled">&lt; prev</a>
      <span class="page-link">page {{ page }}</span>
      <NuxtLink v-if="stories.length > 28" :to="'/' + type + '?page=' + (page + 1)">more &gt;</NuxtLink>
      <a v-else class="disabled">more &gt;</a>
    </div>

    <div class="news-list" :key="page" v-if="stories.length">
      <ul>
        <Story v-for="item in stories" :key="item.id" :story="item">
        </Story>
      </ul>
    </div>
  </div>
</template>