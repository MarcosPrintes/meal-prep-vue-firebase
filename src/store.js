import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import firebase from 'firebase'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  //estado geral da aplicação
  state: {
    recipes: [],
    apiUrl: 'https://api.edamam.com/search',
    user: null,
    isAuthenticated: false,
    userRecipes: [],
    items:[]
  },


  getters:{
    isAuthenticated(state){
      return state.user != null && state.user != undefined
    }
  },

  //mutations, podem mudar o valor do estado, ATUALIZA O STATE
  mutations: {
    setRecipes(state, payload){
      state.recipes = payload
    },
    setUserRecipes(state, payload){
      state.userRecipes = payload
    },
    setUSer(state, payload){
      state.user = payload
    },
    setIsAuthenticated(state, payload){
      state.isAuthenticated = payload
    },
    setItems(state, payload){
      state.items = Object.values(payload)
    }
  },

  //são as possíveis maneiras que o state pode mudar em reação as entradas do usuário a partir da visualização
  actions: {

    getUserRecipesFromFirebase({state, commit}){
      return firebase
      .database()
      .ref('users/'+state.user.user.uid)
      .once('value', snapshot =>{
        commit('setUserRecipes', snapshot.val())
      })
    },
    getItems({state, commit}){
      return firebase
      .database()
      .ref('items/')
      .once('value', snapshot =>{
      // console.log('snapshot => ',snapshot)
      // console.log('snapshot.val() => ', snapshot.val())
      commit('setItems', snapshot.val())
      })
    },
    async getRecipes({state, commit}, plan) {
      try{
        let response = await axios.get(`${state.apiUrl}`, {
          params: {
              q: plan,
              app_id: '4ef17ed8',
              app_key: 'b98abfea625499800a2c5af9073e65bc',
              from: 0,
              to: 9
          }
      })
      commit('setRecipes', response.data.hits)
      }catch(e){
        commit('setRecipes', []);
      }
    },

    userJoin({commit}, {email, password} ){
      firebase  
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        commit('setUSer', user)
        commit('setIsAuthenticated', true)
        router.push('/about')
      })
      .catch( () =>{
        commit('setUSer', null)
        commit('setIsAuthenticated', false)
        router.push('/')
      })
      firebase.messaging()
    },

    userLogin({commit}, {email, password}){
      firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user =>{
        commit('setUSer', user)
        commit('setIsAuthenticated', true)
        router.push('/about')
      })
      .catch ( () =>{
        commit('setUSer', null)
        commit('setIsAuthenticated', false)
        router.push('/')
      })
    },

    userSignOut({commit}){
      firebase
      .auth()
      .signOut()
      .then(() =>{
        commit('setUSer', null)
        commit('setIsAuthenticated', false)        
        router.push('/')
      })
      .catch(()=>{
        commit('setUSer', null)
        commit('setIsAuthenticated', false)  
        router.push('/')
      })

    },

    addRecipe({state}, payload){
      firebase
      .database()
      .ref('users/'+state.user.user.uid)
      .push(payload.recipe.label)

      firebase
      .database()
      .ref('items/')
      .push({
        item_name: 'prod 1',
        type: 'doar'
      })
    
    
    }
  }
})
