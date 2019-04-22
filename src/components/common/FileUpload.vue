<template>

  <div>
    <select-node v-if="this.$store.state.tzdOperator.hotelId == 'root'"
                 v-bind:default_value="this.$store.state.node.code">
    </select-node>
    <select-hms-config
      v-bind:default_value="this.$store.state.hmsConfig.hotelId">
    </select-hms-config>
    <form action="action" method="POST" enctype="multipart/form-data">
      <input type="file" name="file" ref="file_input">
    </form>
    <el-button type="submit" @click="handleCommit">上传</el-button>
  </div>

</template>

<script>

  import SelectNode from '../../views/select/SelectNode.vue';
  import SelectHmsConfig from '../../views/select/SelectHmsConfig.vue';

  export default {
    components: {
      SelectHmsConfig,
      SelectNode,
    },
    methods: {
      //api
      update(data){
        let self = this;
        self.$http.post(self.$store.state.node.url, {
          service: "tzdFileService",
          action: "update",
          tzdFileList: JSON.stringify(data.tzdFileList),
          tzdOperator: self.$store.state.tzdOperator,
        }).then((res) => {
          if (res.data.state === "success") {
            this.$message.success('操作成功');
          } else {
            this.$message.success('操作失败:' + res.data.msg);
          }
        }).catch((e) => {
          this.$message.success('操作失败:' + e);
        });
      },
      handleCommit(){
        let self = this;
        if (self.$store.state.hmsConfig.hotelId == '') {
          self.$message.success('请选择酒店ID');
          return;
        }
        var xhr = new XMLHttpRequest();
        var formData = new FormData();
        var fileInput = this.$refs.file_input;
        var files = fileInput.files;
        if (!files) {
          self.$message.success('请先选择图片，再上传！');
          return
        }
        formData.append('hotelId', self.$store.state.hmsConfig.hotelId);
        formData.append("file", files[0], files[0].name);
        xhr.open('POST', self.action);
        xhr.onload = () => {
          if (xhr.status === 200) {
            xhr = null;
            self.update({
              tzdFileList: [{
                hotelId: self.$store.state.hmsConfig.hotelId,
                url: self.host + "/" + self.$store.state.hmsConfig.hotelId + "-" + files[0].name,
                mime: "image",
                fullFileName: files[0].name,
              }],
            });
            self.$emit('close');
          } else {
            self.$message.success('图片上传失败！');
          }
        };
        xhr.send(formData);
      }
    },
    computed: {},
    data() {
      return {
        host: 'http://media.eastreach.com:3000',
        action: 'http://media.eastreach.com:3000/upload',
      };
    },
    mounted(){
    }
  }
</script>


<style>

</style>
