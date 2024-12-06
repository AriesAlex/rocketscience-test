<template>
  <div class="hotels-filters">
    <div class="title">Страна</div>

    <ElInput
      placeholder="Поиск стран"
      :prefix-icon="Search"
      v-model="countryQuery"
    />

    <ElCheckboxGroup v-model="filters.country" class="countries">
      <div class="not-found" v-if="filteredCountries.length === 0">
        <span>К сожалению, по вашему запросу ничего не найдено :(</span>
      </div>
      <ElScrollbar height="200px" class="scrollable" v-else>
        <ElCheckbox
          v-for="country in filteredCountries"
          class="country"
          :label="country"
          :value="country"
          :key="country"
        />
      </ElScrollbar>
    </ElCheckboxGroup>

    <div class="title">Тип</div>

    <ElCheckboxGroup v-model="filters.type" class="group">
      <ElCheckbox
        v-for="type in availableTypes"
        :label="type"
        :value="type"
        :key="type"
      />
    </ElCheckboxGroup>

    <div class="title">Количество звёзд</div>

    <ElCheckboxGroup class="group" v-model="filters.stars">
      <ElCheckbox
        v-for="star in 5"
        :label="star + ' звёзды'"
        :value="star"
        :key="star"
      />
    </ElCheckboxGroup>

    <div class="title">Количество отзывов (от)</div>

    <ElInputNumber
      style="width: 100%"
      v-model="filters.minReviewsCount"
      :min="0"
      :max="maxReviewsCount"
    />

    <div class="title">Цена</div>

    <div class="price-inputs">
      <ElInput
        type="number"
        v-model="filters.priceRange[0]"
        placeholder="от 0 ₽"
        :min="0"
        :max="maxPrice"
      />
      <div class="seperator" />
      <ElInput
        type="number"
        v-model="filters.priceRange[1]"
        :placeholder="`до ${maxPrice.toLocaleString()} ₽`"
        :min="1"
        :max="maxPrice"
      />
    </div>

    <ElSlider
      v-model="filters.priceRange"
      range
      :min="0"
      :max="maxPrice"
      :format-tooltip="v => v.toLocaleString() + '₽'"
    />

    <div class="buttons">
      <button class="apply-btn" @click="applyFilters">Применить фильтр</button>
      <button class="reset-btn" @click="resetFilters">
        <ElIcon><Close /></ElIcon> <span>Очистить фильтр</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ElInput,
  ElCheckboxGroup,
  ElCheckbox,
  ElScrollbar,
  ElInputNumber,
  ElSlider,
  ElIcon,
} from 'element-plus'
import { Search, Close } from '@element-plus/icons-vue'
import { computed, ref, toRefs } from 'vue'
import { useHotelsStore } from '@/stores/hotels'
const hotelsStore = useHotelsStore()
const {
  filters,
  availableCountries,
  availableTypes,
  maxReviewsCount,
  maxPrice,
  applyFilters,
  resetFilters,
} = toRefs(hotelsStore)

const countryQuery = ref('')
const filteredCountries = computed(() =>
  availableCountries.value.filter(country =>
    country.toLowerCase().includes(countryQuery.value.toLowerCase())
  )
)
</script>

<style lang="scss" scoped>
.hotels-filters {
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: sticky;
  top: 30px;
  max-width: 352px;

  @media (min-width: 600px) {
    width: 380px;
  }

  > .title {
    font-weight: 700;
    color: #3a3a3a;
  }

  > .countries {
    border: 1px solid rgba(234, 234, 234, 1);
    border-radius: 8px;
    padding: 16px;
    height: 200px;
    display: flex;
    flex-direction: column;

    .not-found {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      line-height: 1.2;
      text-align: center;
      color: rgba(134, 134, 134, 1);
    }

    > .scrollable .country {
      width: 90%;
    }
  }

  > .group {
    border: 1px solid rgba(234, 234, 234, 1);
    border-radius: 8px;
    padding: 16px;
    > .el-checkbox {
      width: 100%;
    }
  }

  > .price-inputs {
    display: flex;
    align-items: center;
    gap: 15px;

    > .seperator {
      width: 25px;
      height: 1px;
      background: #c4c4c4;
    }
  }

  > .buttons {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;

    > .apply-btn {
      all: unset;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      padding: 17px 25px;
      background: #6a53f5;
      color: white;
      text-align: center;
      border-radius: 12px;
      cursor: pointer;
      transition: 0.25s all;

      &:hover {
        background: #8b78f7;
      }
    }

    > .reset-btn {
      all: unset;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      padding: 17px 25px;
      background: white;
      color: black;
      text-align: center;
      border-radius: 12px;
      cursor: pointer;
      border: 1px solid rgba(234, 234, 234, 1);
      transition: 0.25s all;

      &:hover {
        background: rgb(241, 241, 241);
      }
    }
  }
}
</style>
