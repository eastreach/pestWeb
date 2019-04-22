import Vue from 'vue'
import {mapGetters} from 'vuex'

export const BaseVue = Vue.extend({
  components: {
  },
  beforeMount() {
  },
  mounted() {
  },
  beforeCreate() {
  },
  created() {
  },
  activated(){
  },
  computed: {
    ...mapGetters([
      'tzdOperator',
      'gatewayUrl',
    ]),
  },
  watch: {},
  data: function () {
    return {}
  },
  methods: {
    handleBeforeMount(){
    },
    handleMount(){
    },
    handleBeforeCreate(){
    },
    handleCreated(){
    },
    handleActivated(){
    },
  }
});
