<template>
  <div>
    <el-dialog v-dialogDrag :visible.sync="dialogFormVisible">
      <div class="dialog-title"></div>
      <t-r-stat-pest-form
        v-bind:form="row"
        v-bind:ifAdd="ifAdd"
        @close="dialogFormVisible=false">
      </t-r-stat-pest-form>
    </el-dialog>
    <div>
      <el-row>
        <el-col :span="4">
          <el-input v-model="code" placeholder="代码" clearable></el-input>
        </el-col>
        <el-col :span="4">
          <el-input v-model="memo" placeholder="备注" clearable></el-input>
        </el-col>
      </el-row>
    </div>

    <div>
      <el-button type="primary" @click="this.selectPage">搜索</el-button>
      <el-button type="primary" @click="this.handleAdd">新增</el-button>
      <el-button type="primary" @click="this.update" :disabled="!ifSelectRows">保存</el-button>
      <el-button type="primary" @click="this.delete" :disabled="!ifSelectRows">删除</el-button>
    </div>

    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <!--右键菜单-->
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="handleCommand('handleEdit')">详情</v-contextmenu-item>
    </v-contextmenu>

    <div class="crs_body" ref="crs_body_dom" v-bind:style="{height:crs_body_height+'px'}">
      <el-table
        id="tableId"
        ref="multipleTable"
        v-contextmenu:contextmenu
        :data="rows"
        stripe
        border
        tooltip-effect="dark"
        :max-height="crs_body_height"
        highlight-current-row
        @selection-change="handleSelectionChange"
        @row-contextmenu="handleRowContextMenu"
        @row-dblclick="handleRowDBClick"
        @row-click="handleRowClick"
        @cell-dblclick="handleCellDBClick"
        v-loading="loading"
        element-loading-text="拼命加载中"
        style="width: 100%">

        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          width="80">
        </el-table-column>
        <el-table-column
          sortable
          prop="state"
          width="80"
          label="状态">
        </el-table-column>
        <el-table-column
          sortable
          prop="code"
          label="代码"
          width="100">
        </el-table-column>
        <el-table-column
          sortable
          prop="name"
          width="100"
          label="名称">
        </el-table-column>
        <el-table-column
          sortable
          prop="dt"
          width="100"
          label="上传时间">
        </el-table-column>
        <el-table-column
          sortable
          prop="year"
          width="100"
          label="year">
        </el-table-column>
        <el-table-column
          sortable
          prop="month"
          width="100"
          label="month">
        </el-table-column>
        <el-table-column
          sortable
          prop="areaCode"
          width="100"
          label="areaCode">
        </el-table-column>
        <el-table-column
          sortable
          prop="grainCode"
          width="100"
          label="grainCode">
        </el-table-column>
        <el-table-column
          sortable
          prop="pestCode"
          width="100"
          label="pestCode">
        </el-table-column>
        <el-table-column
          sortable
          prop="pestValue"
          width="100"
          label="pestValue">
        </el-table-column>
        <el-table-column
          sortable
          prop="longitude"
          width="100"
          label="longitude">
        </el-table-column>
        <el-table-column
          sortable
          prop="latitude"
          width="100"
          label="latitude">
        </el-table-column>
        <el-table-column
          sortable
          prop="temperature"
          width="100"
          label="temperature">
        </el-table-column>
        <el-table-column
          sortable
          prop="humidity"
          width="100"
          label="humidity">
        </el-table-column>
        <el-table-column
          sortable
          prop="role"
          width="100"
          label="role">
        </el-table-column>
        <el-table-column
          sortable
          prop="depotCode"
          width="100"
          label="depotCode">
        </el-table-column>
        <el-table-column
          sortable
          prop="province"
          width="100"
          label="province">
        </el-table-column>
        <el-table-column
          sortable
          prop="city"
          width="100"
          label="city">
        </el-table-column>
        <el-table-column
          sortable
          prop="memo"
          label="备注">
        </el-table-column>

        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="danger"
              @click="handleEdit(scope.row)">详情
            </el-button>
            <el-dropdown trigger="click" @command="handleCommand">
              <el-button
                size="small"
                type="danger">更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="handleEdit">详情</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>

        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="备注">
                <span>{{ props.row.memo }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>


      </el-table>
    </div>

  </div>

</template>

<script>


  import {BaseVueTable} from '../../extend/BaseVueTable'
  import TRStatPestForm from '../form/TRStatPestForm.vue';
  export default {
    extends: BaseVueTable,
    components: {
      TRStatPestForm,
    },
    methods: {
      //api
      selectPage() {
        let self = this;
        self.loading = true;
        self.$http.post(self.gatewayUrl + '/statPest/selectPage', {
          tzdOperator: self.$store.state.tzdOperator,
          pageSize: self.pageSize,
          currentPage: self.currentPage,
          code: self.code,
          memo: self.memo,
        }).then((res) => {
          self.loading = false;
          if (res.data.state === "success") {
            self.total = res.data.data.totalElements;
            self.rows = res.data.data.content;
          } else {
            self.$message.success('操作失败:' + res.data.msg);
          }
        }).catch((e) => {
          self.loading = false;
          self.$message.success('操作失败:' + e);
        });
      },
      update(){
        let self = this;
        self.$confirm('是否继续操作', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$http.post(self.gatewayUrl + '/statPest/updateBatch', {
            tzdOperator: self.$store.state.tzdOperator,
            trStatPestList: JSON.stringify(self.multipleSelection),
          }).then((res) => {
            if (res.data.state === "success") {
              self.$message.success('操作成功');
            } else {
              self.$message.success('操作失败:' + res.data.msg);
            }
          });
        }).catch((e) => {
          self.$message.success('操作失败:' + e);
        });

      },
      delete(){
        let self = this;
        self.$confirm('是否继续操作', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$http.post(self.gatewayUrl + '/statPest/deleteBatch', {
            tzdOperator: self.$store.state.tzdOperator,
            trStatPestList: JSON.stringify(self.multipleSelection),
          }).then((res) => {
            if (res.data.state === "success") {
              self.selectPage();
              self.$message.success('操作成功');
            } else {
              self.$message.success('操作失败:' + res.data.msg);
            }
          });
        }).catch((e) => {
          self.$message.success('操作失败:' + e);
        });
      },

      //table
      handleEdit(row) {
        let self = this;
        self.row = row;
        self.ifAdd = false;
        this.dialogFormVisible = true;
      },
      handleAdd() {
        let self = this;
        self.row = {};
        self.ifAdd = true;
        self.dialogFormVisible = true;
      },

    },
    computed: {},
    data: function () {
      return {
        //api
        code: '',
        memo: '',
        dialogFormVisible: false,
      }
    },

    beforeMount() {
    },
    mounted(){
    },
    activated(){
      this.resize();
    },

  }
</script>
