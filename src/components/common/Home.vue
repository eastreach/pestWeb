<template>
  <div class="wrapper">
    <v-head v-on:showCollapseChange="showCollapseChange"></v-head>
    <v-sidebar></v-sidebar>

    <div v-bind:class="{content_show:contentShow,content_hide:contentHide}">
      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>

    <!--<div class="content">-->
    <!--<transition name="move" mode="out-in"><router-view></router-view></transition>-->
    <!--</div>-->
  </div>
</template>

<script>
  import vHead from './Header.vue';
  import vSidebar from './Sidebar.vue';
  export default {
    components: {
      vHead, vSidebar
    },
    data(){
      return {
        contentShow: true,
        contentHide: false,
      }
    },
    methods: {
      showCollapseChange: function (data) {
        this.contentShow = !this.contentShow;
        this.contentHide = !this.contentHide;
      }
    },
    mounted(){
      let self = this;
      if (self.$store.state.tzdOperator == undefined || self.$store.state.tzdOperator.hotelId == undefined || self.$store.state.tzdOperator.hotelId == '') {
        self.$router.push('/login');
      }
    },
    activated(){
    },
  }
</script>
