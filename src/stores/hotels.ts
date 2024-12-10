import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import hotelsData from '@/assets/hotels.json'
import type { Hotel } from '@/interfaces/Hotel'

export const useHotelsStore = defineStore('hotels', () => {
  const hotels = ref<Hotel[]>(hotelsData)
  const filteredHotels = ref<Hotel[]>(hotelsData)

  const maxPrice = computed(() => {
    return Math.max(...hotels.value.map(hotel => hotel.min_price))
  })

  function getFiltersInitialState() {
    return {
      country: [] as string[],
      type: [] as string[],
      stars: [] as number[],
      minReviewsCount: 0,
      priceRange: [0, maxPrice.value] as [number, number],
    }
  }
  const filters = reactive(getFiltersInitialState())

  function resetFilters() {
    Object.assign(filters, getFiltersInitialState())
    applyFilters()
  }

  // Было бы лучше использовать computed свойство, но
  // по тз требуется чтобы фильтры применять только
  // при нажатии на кнопку
  function applyFilters() {
    filteredHotels.value = hotels.value.filter(hotel => {
      if (
        filters.country.length > 0 &&
        !filters.country.includes(hotel.country)
      ) {
        return false
      }

      if (filters.type.length > 0 && !filters.type.includes(hotel.type)) {
        return false
      }

      if (filters.stars.length > 0 && !filters.stars.includes(hotel.stars)) {
        return false
      }

      if (hotel.reviews_amount < filters.minReviewsCount) {
        return false
      }

      const [minPrice, maxPrice] = filters.priceRange
      if (hotel.min_price < minPrice || hotel.min_price > maxPrice) {
        return false
      }

      return true
    })
  }

  const availableCountries = computed(() => [
    ...new Set(hotels.value.map(hotel => hotel.country)),
  ])
  const availableTypes = computed(() => [
    ...new Set(hotels.value.map(hotel => hotel.type)),
  ])

  const maxReviewsCount = computed(() => {
    return Math.max(...hotels.value.map(hotel => hotel.reviews_amount))
  })

  return {
    hotels,
    filteredHotels,
    filters,
    applyFilters,
    resetFilters,
    availableCountries,
    availableTypes,
    maxReviewsCount,
    maxPrice,
  }
})
