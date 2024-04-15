<script setup lang="ts">
import { RouterLink } from 'vue-router';

const props = withDefaults(
  defineProps<{
    url: string;
    text: string;
    removable?: boolean;
    unsubscribeCallback?: () => void;
  }>(),
  {
    removable: true
  }
);

const handleClick = () => {
  if (props.unsubscribeCallback) {
    props.unsubscribeCallback();
  }
};
</script>

<template>
  <template v-if="removable">
    <div class="wrapper">
      <button type="button" class="remove-button-outline" @click="handleClick">X</button>
      <RouterLink :to="url">{{ text }}</RouterLink>
    </div>
  </template>
  <template v-else>
    <RouterLink :to="url">{{ text }}</RouterLink>
  </template>
</template>

<style scoped>
.wrapper {
  position: relative;
  width: fit-content;
  margin: 0 auto;
}

.remove-button-outline {
  position: absolute;
  top: calc(50% - 16px); /* center */
  right: 100%;
  background: none;
  color: #f44336;
  width: 32px;
  aspect-ratio: 1/1;
  text-align: center;
  text-decoration: none;
  font-size: 12px;
  cursor: pointer;
  border-radius: 9999px; /* rounded */

  /* hover effect */
  transition-duration: 0.4s;
  &:hover {
    transform: rotate(180deg);
    border: #f44336 solid 1px;
  }

  /* click effect */
  &:active {
    transform: translateY(-4px);
  }
}
</style>
