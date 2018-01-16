<template>
  <div class="club-emblem" :style="sizeStyle">
    <div :class="clubClass" />
  </div>
</template>

<script>
export default {
  name: 'ClubEmblem',
  props: {
    club: { type: String, required: true },
    size: { type: [String, Number], required: true },
  },
  computed: {
    clubClass() {
      return `bg-club-${this.club}`;
    },
    sizeStyle() {
      return `width: ${this.size}px;height: ${this.size}px;`;
    },
  },
};
</script>
