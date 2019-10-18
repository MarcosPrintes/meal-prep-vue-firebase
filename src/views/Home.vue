<template>
    <div>
      <home-hero />
      <HomeDetails />
      <home-plans />
    </div>
</template>

<script>
import HomeHero from '@/components/HomeHero'
import HomeDetails from '@/components/HomeDetails'
import HomePlans from '@/components/HomePlans'
export default {
  components:{
    HomeHero,
    HomeDetails,
    HomePlans
  }
};
</script>
