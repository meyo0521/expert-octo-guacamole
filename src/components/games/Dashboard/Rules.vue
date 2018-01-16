<template>
  <div>
    <p class="title">Rules</p>
    <div class="content" v-html="compiledRules"/>
  </div>
</template>
<script>
import * as marked from 'marked';

export default {
  name: 'GameRules',
  props: { game: { type: Object, required: true } },
  computed: {
    compiledRules() { return marked(this.game.rules); },
  },
};
</script>
