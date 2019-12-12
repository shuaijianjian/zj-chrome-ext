<template>
  <div class="container">
    <el-card class="card">
      <div class="header">
        <span>卡片名称</span>
        <el-button type="text">操作按钮</el-button>
      </div>
      <div class="content">
        <div v-for="item in 4" :key="item" class="text item">{{'列表内容 ' + item }}</div>
      </div>
    </el-card>
  </div>
</template>
 
<script>
export default {
  name: "app"
};
</script>
 
<style>
.container {
  display: flex;
  width: 300px;
  height: 500px;
}
.card {
  flex: 1;
}
.header {
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 10px;
  border-bottom-color: red;
}
.content {
  flex: 1;
  background-color: green;
}
</style>