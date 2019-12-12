import Vue from "vue";
import ElementUI, { MessageBox, Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

MessageBox.alert('这是一段内容', '标题名称', {
    confirmButtonText: '确定',
    callback: action => {
        Message({
            type: 'info',
            message: `action:${action}`
        })
    }
});

