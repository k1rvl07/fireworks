<script setup lang="ts">
import { useRouter } from 'vue-router'
import { formatPrice } from '@/data/products'
import { useCartStore } from '@/stores/cart'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const cart = useCartStore()
const router = useRouter()

function goToCheckout() {
  router.push('/checkout/')
}
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
    <SectionTitle eyebrow="Ваша корзина" title="Корзина" />

    <div v-if="cart.detailed.length" class="card overflow-hidden">
      <div class="hidden overflow-x-auto md:block">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-white/10 bg-night-950/40 text-xs tracking-wider text-mist-400 uppercase">
              <th class="px-6 py-4">Товар</th>
              <th class="px-4 py-4">Цена</th>
              <th class="px-4 py-4">Количество</th>
              <th class="px-4 py-4">Сумма</th>
              <th class="px-4 py-4"><span class="sr-only">Удалить</span></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-for="{ product, qty } in cart.detailed" :key="product.id">
              <td class="px-6 py-4">
                <div class="flex items-center gap-4">
                  <RouterLink
                    :to="`/catalog/salyuti/${product.slug}/`"
                    class="flex h-16 w-20 shrink-0 items-center justify-center rounded-lg border border-white/10 transition hover:border-gold-400/50"
                    :style="{ background: `linear-gradient(135deg, ${product.gradient[0]}55, ${product.gradient[1]}44), #0B0E1A` }"
                  >
                    <AppIcon name="sparkles" :size="20" class="text-white/70" />
                  </RouterLink>
                  <div>
                    <RouterLink :to="`/catalog/salyuti/${product.slug}/`" class="font-bold text-white transition hover:text-gold-400">
                      {{ product.name }}
                    </RouterLink>
                    <p class="mt-0.5 text-xs text-mist-600">{{ product.caliber }}" · {{ product.shots }} залпов</p>
                  </div>
                </div>
              </td>
              <td class="whitespace-nowrap px-4 py-4 font-semibold text-white">{{ formatPrice(product.price) }}</td>
              <td class="px-4 py-4">
                <div class="flex h-10 w-fit items-center rounded-lg border border-night-500">
                  <button class="flex h-full w-9 items-center justify-center text-mist-400 transition hover:text-gold-400" aria-label="Меньше" @click="cart.setQty(product.id, qty - 1)">
                    <AppIcon name="minus" :size="14" />
                  </button>
                  <input
                    :value="qty"
                    type="number"
                    min="1"
                    class="w-12 border-0 bg-transparent text-center font-bold text-white outline-none"
                    aria-label="Количество"
                    @change="cart.setQty(product.id, Math.max(1, Number(($event.target as HTMLInputElement).value)))"
                  >
                  <button class="flex h-full w-9 items-center justify-center text-mist-400 transition hover:text-gold-400" aria-label="Больше" @click="cart.setQty(product.id, qty + 1)">
                    <AppIcon name="plus" :size="14" />
                  </button>
                </div>
              </td>
              <td class="whitespace-nowrap px-4 py-4 font-bold text-gold-400">{{ formatPrice(product.price * qty) }}</td>
              <td class="px-4 py-4">
                <button
                  class="flex h-9 w-9 items-center justify-center rounded-full text-mist-600 transition hover:bg-danger/10 hover:text-danger"
                  :aria-label="`Удалить ${product.name}`"
                  @click="cart.remove(product.id)"
                >
                  <AppIcon name="trash" :size="16" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ul class="divide-y divide-white/5 md:hidden">
        <li v-for="{ product, qty } in cart.detailed" :key="product.id" class="flex gap-4 p-4">
          <RouterLink
            :to="`/catalog/salyuti/${product.slug}/`"
            class="flex h-20 w-24 shrink-0 items-center justify-center rounded-lg border border-white/10"
            :style="{ background: `linear-gradient(135deg, ${product.gradient[0]}55, ${product.gradient[1]}44), #0B0E1A` }"
          >
            <AppIcon name="sparkles" :size="22" class="text-white/70" />
          </RouterLink>
          <div class="flex flex-1 flex-col gap-2">
            <RouterLink :to="`/catalog/salyuti/${product.slug}/`" class="font-bold text-white transition hover:text-gold-400">{{ product.name }}</RouterLink>
            <p class="text-sm text-mist-400">{{ formatPrice(product.price) }} / шт.</p>
            <div class="flex h-9 w-fit items-center rounded-lg border border-night-500">
              <button class="flex h-full w-8 items-center justify-center text-mist-400" aria-label="Меньше" @click="cart.setQty(product.id, qty - 1)">
                <AppIcon name="minus" :size="14" />
              </button>
              <span class="w-8 text-center font-bold text-white">{{ qty }}</span>
              <button class="flex h-full w-8 items-center justify-center text-mist-400" aria-label="Больше" @click="cart.setQty(product.id, qty + 1)">
                <AppIcon name="plus" :size="14" />
              </button>
            </div>
            <div class="flex items-center justify-between">
              <span class="font-bold text-gold-400">{{ formatPrice(product.price * qty) }}</span>
              <button class="flex h-8 w-8 items-center justify-center rounded-full text-mist-600 transition hover:text-danger" :aria-label="`Удалить ${product.name}`" @click="cart.remove(product.id)">
                <AppIcon name="trash" :size="15" />
              </button>
            </div>
          </div>
        </li>
      </ul>

      <div class="flex flex-col gap-6 border-t border-white/10 bg-night-950/40 p-6 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <div>
          <p class="text-sm text-mist-400">
            Товаров: <b class="text-white">{{ cart.totalCount }}</b> · Доставка рассчитывается на следующем шаге
          </p>
          <p class="mt-1 text-2xl font-extrabold text-gold-400">Итого: {{ formatPrice(cart.totalSum) }}</p>
        </div>
        <div class="flex flex-col gap-3 sm:flex-row">
          <RouterLink to="/catalog/salyuti/"><BaseButton variant="ghost" block>Продолжить покупки</BaseButton></RouterLink>
          <BaseButton size="lg" @click="goToCheckout">
            Перейти к оформлению
            <AppIcon name="arrow-right" :size="20" />
          </BaseButton>
        </div>
      </div>
    </div>

    <div v-else class="card flex flex-col items-center gap-5 p-14 text-center">
      <span class="flex h-20 w-20 items-center justify-center rounded-full bg-night-700/50 text-mist-400">
        <AppIcon name="cart" :size="36" />
      </span>
      <div>
        <h2 class="text-2xl font-bold text-white">Корзина пуста</h2>
        <p class="mt-2 text-mist-400">Самое время выбрать салют для вашего праздника</p>
      </div>
      <RouterLink to="/catalog/salyuti/"><BaseButton size="lg">Перейти в каталог <AppIcon name="arrow-right" :size="20" /></BaseButton></RouterLink>
    </div>
  </div>
</template>
