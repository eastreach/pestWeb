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
      'if_hotelId_root',
      'if_code_root',
      'if_group',
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
