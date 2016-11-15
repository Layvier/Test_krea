import Vue from 'vue'
import App from './App.vue'


function quote_calculator(element_id) {
    return new Vue({
        el: '#' + element_id,
        render: h => h(App)
    });
}
quote_calculator('app');