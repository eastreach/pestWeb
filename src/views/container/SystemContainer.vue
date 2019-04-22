<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="系统参数" name="TZDParamTable">
        <keep-alive>
          <t-z-d-param-table v-if="activeName=='TZDParamTable'">
          </t-z-d-param-table>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
  import {BaseVue} from '../../extend/BaseVue'
  import TZDParamTable from '../table/TZDParamTable.vue'
  export default {
    name: 'HelpContainer',
    extends: BaseVue,
    components: {
      TZDParamTable,
    },
    methods: {},
    computed: {},
    data() {
      return {
        activeName: 'TZDParamTable',
      };
    },
    mounted(){
    }
  }
</script>
