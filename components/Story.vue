<script setup lang="ts">
import type { IStory } from '~/types';

defineProps<{
  story: IStory
}>()
</script>

<template>
  <li class="news-item">
    <span class="score">{{ story.points }}</span>
    <span class="title">
      <template v-if="story.url">
        <a :href="story.url" target="_blank" rel="noopener">{{ story.title }}</a>
        <span class="host"> ({{ story.domain }})</span>
      </template>
      <template v-else>
        <NuxtLink :to="'/stories/' + story.id">{{ story.title }}</NuxtLink>
      </template>
    </span>
    <br>
    <span class="meta">
      <span v-if="story.type !== 'job'" class="by">
        by <NuxtLink :to="'/users/' + story.user">{{ story.user }}</NuxtLink>
      </span>
      <span class="time">
        {{ story.time_ago }} ago
      </span>
      <span v-if="story.type !== 'job'" class="comments-link">
        | <NuxtLink :to="'/stories/' + story.id">{{ story.comments_count }} comments</NuxtLink>
      </span>
    </span>
    <span class="label" v-if="story.type !== 'link'">{{ story.type }}</span>
  </li>
</template>
