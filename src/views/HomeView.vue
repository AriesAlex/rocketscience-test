<template>
  <div id="home-view">
    <div class="container">
      <div class="filters">
        <HotelsFilters />
      </div>
      <HotelsList />
    </div>
  </div>
</template>

<script setup lang="ts">
import HotelsFilters from '@/components/HotelsFilters.vue'
import HotelsList from '@/components/HotelsList.vue'
</script>

<style lang="scss" scoped>
#home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;

  > .container {
    max-width: 1152px;
    margin: 56px 0;
    display: flex;
    gap: 80px;

    @media (max-width: 1152px) {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
