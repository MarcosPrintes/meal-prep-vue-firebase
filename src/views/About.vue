<template>
    <v-container fluid>
        <v-layout column>
            <h1>My Recipes</h1>
            <div v-for="(item, idx) in userRecipes" class="subheading mb-2" :key="idx">
                {{item}}
            </div>



            <div v-for="(item, idx) in userItems" class="subheading mb-2" :key="idx">
                {{item.item_name}} | {{item.type}}
            </div>
						 <v-flex mt-4>
                <v-btn color="primary" to="/menu">Go To Menu</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template><script>
export default {
    name: 'About',
    computed:{
      userRecipes(){
        return this.$store.state.userRecipes
      },
      userItems(){
        return this.$store.state.items
      }
    },
    mounted(){
    	this.getRecipes()
    },
    methods:{
      getRecipes(){
        this.$store.dispatch('getUserRecipesFromFirebase')
        this.$store.dispatch('getItems')
      }
    }
};
</script><style scoped>
</style>