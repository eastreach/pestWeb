<template>

  <div>

    <el-button type="primary" @click="this.open">打开</el-button>
    <el-button type="primary" @click="this.close">关闭</el-button>
    <el-button type="primary" @click="this.sub">订阅</el-button>
    <el-input v-model="wsUrl" placeholder="webSocket地址" clearable></el-input>
  </div>

</template>

<script>

  export default {
    data() {
      return {
        websock: null,
        content: '',
        wsUrl: 'ws://127.0.0.1:8081/websocket',
      }
    },
    methods: {
      threadPoxi(){  // 实际调用的方法
        //参数
        const agentData = "mymessage";
        //若是ws开启状态
        if (this.websock.readyState === this.websock.OPEN) {
          this.websocketsend(agentData)
        }
        // 若是 正在开启状态，则等待300毫秒
        else if (this.websock.readyState === this.websock.CONNECTING) {
          let that = this;//保存当前对象this
          setTimeout(function () {
            that.websocketsend(agentData)
          }, 300);
        }
        // 若未开启 ，则等待500毫秒
        else {
          this.initWebSocket();
          let that = this;//保存当前对象this
          setTimeout(function () {
            that.websocketsend(agentData)
          }, 500);
        }
      },
      initWebSocket(){
        let self = this;
        self.websock = new WebSocket(self.wsUrl);
        self.websock.onmessage = this.websocketonmessage;
        self.websock.onclose = this.websocketclose;
      },
      sub(){
        let self = this;
        if (self.websock == null) {
          self.initWebSocket();
        }
        self.websock.send(JSON.stringify({
          service: 'webSocketService',
          action: 'SUB',
          tzdOperator: self.$store.state.tzdOperator,
        }))
      },
      websocketonmessage(e){ //数据接收
        console.log(e.data);
      },
      websocketsend(agentData){//数据发送
        this.websock.send(agentData);
      },
      websocketclose(e){  //关闭
        console.log("connection closed (" + e.code + ")");
      },
      open(){
        this.initWebSocket()

      },
      close(){
        this.websocketclose();
      },
      send(){
        let self = this;
        self.websocketsend(self.content);
      },
    },
    created(){
    }

  }
</script>
