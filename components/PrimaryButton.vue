<script lang="ts" setup>
const props = defineProps<{
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  class?: string;
}>();
</script>

<template>
  <button
    :class="['primary-btn', props.class]"
    :disabled="props.disabled"
    :type="props.type"
    @click="props.onClick"
  >
    {{ props.text }}
  </button>
</template>

<style scoped>
.primary-btn {
  background: linear-gradient(90deg, #ff5858 0%, #ff7b7b 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.3rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(255, 88, 88, 0.08);
  transition: background 0.2s, transform 0.15s;
}
.primary-btn:hover {
  background: linear-gradient(90deg, #ff7b7b 0%, #ff5858 100%);
}
</style>
