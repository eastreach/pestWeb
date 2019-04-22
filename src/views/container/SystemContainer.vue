<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="系统参数" name="TZDParamTable">
        <keep-alive>
          <t-z-d-param-table v-if="activeName=='TZDParamTable'">
          </t-z-d-param-table>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="资源配置" name="TZDUrlTable">
        <keep-alive>
          <t-z-d-url-table v-if="activeName=='TZDUrlTable'">
          </t-z-d-url-table>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="系统日志" name="TZDLogTable">
        <keep-alive>
          <t-z-d-log-table v-if="activeName=='TZDLogTable'">
          </t-z-d-log-table>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="区域" name="TZDAreaTable">
        <keep-alive>
          <t-z-d-area-table v-if="activeName=='TZDAreaTable'">
          </t-z-d-area-table>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="粮仓" name="TZDDepotTable">
        <keep-alive>
          <t-z-d-depot-table v-if="activeName=='TZDDepotTable'">
          </t-z-d-depot-table>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="粮食" name="TZDGrainTable">
        <keep-alive>
          <t-z-d-grain-table v-if="activeName=='TZDGrainTable'">
          </t-z-d-grain-table>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="害虫" name="TZDPestTable">
        <keep-alive>
          <t-z-d-pest-table v-if="activeName=='TZDPestTable'">
          </t-z-d-pest-table>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="操作员" name="TZDOperatorTable">
        <keep-alive>
          <t-z-d-operator-table v-if="activeName=='TZDOperatorTable'">
          </t-z-d-operator-table>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="操作员权限" name="TZDOperatorLimitTable">
        <keep-alive>
          <t-z-d-operator-limit-table v-if="activeName=='TZDOperatorLimitTable'">
          </t-z-d-operator-limit-table>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
  import {BaseVue} from '../../extend/BaseVue'
  import TZDParamTable from '../table/TZDParamTable.vue'
  import TZDUrlTable from '../table/TZDUrlTable.vue'
  import TZDLogTable from '../table/TZDLogTable.vue'
  import TZDAreaTable from '../table/TZDAreaTable.vue'
  import TZDDepotTable from '../table/TZDDepotTable.vue'
  import TZDGrainTable from '../table/TZDGrainTable.vue'
  import TZDPestTable from '../table/TZDPestTable.vue'
  import TZDOperatorTable from '../table/TZDOperatorTable.vue'
  import TZDOperatorLimitTable from '../table/TZDOperatorLimitTable.vue'
  export default {
    name: 'HelpContainer',
    extends: BaseVue,
    components: {
      TZDParamTable,
      TZDUrlTable,
      TZDLogTable,
      TZDAreaTable,
      TZDDepotTable,
      TZDGrainTable,
      TZDPestTable,
      TZDOperatorTable,
      TZDOperatorLimitTable,
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
