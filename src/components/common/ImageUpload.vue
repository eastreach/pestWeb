<template>
  <el-upload
    class="avatar-uploader"
    :action="action"
    :show-file-list="false"
    :data="formData"
    accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.PNG,.JPEG,.GIF,.BMP"
    :before-upload="beforeUpload"
    :on-success="handleSuccess">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
  export default {
    components: {},
    mounted(){
      this.initData();
    },
    props: ['form', 'imageField'],
    watch: {
      form: {
        deep: true,
        handler(){
          this.initData();
        },
      },
      imageField: {
        handler(){
          this.initData();
        },
      },
    },
    data() {
      return {
//        host: 'http://media.eastreach.com:3000/',
//        action: 'http://media.eastreach.com:3000/upload',
        imageUrl: '',
        action: 'http://47.94.239.49:3000/fileUploadGateWay/upload',
        formData: {
          appId: 'test_v9',
          appSecret: 'test_v9',
          hotelId: '',
        }
      };
    },
    methods: {
      initData(){
        this.imageUrl = (this.form === undefined || this.imageField === undefined) ? '' : this.form[this.imageField];
      },
      handleSuccess(res, file) {
        let self = this;
        if (res.data.state === 'success') {
          this.form[this.imageField] = res.data.data;
        }
      },
      beforeUpload(file) {
        let self = this;
        if (!self.form.hotelId) {
          self.$message.error('为指定酒店ID');
          return false;
        }
        self.formData.hotelId = self.form.hotelId;
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过2MB!');
          return false;
        }
        self.form.uuid = UUID();
        return true;
      },
    },
  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
