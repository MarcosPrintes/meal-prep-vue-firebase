<template>
   <div>
       <home-plans />
       <meal-recipes />
   </div>
</template>
<script>
import HomePlans from '@/components/HomePlans'
import MealRecipes from '@/components/MealRecipes'

export default {
 
  components:{
    HomePlans,
    MealRecipes
  }
}
</script>