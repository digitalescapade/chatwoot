<template>
  <a
    v-if="isLink"
    :key="action.uri"
    class="action-button button"
    :href="action.uri"
    target="_blank"
    rel="noopener nofollow noreferrer"
  >
    {{ action.text }}
  </a>
  <button
    v-else
    :key="action.payload"
    class="action-button button"
    @click="onClick(action.payload)"
  >
    {{ action.text }}
  </button>
</template>

<script>
export default {
  components: {},
  props: {
    action: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    isLink() {
      return this.action.type === 'link';
    },
  },
  methods: {
    onClick(payload) {
		callback = payload.split('.')[0]
		sender_id = payload.split('.')[1]
		escapade_code = payload.split('.')[2]
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", "https://escapade-" + escapade_code + ".herokuapp.com/postback?payload=" + payload + "&sender_id=" + sender_id, true ); // false for synchronous request
		xmlHttp.send( null );
    },
  },
};
</script>

<style scoped lang="scss">
@import '~widget/assets/scss/variables.scss';
@import '~dashboard/assets/scss/mixins.scss';

.action-button {
  align-items: center;
  border-radius: $space-micro;
  display: flex;
  font-weight: $font-weight-medium;
  justify-content: center;
  margin-top: $space-smaller;
  max-height: 34px;
  padding: 0;
  width: 100%;
}
</style>
