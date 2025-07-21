import { defineStore } from "pinia";

import { useSupabase } from "~/composables/useSupabase";

interface Post {
  id: number;
  title: string;
  body: string;
  created_at: string;
}

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [] as Array<Post>,
    allPosts: [] as Array<Post>,
    post: {} as Post | null,
    loading: false,
    loadingPost: false,
    title: "",
    body: "",
    isDeleteModalOpened: false,
    postIdToDelete: 0,
  }),
  getters: {
    supabase: () => useSupabase(),
  },
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
        let { data: supabasePosts } = await this.supabase
          .from("posts")
          .select("*");
        this.allPosts = supabasePosts as Post[];
        this.posts = supabasePosts as Post[];
        return supabasePosts;
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    async fetchPost(id: number) {
      this.loadingPost = true;

      try {
        let { data: supabasePost } = await this.supabase
          .from("posts")
          .select("*")
          .eq("id", id);

        this.post = supabasePost?.[0] as Post;
        return supabasePost;
      } catch (e) {
        console.log(e);
      } finally {
        this.loadingPost = false;
      }
    },
    async editPost(id: number, title: string, body: string) {
      try {
        await this.supabase
          .from("posts")
          .update({ title, body })
          .eq("id", id)
          .select();

        navigateTo("/");
      } catch (error) {
        console.log(error);
      }
    },
    async handleDeletePost(id: number) {
      try {
        await this.supabase.from("posts").delete().eq("id", id);
        this.posts = this.posts.filter((post) => post.id !== id);
        this.allPosts = this.allPosts.filter((post) => post.id !== id);
      } catch (error) {
        console.log(error);
      }
    },
    async handleFilterPosts(event: Event) {
      const query = (event.target as HTMLInputElement).value;
      if (query.trim() === "") {
        this.posts = [...this.allPosts];
      } else {
        const filtered = this.allPosts.filter((post) =>
          post.title.toLowerCase().includes(query.toLowerCase())
        );
        this.posts = filtered;
      }
    },
    async handleAddPost() {
      try {
        await this.supabase
          .from("posts")
          .insert([{ title: this.title, body: this.body }])
          .select();

        this.title = "";
        this.body = "";
        navigateTo("/");
      } catch (error) {
        console.log(error);
      }
    },
  },
});
