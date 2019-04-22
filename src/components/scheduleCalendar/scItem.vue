<template>
  <el-input class="schedule-calendar-detail-text"
            size="mini"
            placeholder="ddd"
            v-model="item.text">
  </el-input>
</template>
<script>
  export default {
    props: {
      item: Object,
      date: Date,
      type: String,
    },
    methods: {}
  }
</script>
<style lang="less">
  @import './variables.less';

  .schedule-calendar-detail-text {
    input {
      border: 1px solid #ccc;
      text-align: center;
    }
  }
</style>
