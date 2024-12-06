<template>
  <div class="hotels-list" v-if="filteredHotels.length > 0">
    <div class="hotel" v-for="hotel in currentPageHotels" :key="hotel.name">
      <div class="left">
        <h2 class="title">{{ hotel.name }}</h2>
        <div class="info">
          <ElRate v-model="hotel.stars" disabled />
          <div class="type">
            {{ hotel.type }} • {{ hotel.reviews_amount }} отзыва
          </div>
          <ElTooltip class="location" :content="hotel.address">
            <div>
              <ElIcon><Location /></ElIcon>
              <div class="label">{{ hotel.country }}</div>
            </div>
          </ElTooltip>
        </div>
        <div class="description">{{ hotel.description }}</div>
      </div>

      <div class="right">
        <div class="price">
          {{ Math.round(hotel.min_price).toLocaleString() }} ₽
        </div>
        <div class="label">Цена за 1 ночь</div>
        <button>
          <ElIcon><Calendar /></ElIcon> <span>Забронировать</span>
        </button>
      </div>
    </div>

    <ElPagination
      v-model:current-page="currentPage"
      layout="prev, pager, next"
      :total="filteredHotels.length"
      :page-size="HOTELS_PER_PAGE"
    />
  </div>

  <div class="hotels-not-found" v-else>
    <img src="@/assets/NotFound.png" />
    <div class="title">По данным параметрам ничего не найдено</div>
    <div class="description">
      Попробуйте изменить параметры фильтрации или вернуться в общий каталог
    </div>
    <button class="reset-btn" @click="resetFilters">Очистить фильтр</button>
  </div>
</template>

<script setup lang="ts">
import { useHotelsStore } from '@/stores/hotels'
import { ElIcon, ElPagination, ElRate, ElTooltip } from 'element-plus'
import { Location, Calendar } from '@element-plus/icons-vue'
import { computed, ref, toRefs } from 'vue'
const hotelsStore = useHotelsStore()
const { filteredHotels, resetFilters } = toRefs(hotelsStore)

const HOTELS_PER_PAGE = 3

const currentPage = ref(1)
const currentPageHotels = computed(() => {
  const startIndex = (currentPage.value - 1) * HOTELS_PER_PAGE
  const endIndex = startIndex + HOTELS_PER_PAGE
  return filteredHotels.value.slice(startIndex, endIndex)
})
</script>

<style lang="scss" scoped>
.hotels-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  max-width: 720px;

  > .hotel {
    border: 1px solid #eaeaea;
    border-radius: 15px;
    padding: 25px;
    max-width: 800px;
    display: flex;
    justify-content: space-between;
    gap: 45px;

    @media (max-width: 650px) {
      flex-direction: column;
      align-items: center;
    }

    > .left {
      display: flex;
      flex-direction: column;
      gap: 5px;

      > .title {
        all: unset;
        font-weight: 700;
        font-size: 18px;

        @media (max-width: 650px) {
          flex-direction: column;
          text-align: center;
        }
      }

      > .info {
        display: flex;
        align-items: center;
        gap: 10px;

        @media (max-width: 650px) {
          flex-direction: column;
        }

        > .type {
          color: rgba(134, 134, 134, 1);
        }

        > .location,
        > div {
          display: flex;
          align-items: center;
          gap: 5px;
        }
      }

      > .description {
        text-wrap-style: pretty;
      }
    }

    > .right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      @media (max-width: 650px) {
        flex-direction: column;
        align-items: center;
      }

      > .price {
        white-space: nowrap;
        font-size: 25px;
        font-weight: 700;
      }

      > .label {
        margin-bottom: 15px;
        white-space: nowrap;
        font-size: 14px;
        color: rgba(134, 134, 134, 1);
      }

      > button {
        all: unset;
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 12px 25px;
        background: rgba(106, 83, 245, 0.1);
        color: rgba(106, 83, 245, 1);
        border-radius: 12px;
        cursor: pointer;
        transition: 0.25s all;

        &:hover {
          background: rgba(60, 34, 204, 0.1);
        }
      }
    }
  }
}

.hotels-not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 15px;

  @media (min-width: 651px) {
    margin-top: 150px;
    min-width: 720px;
  }

  > img {
    width: 238px;
    margin-bottom: 15px;
  }

  > .title {
    font-weight: 700;
    font-size: 18px;
    color: #3a3a3a;
  }

  > .description {
    font-weight: 400;
    font-size: 16px;
    color: #969696;
  }

  > .reset-btn {
    all: unset;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 12px 25px;
    background: rgba(106, 83, 245, 0.1);
    color: rgba(106, 83, 245, 1);
    font-weight: 700;
    margin-top: 15px;

    border-radius: 12px;
    cursor: pointer;
    transition: 0.25s all;

    &:hover {
      background: rgba(60, 34, 204, 0.1);
    }
  }
}
</style>
