<template>
  <div id="qrcode"></div>
</template>

<script>
  import QRCode from 'qrcodejs2'
  export default {
    components: {},
    data(){
      return {}
    },
    methods: {
      //api
      qrcode () {
        let self = this;
        let qrcode = new QRCode('qrcode', {
          width: 250,
          height: 250,
          text: self.getUrlKey('code')
        });
      },
      getUrlKey: function (name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || '';
      },
    },
    created(){
    },
    mounted(){
      this.qrcode();
    }
  }
</script>
