import { IStory } from "~~/types";

const mapStories = {
  top: "news",
  new: "newest",
  show: "show",
  ask: "ask",
  job: "jobs",
};

const get = (path: string) =>
  $fetch(path, {
    headers: { "User-Agent": "chrome" },
  });

export function getStory(id: number): Promise<IStory> {
  return get(`https://node-hnapi.herokuapp.com/item/${id}`) as Promise<IStory>;
}
export function getUser(id: number) {
  return get(`https://hacker-news.firebaseio.com/v0/user/${id}.json`);
}
export function getStories(type: string, page: number): Promise<IStory[]> {
  const l: string = mapStories[type as any];
  return get(`https://node-hnapi.herokuapp.com/${l}?page=${page}`) as Promise<IStory[]>;
}
