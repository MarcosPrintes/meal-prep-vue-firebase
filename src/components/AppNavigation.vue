<template>
  <div>

    <v-navigation-drawer app v-model="drawer" class="brown lighten-2" dark disable-resize-watcher>
      <v-list>        
        <v-list-item v-for="(item, index) in items" :key="index" link >
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <v-app-bar app color="brown darken-4" dark>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer" ></v-app-bar-nav-icon>
      <v-spacer class="hidden-md-and-up" />
      <v-toolbar-title>{{ appTitle }}</v-toolbar-title>
      <v-btn to="/menu" class="hidden-sm-and-down" text>
        Menu
      </v-btn>
      <v-spacer class="hidden-sm-and-down" />
        <v-btn @click="ask"  text> ASK PERMISSION </v-btn>
      <div v-if="!isAuthenticated" class="hidden-sm-and-down">
        <v-btn to="/sigin"  text> SIGN-IN </v-btn>
        <v-btn to="/join" color="brown lighten-3"> JOIN </v-btn>
      </div>
      <div v-else>
        <v-btn text to="/about">PROFILE</v-btn>
        <v-btn outlined color="white" @click="logout">Logout</v-btn>
      </div>    
    </v-app-bar>
  
  </div>
</template>

<script>

import { askForPermissioToReceiveNotifications } from '../firebase/index'

export default {
  name: 'AppNavigation',
  data: () => ({
    appTitle: 'Meal Prep',
    drawer: false,
    items:[
      {title: 'Menu'},  
      {title: 'Sign In'},
      {title: 'Joib'}
    ]
  }),
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('userSignOut');
    },
    ask(){
      askForPermissioToReceiveNotifications()
    }
  }
}
</script>
  
  <style lang="scss" scoped>
  
  </style>