<template>
  <el-select v-model="value"
             clearable
             :filtable="false"
             :filter-method="filterMethod"
             @visible-change="refresh"
             @change="change"
             placeholder="是否使用">
    <el-option
      v-for="item in paramList"
      :key="item.code"
      :label="item.name"
      :value="item.code">
      <span style="float: left">{{ item.name }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data: function () {
      return {
        value: 0,
        paramList: [
          {
            code: 'Y',
            name: "是"
          },
          {
            code: 'N',
            name: "否"
          },
        ]
      }
    },
    props: ['default_value'],
    watch: {
      default_value(){
        this.set_data();
      }
    },
    methods: {
      filterMethod: function (value) {
      },
      refresh: function () {
      },
      change: function (newValue) {
        this.$emit('change', newValue);
      },
      set_data(){
        this.value = this.default_value == undefined ? '' : this.default_value;
      }
    },
    created(){
    },
    mounted(){
      this.set_data();
    }
  }
</script>


<style>

</style>
