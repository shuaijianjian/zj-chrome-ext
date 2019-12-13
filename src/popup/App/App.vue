
<template>
  <div class="container">
    <div class="header">这是一个popup页面!!!</div>
    <div class="content">
      <div class="col">
        <div class="col-left">background</div>
        <div class="col-right">
          <el-button size="mini" type="text" @click="openBg()">打开background</el-button>
          <el-button size="mini" type="text" @click="callBgFun()">bug->调用bg页JS方法</el-button>
          <el-button size="mini" type="text" @click="getBgTitle()">获取bg页的标题</el-button>
          <el-button size="mini" type="text" @click="setBgTitle()">设置bg页标题</el-button>
        </div>
      </div>
      <div class="col">
        <div class="col-left">窗口操作演示</div>
        <div class="col-right">
          <el-button size="mini" type="text" @click="openNewWindow()">新窗口打开百度</el-button>
          <el-button size="mini" type="text" @click="customWindowSize()">执行简单的窗口动画</el-button>
          <el-button size="mini" type="text" @click="maxCurrentWindow()">将当前窗口最大化</el-button>
          <el-button size="mini" type="text" @click="minCurrentWindow()">将当前窗口最小化</el-button>
          <el-button size="mini" type="text" @click="closeCurrentWindow()">关闭当前窗口所有标签(慎点)</el-button>
        </div>
      </div>
      <div class="col">
        <div class="col-left">标签操作演示</div>
        <div class="col-right">
          <el-button size="mini" type="text" @click="openUrlNewTab()">新标签打开百度</el-button>
          <el-button size="mini" type="text" @click="openUrlCurrentTab()">当前标签打开网页</el-button>
          <el-button size="mini" type="text" @click="getCurrentTabId()">获取当前标签页ID</el-button>
          <el-button size="mini" type="text" @click="highlightTab()">切换到第一个标签</el-button>
        </div>
      </div>
      <div class="col">
        <div class="col-left">popup与content-script交互</div>
        <div class="col-right">
          <el-button size="mini" type="text" @click="sendMsgToContent()">短连接发送消息到content-script</el-button>
          <el-button size="mini" type="text" @click="connectToContent()">长连接发送消息到content-script</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      params001: 100
    };
  },
  methods: {
    // background
    openBg() {
      window.open(chrome.extension.getURL("background.html"));
    },
    callBgFun() {
      const bg = chrome.extension.getBackgroundPage();
      console.log("===========getBackgroundPage=========================");
      console.log(bg);
      console.log("===========getBackgroundPage=========================");
      bg.testBackground();
    },
    getBgTitle() {
      const bg = chrome.extension.getBackgroundPage();
      this.$message(bg.document.title);
    },
    setBgTitle() {
      const bg = chrome.extension.getBackgroundPage();
      var title = prompt("请输入background的新标题：", "这是新标题");
      bg.document.title = title;
    },
    // 窗口操作演示
    openNewWindow() {
      chrome.windows.create({ state: "maximized" });
    },
    customWindowSize() {
      chrome.windows.getCurrent({}, currentWindow => {
        var startLeft = 10;

        chrome.windows.update(currentWindow.id, {
          left: startLeft * 10,
          top: 100,
          width: 800,
          height: 600
        });
        var inteval = setInterval(() => {
          if (startLeft >= 40) clearInterval(inteval);

          chrome.windows.update(currentWindow.id, { left: ++startLeft * 10 });
        }, 100);
      });
    },
    maxCurrentWindow() {
      chrome.windows.getCurrent({}, currentWindow => {
        // state: 可选 'minimized', 'maximized' and 'fullscreen'

        chrome.windows.update(currentWindow.id, { state: "maximized" });
      });
    },
    minCurrentWindow() {
      chrome.windows.getCurrent({}, currentWindow => {
        // state: 可选 'minimized', 'maximized' and 'fullscreen'

        chrome.windows.update(currentWindow.id, { state: "minimized" });
      });
    },
    closeCurrentWindow() {
      chrome.windows.getCurrent({}, currentWindow => {
        chrome.windows.remove(currentWindow.id);
      });
    },
    // 标签操作演示
    openUrlNewTab() {
      chrome.tabs.create({ url: "https://www.baidu.com" });
    },
    openUrlCurrentTab() {
      this.getTab(tabId => {
        chrome.tabs.update(tabId, { url: "http://www.so.com" });
      });
    },
    getCurrentTabId() {
      this.getTab(tabId => {
        this.$message("获取当前标签ID ==>  " + tabId);
      });
    },
    highlightTab() {
      chrome.tabs.highlight({ tabs: 0 });
    },

    // popup与content-script交互
    sendMsgToContent() {
      this.sendMessageToContentScript("你好，我是popup！", response => {
        if (response) {
          this.$message("收到来自content-script的回复： " + response);
        }
      });
    },
    connectToContent() {
      console.log("===========connectToContent=========================");
    },
    // 获取当前选项卡ID
    getTab(callback) {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (callback) {
          callback(tabs.length ? tabs[0].id : null);
        }
      });
    },
    sendMessageToContentScript(message, callback) {
      this.getTab(tabId => {
        console.log('==============tabId======================');
        console.log(tabId);
        console.log('==============tabId======================');
        chrome.runtime.sendMessage(tabId, message, function(response) {
          if (callback) callback(response);
        });
      });
    }
  }
};
</script>
 
<style>
.container {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 500px;
}
.header {
  display: flex;
  height: 44px;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-bottom: 0.5px solid gray;
}
.content {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.col {
  display: flex;
  border-bottom: 1px solid gray;
}
.col-left {
  display: flex;
  flex: 1;
  background-color: cyan;
  justify-content: center;
  align-items: center;
}
.col-right {
  /* display: flex; */
  flex: 3;
  background-color: yellow;
}
</style>