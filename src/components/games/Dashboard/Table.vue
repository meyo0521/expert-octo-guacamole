<template>
  <div>
    <b-table :data="game.table" striped :row-class="rowClass"
             @sort="currentSort" :default-sort="defaultSort">
      <template slot-scope="props" slot="header">
        <b-tooltip :active="!!props.column.meta" :label="props.column.meta" position="is-bottom" multiline dashed type="is-dark">
          {{ props.column.label }}
        </b-tooltip>
      </template>

      <template slot-scope="props">
        <b-table-column sortable label="#" field="position" meta="Position" width="1" numeric>
          <span v-if="(props.index + 1) === props.row.position || !isDefaultSort">
            {{ props.row.position }}.
          </span>
        </b-table-column>
        <b-table-column label="Player">
          <div class="is-flex">
            <router-link :to="`/users/${props.row.id}`">
              {{ user(props.row.id).name }}
            </router-link>
          </div>
        </b-table-column>
        <b-table-column label="Club">
          <div class="is-flex">
            {{ club(props.row.id).name }}
          </div>
        </b-table-column>
        <b-table-column sortable field="played" label="P"
                        meta="Matches played" width="1" centered>
          {{ props.row.played }}
        </b-table-column>
        <b-table-column sortable field="wins" label="W"
                        meta="Matches won" width="1" centered numeric>
          {{ props.row.wins }}
        </b-table-column>
        <b-table-column sortable field="draws" label="D"
                        meta="Matches draw" width="1" centered numeric>
          {{ props.row.draws }}
        </b-table-column>
        <b-table-column sortable field="loses" label="L"
                        meta="Matches lost" width="1" centered numeric>
          {{ props.row.loses }}
        </b-table-column>
        <b-table-column sortable field="balance" label="B "
                        meta="Score balance" width="1" centered numeric>
          {{ (props.row.balance > 0 ? '+'+props.row.balance : props.row.balance) }}
        </b-table-column>
        <b-table-column sortable field="scored" label="GS-GC"
                        meta="Goals scored/conceded" width="80" centered numeric>
          {{ props.row.scored }}-{{ props.row.lost }}
        </b-table-column>
        <b-table-column sortable field="points" label="PTS"
                        meta="Points" width="1" centered numeric>{{ props.row.points }}
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>
<script>
import * as R from 'ramda';
import { mapGetters } from 'vuex';
import ClubEmblem from '../../clubs/ClubEmblem';

export default {
  name: 'GameTable',
  components: { ClubEmblem },
  props: { game: { type: Object, required: true } },
  data() {
    return {
      sort: { field: 'position', order: 'asc' },
      defaultSort: ['position', 'asc'],
    };
  },
  computed: {
    ...mapGetters(['id', 'isAdmin']),
    isDefaultSort() {
      return R.equals(this.defaultSort, R.values(this.sort));
    },
  },
  methods: {
    rowClass(row, index) {
      return R.cond([
        [R.pathEq(['row', 'id'], this.id), R.always('me')],
        [R.propEq('parity', 0), R.always('even')],
        [R.T, R.always('odd')],
      ])({ row, parity: index % 2 });
    },
    promoted(uid) {
      return R.filter(R.pipe(R.prop('promoted'), R.contains(uid)), this.game.continueIn || []);
    },
    club(uid) {
      return this.game.competitors[uid].club;
    },
    user(uid) {
      return this.game.competitors[uid].user;
    },
    currentSort(field, order) {
      this.sort = { field, order };
    },
  },
};
</script>
<style lang="scss">
@import "../../../style/vars.scss";

.odd {
  background-color: $odd !important;
}

.even {
  background-color: $even !important;
}
.me {
  background-color: $primary-2 !important;
}
.promoted {
  margin-left: 1rem;
}
</style>
