<script lang="ts" setup>
const props = defineProps<{
  isOpened: boolean;
  onAccept: () => void;
  onClose: () => void;
}>();

const isVisible = computed(() => props.isOpened);
</script>

<template>
  <div v-if="isVisible" class="modal-overlay" @click="onClose">
    <div class="modal-content" @click.stop>
      <span>Вы точно хотите удалить этот пост?</span>
      <div class="modal-buttons">
        <PrimaryButton
          class="secondary-btn"
          text="Подтвердить"
          @click="onAccept"
        />
        <PrimaryButton text="Закрыть" @click="onClose" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: #fff;
  padding: 32px 36px 24px 36px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  min-width: 380px;
  text-align: center;
  font-size: 18px;
  font-family: inherit;
  position: relative;
}
.modal-content span {
  display: block;
  margin-bottom: 28px;
  font-weight: 500;
}
.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.secondary-btn {
  background: #eee;
  color: #222;
  box-shadow: none;
}
.secondary-btn:hover {
  background: #ddd;
}
</style>
