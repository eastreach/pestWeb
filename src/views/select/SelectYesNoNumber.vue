<template>
  <el-select v-model="value"
             clearable
             @change="change"
             placeholder="状态选择">
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
    props: ['default_value'],
    watch: {
      default_value(){
        this.value = this.default_value === undefined ? '' : this.default_value;
      }
    },
    data: function () {
      return {
        value: 0,
        paramList: [
          {
            code: 1,
            name: "是"
          },
          {
            code: 0,
            name: "否"
          },
          {
            code: -1,
            name: "否"
          },
        ]
      }
    },
    methods: {
      change: function (newValue) {
        this.$emit('change', newValue);
      },
    },
    created(){
    },
    mounted(){
      this.value = this.default_value === undefined ? '' : this.default_value;
    }
  }
</script>
