<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="信息发布" name="TPublishInfoTable">
        <keep-alive>
          <t-publish-info-table v-if="activeName=='TPublishInfoTable'">
          </t-publish-info-table>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="问题反馈" name="TQuestionTable">
        <keep-alive>
          <t-question-table v-if="activeName=='TQuestionTable'">
          </t-question-table>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="害虫统计" name="TRStatPestTable">
        <keep-alive>
          <t-r-stat-pest-table v-if="activeName=='TRStatPestTable'">
          </t-r-stat-pest-table>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="作物统计" name="TRStatGrainTable">
        <keep-alive>
          <t-r-stat-grain-table v-if="activeName=='TRStatGrainTable'">
          </t-r-stat-grain-table>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
  import {BaseVue} from '../../extend/BaseVue'
  import TPublishInfoTable from '../table/TPublishInfoTable.vue'
  import TQuestionTable from '../table/TQuestionTable.vue'
  import TRStatPestTable from '../table/TRStatPestTable.vue'
  import TRStatGrainTable from '../table/TRStatGrainTable.vue'
  export default {
    name: 'DataContainer',
    extends: BaseVue,
    components: {
      TPublishInfoTable,
      TQuestionTable,
      TRStatPestTable,
      TRStatGrainTable,
    },
    methods: {},
    computed: {},
    data() {
      return {
        activeName: 'TPublishInfoTable',
      };
    },
    mounted(){
    }
  }
</script>
