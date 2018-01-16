<template>
  <div>
    <span class="title stars">
      <b-icon :class="size" :icon="iconFor(n)" v-for="n in 5" :key="n" type="is-gold" />
    </span>
  </div>
</template>
<script>
export default {
  name: 'Stars',
  props: {
    stars: { type: Number, default: 5 },
    small: { type: Boolean, default: false },
  },
  computed: {
    size() {
      return this.small ? 'is-small is-size-6' : '';
    },
  },
  methods: {
    iconFor(n) {
      const value = (this.stars - n) + 1;
      if (value >= 1) {
        return 'star';
      }
      if (value < 1 && value > 0) {
        return 'star-half-o';
      }
      return 'star-o';
    },
  },
};
</script>
<style scoped lang="scss">
.stars {
  > * {
    margin-left: 0.125rem;
    margin-right: 0.125rem;
  }
}
</style>
