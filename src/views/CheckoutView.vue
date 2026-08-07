<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { formatPrice } from '@/data/products'
import type { PaymentMethod } from '@/types'
import { useCartStore } from '@/stores/cart'
import { useOrderStore } from '@/stores/orders'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const router = useRouter()
const cart = useCartStore()
const orders = useOrderStore()

const step = ref(1)
const submitting = ref(false)

const contact = reactive({ name: '', phone: '', email: '' })
const address = reactive({ city: 'Москва', street: '', house: '', apartment: '', entrance: '', floor: '', comment: '' })
const payment = ref<PaymentMethod>('cash')

const stepTitles = ['Контактные данные', 'Адрес доставки', 'Способ оплаты']

const contactValid = computed(() => contact.name.trim().length >= 2 && contact.phone.trim().length >= 10)
const addressValid = computed(() => address.city.trim() && address.street.trim() && address.house.trim())

function next() {
  if (step.value < 3 && validFor(step.value)) step.value++
}

function validFor(current: number) {
  if (current === 1) return contactValid.value
  if (current === 2) return addressValid.value
  return true
}

function submit() {
  if (!validFor(step.value)) return
  submitting.value = true
  setTimeout(() => {
    orders.create({
      contact: { ...contact },
      address: { ...address },
      payment: payment.value,
      items: cart.items.map((it) => ({ ...it })),
      total: cart.totalSum,
    })
    cart.clear()
    submitting.value = false
    router.push('/checkout/success/')
  }, 900)
}

