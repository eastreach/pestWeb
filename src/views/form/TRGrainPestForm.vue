<template>
  <div>
    <el-button type="primary" @click="this.update">保存</el-button>
    <el-button type="primary" @click="this.handleCancel">取 消</el-button>
    <el-form :model="form" ref="form" :rules="formRules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="grainCode" :label-width="formLabelWidth" prop="grainCode">
            <el-input v-model="form.grainCode" auto-complete="off" :disabled="!ifAdd"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="grainName" :label-width="formLabelWidth" prop="grainName">
            <el-input v-model="form.grainName" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="pestCode" :label-width="formLabelWidth" prop="pestCode">
            <el-input v-model="form.pestCode" auto-complete="off" :disabled="!ifAdd"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="pestName" :label-width="formLabelWidth" prop="pestName">
            <el-input v-model="form.pestName" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="name" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="state" :label-width="formLabelWidth" prop="state">
            <el-input v-model="form.state" auto-complete="off"></el-input>
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
    props: ['form', 'ifAdd'],
    computed: {},
    data: function () {
      return {
        formLabelWidth: '120px',
        formRules: {
          code: [
            {required: true, message: '请填写代码', trigger: 'blur'}
          ],
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
              let url = self.ifAdd ? "/grainPest/addBatch" : '/grainPest/updateBatch';
              self.$http.post(self.gatewayUrl + url, {
                tzdOperator: self.$store.state.tzdOperator,
                trGrainPestList: JSON.stringify([self.form]),
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

