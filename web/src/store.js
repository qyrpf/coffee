import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state:{
		cartCount:0
	},
	mutations:{
		initCartCount(state,cartCount){
            state.cartCount = cartCount;
		},
        updateCartCount(state,count){
            state.cartCount += count;
        }
	}
});
export default store;