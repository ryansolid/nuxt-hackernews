<script setup lang="ts">
const route = useRoute();
const { data: story } = await useAsyncData(() => getStory(+route.params.id), {
  watch: [() => route.params.id],
  initialCache: false
});
</script>

<template>
  <div class="item-view" v-if="story">
    <template v-if="story">
      <div class="item-view-header">
        <a :href="story.url" target="_blank">
          <h1>{{ story.title }}</h1>
        </a>
        <span v-if="story.url" class="host">
          ({{ story.domain }})
        </span>
        <p class="meta">
          {{ story.points }} points
          | by <NuxtLink :to="'/users/' + story.user">{{ story.user }}</NuxtLink>
          {{ story.time_ago }} ago
        </p>
      </div>
      <div class="item-view-comments">
        <p class="item-view-comments-header">
          {{ story.comments_count ? story.comments_count + ' comments' : 'No comments yet.' }}
        </p>
        <ul v-if="story.comments_count" class="comment-children">
          <Comment v-for="comment in story.comments" :key="comment.id" :comment="comment"></Comment>
        </ul>
      </div>
    </template>
  </div>
</template>