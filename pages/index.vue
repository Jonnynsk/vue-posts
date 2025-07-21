<script setup lang="ts">
import { usePostsStore } from "~/stores/posts";

const router = useRouter();

const postsStore = usePostsStore();

await postsStore.fetchPosts();

const handleDeletePost = (id: number) => {
  postsStore.handleDeletePost(id).then(() => {
    postsStore.closeDeleteModal();
  });
};
</script>

<template>
  <div class="container">
    <div class="search-container">
      <input
        type="text"
        @input="postsStore.handleFilterPosts"
        placeholder="Поиск по заголовку..."
        class="search-input"
      />
      <PrimaryButton text="Добавить пост" @click="router.push('/post')" />
    </div>
    <div v-if="!postsStore.loading">
      <div v-if="postsStore.posts.length > 0">
        <div
          v-for="post in [...postsStore.posts].reverse()"
          :key="post.id"
          class="post-card"
        >
          <NuxtLink :to="`/posts/${post.id}`" class="post-title-link">
            <h1 class="post-title">{{ post.title }}</h1>
          </NuxtLink>
          <p class="post-body">{{ post.body }}</p>
          <div class="post-actions">
            <div class="post-actions-buttons">
              <PrimaryButton
                text="Удалить"
                class="secondary-btn"
                @click="postsStore.openDeleteModal(post.id)"
                isSecondary
              />
              <PrimaryButton
                text="Редактировать"
                @click="router.push(`/posts/edit/${post.id}`)"
              />
            </div>
            <NuxtTime
              :datetime="post.created_at"
              year="2-digit"
              month="2-digit"
              day="numeric"
              hour="2-digit"
              minute="2-digit"
            />
          </div>
        </div>
      </div>
      <div v-else class="loading">
        <p>Посты не найдены</p>
      </div>
    </div>
    <p v-else class="loading">Загрузка...</p>
    <DeleteModal
      :is-opened="postsStore.isDeleteModalOpened"
      @accept="handleDeletePost(postsStore.postIdToDelete)"
      @close="postsStore.closeDeleteModal"
    />
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
}
.search-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 2rem;
}
.search-input {
  width: 100%;
  max-width: 400px;
  padding: 0.75rem 1rem;
  margin-bottom: 2rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: border 0.2s, box-shadow 0.2s;
}
.search-input:focus {
  border: 1.5px solid #7b61ff;
  outline: none;
  box-shadow: 0 4px 16px rgba(123, 97, 255, 0.08);
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
}
.post-card:hover {
  box-shadow: 0 8px 32px rgba(123, 97, 255, 0.13);
  transform: translateY(-2px) scale(1.01);
}
.post-title {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
  color: #2d225a;
}
.post-title:hover {
  opacity: 0.8;
}
.post-title-link {
  text-decoration: none;
}
.post-body {
  font-size: 1.1rem;
  color: #4a4a4a;
  margin-bottom: 1.5rem;
}
.post-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
.post-actions-buttons {
  display: flex;
  gap: 1rem;
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
  .search-input {
    max-width: 300px;
  }
  .post-card {
    padding: 1.2rem 0.7rem 1rem 0.7rem;
  }
  .search-input {
    font-size: 1rem;
    padding: 0.6rem 0.7rem;
  }
  .post-title {
    font-size: 1.2rem;
  }
  .post-body {
    font-size: 1rem;
  }
}
</style>
