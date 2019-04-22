<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="关于我们" name="About">
        <keep-alive>
          <about v-if="activeName=='About'"></about>
        </keep-alive>
      </el-tab-pane>
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
  import About from '../About.vue'
  import TZDParamTable from '../table/TZDParamTable.vue'
  export default {
    name: 'HelpContainer',
    extends: BaseVue,
    components: {
      About,
      TZDParamTable,
    },
    methods: {},
    computed: {},
    data() {
      return {
        activeName: 'About',
      };
    },
    mounted(){
    }
  }
</script>
