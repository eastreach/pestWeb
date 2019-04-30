<template>
  <div>
    <el-button type="primary" @click="this.update">保存</el-button>
    <el-button type="primary" @click="this.handleCancel">取 消</el-button>
    <el-form :model="form" ref="form" :rules="formRules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="账号" :label-width="formLabelWidth" prop="account">
            <el-input v-model="form.account" auto-complete="off" :disabled="!ifAdd"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
            <el-input v-model="form.password" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="state" :label-width="formLabelWidth" prop="state">
            <el-input v-model="form.state" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="role" :label-width="formLabelWidth" prop="role">
            <el-input v-model="form.role" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="roleName" :label-width="formLabelWidth" prop="roleName">
            <el-input v-model="form.roleName" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="name" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="telephone" :label-width="formLabelWidth" prop="telephone">
            <el-input v-model="form.telephone" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="place" :label-width="formLabelWidth" prop="place">
            <el-input v-model="form.place" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="province" :label-width="formLabelWidth" prop="province">
            <el-input v-model="form.province" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="city" :label-width="formLabelWidth" prop="city">
            <el-input v-model="form.city" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="areaCode" :label-width="formLabelWidth" prop="areaCode">
            <el-input v-model="form.areaCode" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
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
              let url = self.ifAdd ? "/operator/addBatch" : '/operator/updateBatch';
              self.$http.post(self.gatewayUrl + url, {
                tzdOperator: self.$store.state.tzdOperator,
                tzdOperatorList: JSON.stringify([self.form]),
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

