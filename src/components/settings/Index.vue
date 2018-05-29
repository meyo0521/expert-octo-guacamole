<template>
  <div class="notification is-primary-1">
    <p class="title">Settings</p>
    <section style="width: 80%">
      <b-field label="Display Name" :type="result ? 'is-danger' : ''" :message="result">
        <b-input v-model="model.displayName" expanded minlength="5"
                 :placeholder="`leave blank if you want use: ${myProfile.meta && myProfile.meta.name}`" />
      </b-field>
      <b-field label="Team">
        <b-input v-model="model.team" expanded minlength="3"
                 placeholder="leave blank if you don't have any" />
      </b-field>
      <b-field label="Slack integration (experimental)">
        <div>
          <Connector
            :connector="connector" @connect="connect"
            v-for="connector in connectors" :key="connector.name"/>
          <p v-if="!connectors.length">
            Unfortunately there is no active external connectors.
          </p>
        </div>
      </b-field>

      <b-field>
        <p class="control">
          <button @click="update" class="button is-primary-2">
            Update
          </button>
        </p>
      </b-field>
    </section>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { pickAll } from 'ramda';
import Connector from './Connector';

export default {
  name: 'Settings',
  components: { Connector },
  data() {
    return {
      model: {
        displayName: null,
        team: null,
      },
      result: '',
      connectors: [],
    };
  },
  computed: { ...mapGetters(['myProfile', 'id']) },
  watch: {
    myProfile(data) {
      this.model = pickAll(['displayName', 'team'], data.meta);
    },
  },
  created() {
    if (this.myProfile.meta) {
      this.model = pickAll(['displayName', 'team'], this.myProfile.meta);
    }
    this.load();
  },
  methods: {
    ...mapActions(['externalToken']),
    async connect(connector) {
      const { token } = await this.externalToken(window.location.href);
      window.location.href = `${connector.connector_url}?state=${token}`;
    },
    update() {
      this.$api('PUT', `/users/${this.id}`, this.model)
        .then(() => {
          this.$toast.open({
            message: 'Data updated!',
            type: 'is-success',
          });
        })
        .catch((e) => {
          console.error(e);
          this.$toast.open({
            message: 'Something went wrong!',
            type: 'is-danger',
          });
        });
    },
    load() {
      this.$api('GET', '/events/connectors').then((data) => {
        this.connectors = data;
      });
    },
  },
};
</script>
<style lang="scss">
@import "../../style/vars.scss";
.label {
  color: $primary-invert;
}
</style>