watch(
  () => cart.detailed.length,
  (count) => {
    if (count === 0 && step.value === 1) {
      router.replace('/cart/')
    }
  },
)
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
    <SectionTitle eyebrow="Оформление заказа" title="Оформить заказ" />

    <div class="mb-10">
      <ol class="flex items-center gap-2 sm:gap-3">
        <li v-for="(title, i) in stepTitles" :key="i" class="flex flex-1 items-center gap-2 sm:gap-3">
          <span
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-all"
            :class="step > i + 1 ? 'border-success bg-success/15 text-success' : step === i + 1 ? 'border-transparent bg-gradient-to-r from-flame-500 to-gold-400 text-night-900 shadow-glow-orange' : 'border-white/15 text-mist-600'"
          >
            <AppIcon v-if="step > i + 1" name="check" :size="18" />
            <span v-else>{{ i + 1 }}</span>
          </span>
          <span class="hidden text-sm font-semibold sm:block" :class="step === i + 1 ? 'text-white' : 'text-mist-600'">{{ title }}</span>
          <span v-if="i < stepTitles.length - 1" class="h-px flex-1 bg-white/10" :class="step > i + 1 ? 'bg-success/50' : ''" />
        </li>
      </ol>
    </div>

    <div class="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div class="space-y-6">
        <form v-show="step === 1" class="card space-y-4 p-7" @submit.prevent="next">
          <h2 class="text-lg font-bold text-white">Шаг 1: Контактные данные</h2>
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-mist-200" for="o-name">ФИО *</label>
            <input id="o-name" v-model="contact.name" type="text" required class="input-base" placeholder="Иванов Иван Иванович">
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-mist-200" for="o-phone">Телефон *</label>
            <input id="o-phone" v-model="contact.phone" type="tel" required class="input-base" placeholder="+7 (___) ___-__-__">
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-mist-200" for="o-email">Email *</label>
            <input id="o-email" v-model="contact.email" type="email" required class="input-base" placeholder="you@example.com">
          </div>
          <div class="flex items-center justify-between gap-4 pt-2">
            <RouterLink to="/cart/" class="text-sm text-mist-400 transition hover:text-gold-400">← Назад в корзину</RouterLink>
            <BaseButton type="submit" :disabled="!contactValid">Далее <AppIcon name="arrow-right" :size="18" /></BaseButton>
          </div>
        </form>

        <form v-show="step === 2" class="card space-y-4 p-7" @submit.prevent="next">
          <h2 class="text-lg font-bold text-white">Шаг 2: Адрес доставки</h2>
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-mist-200" for="o-city">Город *</label>
              <input id="o-city" v-model="address.city" type="text" required class="input-base">
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-mist-200" for="o-street">Улица *</label>
              <input id="o-street" v-model="address.street" type="text" required class="input-base" placeholder="ул. Примерная">
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-mist-200" for="o-house">Дом *</label>
              <input id="o-house" v-model="address.house" type="text" required class="input-base">
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-mist-200" for="o-apartment">Квартира</label>
              <input id="o-apartment" v-model="address.apartment" type="text" class="input-base">
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-mist-200" for="o-entrance">Подъезд</label>
              <input id="o-entrance" v-model="address.entrance" type="text" class="input-base">
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-mist-200" for="o-floor">Этаж</label>
              <input id="o-floor" v-model="address.floor" type="text" class="input-base">
            </div>
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-mist-200" for="o-comment">Комментарий курьеру</label>
            <textarea id="o-comment" v-model="address.comment" rows="3" class="input-base resize-none" placeholder="Например: позвоните за час до приезда"></textarea>
          </div>
          <div class="flex items-center justify-between gap-4 pt-2">
            <button type="button" class="text-sm text-mist-400 transition hover:text-gold-400" @click="step--">← Назад</button>
            <BaseButton type="submit" :disabled="!addressValid">Далее <AppIcon name="arrow-right" :size="18" /></BaseButton>
          </div>
        </form>

        <div v-show="step === 3" class="card space-y-4 p-7">
          <h2 class="text-lg font-bold text-white">Шаг 3: Способ оплаты</h2>
          <div class="space-y-3">
            <label
              v-for="method in [
                { id: 'cash' as const, icon: 'money', title: 'Наличными курьеру', text: 'Оплата при получении' },
                { id: 'card' as const, icon: 'zap', title: 'Картой онлайн', text: 'Через защищённый эквайринг' },
                { id: 'invoice' as const, icon: 'file', title: 'Безналичный расчёт', text: 'Счёт для юридических лиц' },
              ]"
              :key="method.id"
              class="flex cursor-pointer items-center gap-4 rounded-xl border p-5 transition"
              :class="payment === method.id ? 'border-gold-400/60 bg-gold-400/5 shadow-glow-gold' : 'border-white/10 hover:border-white/30'"
            >
              <input v-model="payment" type="radio" :value="method.id" class="accent-gold-400">
              <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-night-700/60 text-gold-400">
                <AppIcon :name="method.icon" :size="20" />
              </span>
              <span>
                <span class="block font-bold text-white">{{ method.title }}</span>
                <span class="text-sm text-mist-400">{{ method.text }}</span>
              </span>
            </label>
          </div>
          <div class="flex items-center justify-between gap-4 pt-2">
            <button type="button" class="text-sm text-mist-400 transition hover:text-gold-400" @click="step--">← Назад</button>
            <BaseButton size="lg" :disabled="submitting" @click="submit">
              <AppIcon name="check" :size="20" />
              {{ submitting ? 'Оформляем…' : 'Оформить заказ' }}
            </BaseButton>
          </div>
        </div>
      </div>

      <aside class="card h-fit p-6 lg:sticky lg:top-24">
        <h2 class="mb-4 text-lg font-bold text-white">Ваш заказ</h2>
        <ul class="mb-4 max-h-64 space-y-3 overflow-y-auto pr-1">
          <li v-for="{ product, qty } in cart.detailed" :key="product.id" class="flex items-center gap-3 text-sm">
            <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10" :style="{ background: `linear-gradient(135deg, ${product.gradient[0]}55, ${product.gradient[1]}44), #0B0E1A` }">
              <AppIcon name="sparkles" :size="16" class="text-white/70" />
            </span>
            <span class="min-w-0 flex-1 truncate text-mist-200">{{ product.name }}</span>
            <span class="shrink-0 font-semibold text-white">{{ qty }} × {{ formatPrice(product.price) }}</span>
          </li>
        </ul>
        <div class="space-y-2 border-t border-white/10 pt-4 text-sm">
          <p class="flex justify-between text-mist-400">
            <span>Товары ({{ cart.totalCount }})</span>
            <span>{{ formatPrice(cart.totalSum) }}</span>
          </p>
          <p class="flex justify-between text-mist-400">
            <span>Доставка</span>
            <span>рассчитает менеджер</span>
          </p>
          <p class="flex justify-between border-t border-white/10 pt-3 text-lg font-extrabold text-gold-400">
            <span>Итого</span>
            <span>{{ formatPrice(cart.totalSum) }}</span>
          </p>
        </div>
        <p class="mt-4 flex items-start gap-2 text-xs leading-relaxed text-mist-600">
          <AppIcon name="shield" :size="14" class="mt-0.5 shrink-0" />
          Нажимая «Оформить заказ», вы соглашаетесь с политикой конфиденциальности и подтверждаете, что вам исполнилось 16 лет.
        </p>
      </aside>
    </div>
  </div>
</template>
