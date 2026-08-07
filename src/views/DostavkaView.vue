<script setup lang="ts">
import { computed, ref } from 'vue'
import { faq } from '@/data/site'
import { useCartStore } from '@/stores/cart'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import BaseAccordion from '@/components/ui/BaseAccordion.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const cart = useCartStore()

const distanceKm = ref(10)
const calcResult = ref<number | null>(null)

const calculated = computed(() => {
  const distance = distanceKm.value
  if (cart.totalSum >= 10000) {
    return distance <= 0 ? 0 : distance * 40
  }
  return 700 + distance * 40
})

function calculate() {
  calcResult.value = calculated.value
}

const paymentMethods = [
  {
    id: 'cash',
    icon: 'money',
    title: 'Наличные курьеру',
    text: 'Оплата при получении заказа наличными или картой через терминал курьера.',
  },
  {
    id: 'card',
    icon: 'zap',
    title: 'Карта онлайн',
    text: 'Оплата банковской картой на сайте через защищённый эквайринг при оформлении заказа.',
  },
  {
    id: 'invoice',
    icon: 'file',
    title: 'Безналичный расчёт',
    text: 'Для юридических лиц: выставляем счёт на оплату, отгрузка после поступления средств.',
  },
]
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
    <SectionTitle
      eyebrow="Логистика"
      title="Доставка и оплата"
      subtitle="Привезём салюты точно в срок и безопасно — пиротехника перевозится с соблюдением всех правил"
    />

    <div class="grid gap-10 lg:grid-cols-2">
      <div>
        <h2 class="mb-5 text-2xl font-bold text-white">Условия доставки</h2>
        <ul class="space-y-4">
          <li v-for="(row, i) in [
            { icon: 'money', text: 'Минимальная сумма заказа — 7 000 ₽. Заказы на меньшую сумму рассматриваются индивидуально.' },
            { icon: 'truck', text: 'Бесплатная доставка по Москве в пределах МКАД при заказе от 10 000 ₽.' },
            { icon: 'pin', text: 'За МКАД — 40 ₽ за каждый километр от МКАД.' },
            { icon: 'clock', text: '31 декабря и по воскресеньям доставка возможна только по предварительной договорённости, слоты ограничены.' },
            { icon: 'shield', text: 'Доставка пиротехники осуществляется только совершеннолетним. Лицам младше 16 лет передача товара запрещена.' },
            { icon: 'check', text: 'При заказе услуги «установка и запуск» доставка на площадку рассчитывается отдельно.' },
          ]" :key="i" class="flex items-start gap-3">
            <span class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-flame-500/15 text-flame-500">
              <AppIcon :name="row.icon" :size="16" />
            </span>
            <p class="text-mist-200">{{ row.text }}</p>
          </li>
        </ul>

        <h2 class="mt-10 mb-5 text-2xl font-bold text-white">Способы оплаты</h2>
        <div class="space-y-4">
          <div v-for="method in paymentMethods" :key="method.id" class="card flex gap-4 p-5">
            <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400/15 to-flame-500/15 text-gold-400">
              <AppIcon :name="method.icon" :size="22" />
            </span>
            <div>
              <h3 class="font-bold text-white">{{ method.title }}</h3>
              <p class="mt-1 text-sm leading-relaxed text-mist-400">{{ method.text }}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="card sticky top-28 p-7 md:top-32 md:p-8">
          <h2 class="mb-2 text-2xl font-bold text-white">Калькулятор доставки</h2>
          <p class="mb-6 text-sm text-mist-400">
            Рассчитайте стоимость доставки. Сейчас в корзине: <b class="text-gold-400">{{ cart.totalSum }} ₽</b>
          </p>

          <div class="mb-6">
            <label class="mb-3 block text-sm font-semibold text-mist-200" for="distance">
              Расстояние от МКАД: <b class="text-white">{{ distanceKm }} км</b>
            </label>
            <input
              id="distance"
              v-model.number="distanceKm"
              type="range"
              min="0"
              max="150"
              step="1"
              class="w-full accent-flame-500"
            >
            <div class="mt-1 flex justify-between text-xs text-mist-600">
              <span>0 км (в пределах МКАД)</span>
              <span>150 км</span>
            </div>
          </div>

          <div class="mb-6 rounded-xl border border-white/10 bg-night-950/40 p-4 text-sm leading-relaxed text-mist-400">
            <template v-if="cart.totalSum >= 10000">
              ✓ Доставка по Москве в пределах МКАД — <b class="text-success">бесплатно</b>
              <br>
              За МКАД: 40 ₽/км
            </template>
            <template v-else>
              Доставка рассчитывается от суммы заказа: до 10 000 ₽ — 700 ₽ + 40 ₽/км за МКАД
            </template>
          </div>

          <BaseButton size="lg" block @click="calculate">
            <AppIcon name="truck" :size="20" />
            Рассчитать
          </BaseButton>

          <Transition name="result">
            <div v-if="calcResult !== null" class="mt-5 rounded-xl border border-gold-400/30 bg-gold-400/5 p-5 text-center">
              <p class="text-sm text-mist-400">Стоимость доставки</p>
              <p class="text-gradient text-3xl font-extrabold">{{ calcResult }} ₽</p>
              <p class="mt-1 text-xs text-mist-600">
                {{ distanceKm === 0 ? 'В пределах МКАД' : `Расстояние: ${distanceKm} км от МКАД` }}
              </p>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <section class="mt-16">
      <h2 class="section-title mb-8">Частые вопросы</h2>
      <BaseAccordion :items="faq" />
    </section>
  </div>
</template>

<style scoped>
.result-enter-active,
.result-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.result-enter-from,
.result-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
