<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const { id } = route.params;

const postsStore = usePostsStore();

const { data, pending } = await useAsyncData(`post-${id}`, () =>
  postsStore.fetchPost(Number(id)).then(() => postsStore.post)
);

watch(
  () => data.value,
  (post) => {
    if (post) {
      postsStore.title = post.title;
      postsStore.body = post.body;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="container">
    <PrimaryButton text="Назад" @click="router.push('/')" />
    <form
      class="add-post-form"
      @submit.prevent="
        postsStore.editPost(
          Number(id),
          postsStore.title,
          postsStore.body,
          router
        )
      "
    >
      <input
        v-model="postsStore.title"
        type="text"
        placeholder="Заголовок"
        class="add-input"
        required
      />
      <textarea
        v-model="postsStore.body"
        placeholder="Текст поста"
        class="add-textarea"
        required
      ></textarea>
      <PrimaryButton
        text="Редактировать пост"
        :disabled="pending"
        type="submit"
      />
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
}
.add-post-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  background: #fff;
  padding: 1.5rem 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(123, 97, 255, 0.07);
  margin-top: 1rem;
}
.add-input,
.add-textarea {
  padding: 0.7rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1.1rem;
  resize: none;
  font-family: "Inter", sans-serif;
}
.add-textarea {
  height: 150px;
}
</style>
