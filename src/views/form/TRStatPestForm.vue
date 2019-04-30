<template>
  <div>
    <el-button type="primary" @click="this.update">保存</el-button>
    <el-button type="primary" @click="this.handleCancel">取 消</el-button>
    <el-form :model="form" ref="form" :rules="formRules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="代码" :label-width="formLabelWidth" prop="code">
            <el-input v-model="form.code" auto-complete="off" :disabled="!ifAdd"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="year" :label-width="formLabelWidth" prop="year">
            <el-input v-model="form.year" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="month" :label-width="formLabelWidth" prop="month">
            <el-input v-model="form.month" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="areaCode" :label-width="formLabelWidth" prop="areaCode">
            <el-input v-model="form.areaCode" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="grainCode" :label-width="formLabelWidth" prop="grainCode">
            <el-input v-model="form.grainCode" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="pestCode" :label-width="formLabelWidth" prop="pestCode">
            <el-input v-model="form.pestCode" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="pestValue" :label-width="formLabelWidth" prop="pestValue">
            <el-input v-model="form.pestValue" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="longitude" :label-width="formLabelWidth" prop="longitude">
            <el-input v-model="form.longitude" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="latitude" :label-width="formLabelWidth" prop="latitude">
            <el-input v-model="form.latitude" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="temperature" :label-width="formLabelWidth" prop="temperature">
            <el-input v-model="form.temperature" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="humidity" :label-width="formLabelWidth" prop="humidity">
            <el-input v-model="form.humidity" auto-complete="off"></el-input>
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
          <el-form-item label="role" :label-width="formLabelWidth" prop="role">
            <el-input v-model="form.role" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="depotCode" :label-width="formLabelWidth" prop="depotCode">
            <el-input v-model="form.depotCode" auto-complete="off"></el-input>
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
              let url = self.ifAdd ? "/statPest/addBatch" : '/statPest/updateBatch';
              self.$http.post(self.gatewayUrl + url, {
                tzdOperator: self.$store.state.tzdOperator,
                trStatPestList: JSON.stringify([self.form]),
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

