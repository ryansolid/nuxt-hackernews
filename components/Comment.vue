<script setup lang="ts">
import type { IComment } from '../types';

defineProps<{
  comment: IComment
}>()
const pluralize = (n: number) => n + (n === 1 ? " reply" : " replies");
const open = ref(true);
</script>

<template>
  <li v-if="comment" class="comment">
    <div class="by">
      <NuxtLink :to="'/user/' + comment.user">{{ comment.user }}</NuxtLink>
      {{ comment.time_ago }} ago
    </div>
    <div class="text" v-html="comment.content"></div>
    <div class="toggle" :class="{ open }" v-if="comment.comments && comment.comments.length">
      <a @click="open = !open">{{
          open
            ? '[-]'
            : '[+] ' + pluralize(comment.comments.length) + ' collapsed'
      }}</a>
    </div>
    <ul class="comment-children" v-show="open">
      <Comment v-for="child in comment.comments" :key="child.id" :comment="child"></Comment>
    </ul>
  </li>
</template>
