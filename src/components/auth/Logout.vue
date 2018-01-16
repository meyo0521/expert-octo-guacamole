<template>
  <div/>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'LogOut',
  mounted() {
    this.$router.push('/about');
    this.logout();
  },
  methods: {
    ...mapActions(['logout']),
  },
};
</script>
