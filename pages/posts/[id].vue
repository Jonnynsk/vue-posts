<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const { id } = route.params;

const postsStore = usePostsStore();

await postsStore.fetchPost(Number(id));
</script>

<template>
  <div class="container">
    <PrimaryButton text="Назад" @click="router.push('/')" />
    <div v-if="!postsStore.loadingPost" class="post-card">
      <h1 class="post-title">{{ postsStore.post?.title }}</h1>
      <p class="post-body">{{ postsStore.post?.body }}</p>
      <NuxtTime
        :datetime="postsStore.post?.created_at || ''"
        year="2-digit"
        month="2-digit"
        day="numeric"
        hour="2-digit"
        minute="2-digit"
        class="post-time"
      />
    </div>
    <p v-else class="loading">Загрузка...</p>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
}
.post-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  margin-bottom: 2rem;
  transition: box-shadow 0.2s, transform 0.2s;
  border: none;
  position: relative;
  margin-top: 1rem;
}
.post-title {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
  color: #2d225a;
}
.post-body {
  font-size: 1.1rem;
  color: #4a4a4a;
  margin-bottom: 1.5rem;
}
.loading {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: #7b61ff;
  margin-top: 3rem;
}
@media (max-width: 600px) {
  .container {
    padding: 0.5rem;
  }
  .post-card {
    padding: 1.2rem 0.7rem 1rem 0.7rem;
  }
  .post-title {
    font-size: 1.2rem;
  }
  .post-body {
    font-size: 1rem;
  }
}
</style>
