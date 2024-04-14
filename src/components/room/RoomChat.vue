<script setup lang="ts">
defineProps<{
  msg?: string;
}>();
</script>

<template>
  <div class="room-chat">
    <div class="chat-box">
      <div class="chat-messages">
        <div class="chat-message">
          <div class="chat-message__avatar">
            <img src="https://via.placeholder.com/50" alt="avatar" />
          </div>
          <div class="chat-message__content">
            <div class="chat-message__author">Author</div>
            <div class="chat-message__text">Message</div>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-input">
      <input type="text" placeholder="Type your message here" />
      <button>Send</button>
    </div>
  </div>
  <div class="box">聊天室</div>
</template>
