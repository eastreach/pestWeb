<template>
  <div>
    <el-button type="primary" @click="this.update">保存</el-button>
    <el-button type="primary" @click="this.handleCancel">取 消</el-button>
    <el-form :model="form" ref="form" :rules="formRules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="代码" :label-width="formLabelWidth" prop="url">
            <el-input v-model="form.url" auto-complete="off" :disabled="!ifAdd"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form.memo" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

  </div>
</template>

<script>
  import {BaseVueForm} from '../../extend/BaseVueForm'
  export default {
    extends: BaseVueForm,
    components: {},
    props: ['form','ifAdd'],
    computed: {},
    data: function () {
      return {
        formLabelWidth: '120px',
        formRules: {
          hotelId: [
            {required: true, message: '请填写酒店Id', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请填写代码', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请填写名称', trigger: 'blur'}
          ]
        }

      }
    },
    methods: {
      update(){
        let self = this;
        self.$refs.form.validate((valid) => {
          if (valid) {
            self.$confirm('是否继续操作', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              self.$http.post(self.$store.state.node.url, {
                service: "tzdParamService",
                action: "update",
                tzdParamList: JSON.stringify([self.form]),
                tzdOperator: self.$store.state.tzdOperator,
              }).then((res) => {
                if (res.data.state === "success") {
                  self.$message.success('操作成功');
                  self.$emit('close');
                } else {
                  self.$message.success('操作失败:' + res.data.msg);
                }
              });
            }).catch((e) => {
              self.$message.success('操作失败:' + e);
            });
          } else {
            self.$message.success('数据错误');
            return false;
          }
        });
      },
      handleCancel(){
        let self = this;
        self.$emit('close');
      },
    },

  }
</script>

