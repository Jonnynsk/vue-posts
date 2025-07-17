import { defineStore } from "pinia";

const url = "https://jsonplaceholder.typicode.com/posts";

interface Post {
  id: number;
  title: string;
  body: string;
}

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [] as Array<Post>,
    post: {} as Post | null,
    loading: false,
    loadingPost: false,
    title: "",
    body: "",
    isDeleteModalOpened: false,
    postIdToDelete: 0,
  }),
  actions: {
    openDeleteModal(id: number) {
      this.postIdToDelete = id;
      this.isDeleteModalOpened = true;
    },
    closeDeleteModal() {
      this.isDeleteModalOpened = false;
    },
    async fetchPosts() {
      this.loading = true;

      try {
        const posts = await $fetch<Post[]>(url);
        this.posts = posts;
        return posts;
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    async fetchPost(id: number) {
      this.loadingPost = true;

      try {
        const post = await $fetch<Post>(`${url}/${id}`);
        this.post = post;
        return post;
      } catch (e) {
        const found = this.posts.find((p) => p.id === id);
        if (found) {
          this.post = found;
          return found;
        }
        this.post = null;
        console.log(e);
      } finally {
        this.loadingPost = false;
      }
    },
    async editPost(id: number, title: string, body: string) {
      await $fetch(`${url}/${id}`, {
        method: "PATCH",
        body: { title, body },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const idx = this.posts.findIndex((p) => p.id === id);
      if (idx !== -1) {
        this.posts[idx].title = title;
        this.posts[idx].body = body;
      }
      navigateTo("/");
    },
    async handleDeletePost(id: number) {
      await $fetch(`${url}/${id}`, { method: "DELETE" });
      this.posts = this.posts.filter((post) => post.id !== id);
    },
    async handleFilterPosts(event: Event) {
      const query = (event.target as HTMLInputElement).value;
      const allPosts = await $fetch<Post[]>(url);
      const filtered = allPosts.filter((post) => post.title.includes(query));
      this.posts = filtered;
    },
    async handleAddPost() {
      await $fetch(url, {
        method: "POST",
        body: { title: this.title, body: this.body },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const newPost = {
        id: this.posts.length + 1,
        title: this.title,
        body: this.body,
      };

      this.posts.unshift(newPost);
      this.title = "";
      this.body = "";
      navigateTo("/");
    },
  },
});
