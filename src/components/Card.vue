<template>
  <div
    class="w-[95%] md:w-[38rem] h-auto py-10 bg-white flex-col rounded-md rounded-br-[150px] md:pl-10 pt-10"
  >
    <div class="flex gap-7 pb-10 h-1/3 justify-center md:justify-start">
      <div class="font-bold w-20 md:w-32">
        <p :class="{ 'text-error': errorsWatcher }" class="clue">Day</p>
        <input
          :class="{ 'border-error': errorsWatcher }"
          class="naming-of-input"
          type="text"
          placeholder="dd"
          v-model="input_day"
        />
        <p class="font-normal text-xs text-error italic">{{ error_day }}</p>
      </div>

      <div class="font-bold w-20 md:w-32">
        <p :class="{ 'text-error': errorsWatcher }" class="clue">Month</p>
        <input
          :class="{ 'border-error': errorsWatcher }"
          class="naming-of-input"
          type="text"
          placeholder="mm"
          v-model="input_month"
        />
        <p class="font-normal text-xs text-error italic">{{ error_month }}</p>
      </div>

      <div class="font-bold w-20 md:w-32">
        <p :class="{ 'text-error': errorsWatcher }" class="clue">Year</p>
        <input
          :class="{ 'border-error': errorsWatcher }"
          class="naming-of-input"
          type="text"
          placeholder="yyyy"
          v-model="input_year"
        />
        <p class="font-normal text-xs text-error italic">{{ error_year }}</p>
      </div>
    </div>
    <div class="h-10 md:pr-20 relative">
      <hr />
      <button @click="validation" class="btn">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 46 44">
          <g fill="none" stroke="#FFF" stroke-width="2">
            <path
              d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"
            />
          </g>
        </svg>
      </button>
    </div>
    <div class="h-2/3 pl-5 md:pl-0">
      <div class="flex gap-2 items-center">
        <p class="years-months-days text-refColor">{{ year }}</p>
        <p class="years-months-days">years</p>
      </div>
      <div class="flex gap-2 items-center">
        <p class="years-months-days text-refColor">{{ mounth }}</p>
        <p class="years-months-days">months</p>
      </div>
      <div class="flex gap-2 items-center">
        <p class="years-months-days text-refColor">{{ day }}</p>
        <p class="years-months-days">days</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const year = ref('--')
const mounth = ref('--')
const day = ref('--')

const input_year = ref('')
const input_month = ref('')
const input_day = ref('')

const error_day = ref('')
const error_month = ref('')
const error_year = ref('')

watch(input_day, (newValue, oldValue) => {
  if (newValue != oldValue) {
    error_day.value = ''
    year.value = '--'
    day.value = '--'
    mounth.value = '--'
  }
})
watch(input_year, (newValue, oldValue) => {
  if (newValue != oldValue) {
    error_year.value = ''
    year.value = '--'
    day.value = '--'
    mounth.value = '--'
  }
})
watch(input_month, (newValue, oldValue) => {
  if (newValue != oldValue) {
    error_month.value = ''
    year.value = '--'
    day.value = '--'
    mounth.value = '--'
  }
})

const errorsWatcher = computed(() => {
  if (error_day.value != '' || error_month.value != '' || error_year.value != '') return 1
  else return 0
})

const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

const validation = () => {
  let flag = true

  // Проверяем год
  if (input_year.value < 1 || input_year.value >= 2025) {
    if (input_year.value >= 2025) {
      error_year.value = 'Must be in the past'
    } else {
      year.value = '--'
      error_year.value = 'Must be a valid year'
      flag = false
    }
  }
  // Проверяем месяц
  if (input_month.value < 1 || input_month.value > 12) {
    mounth.value = '--'
    error_month.value = 'Must be a valid month'
    flag = false
  }

  // Проверяем день
  const daysInMonth = [
    31,
    isLeapYear(input_year.value) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ]
  if (
    input_day.value < 1 ||
    input_day.value > daysInMonth[input_month.value - 1] ||
    input_day.value > 31
  ) {
    day.value = '--'
    error_day.value = 'Must be a valid day'
    flag = false
  }

  if (input_year.value == '') {
    error_year.value = 'This field is required'
    flag = false
  }
  if (input_day.value == '') {
    error_day.value = 'This field is required'
    flag = false
  }
  if (input_month.value == '') {
    error_month.value = 'This field is required'
    flag = false
  }
  if (flag === false) {
    mounth.value = '--'
    year.value = '--'
    day.value = '--'
  }
  // Если валидация успешна, считаем разницу в годах/месяцах/днях
  if (flag) {
    error_day.value = ''
    error_month.value = ''
    error_year.value = ''
    calculateYears()
    return true
  } else return false
}

const calculateYears = () => {
  const startDate = new Date(input_year.value, input_month.value - 1, input_day.value) // Учтите, что месяцы начинаются с 0
  const endDate = new Date() // Текущая дата

  // Разница в годах
  let years = endDate.getFullYear() - startDate.getFullYear()

  // Проверяем, если текущий день еще не наступил в этом году
  if (
    endDate.getMonth() < startDate.getMonth() ||
    (endDate.getMonth() === startDate.getMonth() && endDate.getDate() < startDate.getDate())
  ) {
    years--
  }

  // Разница в месяцах
  let months = endDate.getMonth() - startDate.getMonth()
  if (months < 0) {
    months += 12
  }

  // Разница в днях
  let days = endDate.getDate() - startDate.getDate()
  if (days < 0) {
    // Если дни еще не наступили в этом месяце, вычитаем дни из предыдущего месяца
    const previousMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0) // Последний день предыдущего месяца
    days += previousMonth.getDate() // Добавляем количество дней в предыдущем месяце
    months--
  }
  year.value = years
  mounth.value = months
  day.value = days
}
</script>
