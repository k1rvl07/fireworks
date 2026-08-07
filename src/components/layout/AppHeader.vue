<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { companyContacts } from '@/data/site'
import AppIcon from '@/components/ui/AppIcon.vue'

const route = useRoute()
const router = useRouter()
const cart = useCartStore()

const scrolled = ref(false)
const mobileOpen = ref(false)
const searchQuery = ref('')

const navItems = [
  { label: 'Каталог', to: '/catalog/' },
  { label: 'Салюты', to: '/catalog/salyuti/' },
  { label: 'Сертификаты', to: '/docs/sert/' },
  { label: 'Доставка', to: '/dostavka/' },
  { label: 'Проведение салютов', to: '/show/' },
  { label: 'О компании', to: '/o-kompanii/' },
  { label: 'Контакты', to: '/contacts/' },
]

const isActive = (to: string) =>
  to === '/' ? route.path === '/' : route.path.startsWith(to)

function onScroll() {
  scrolled.value = window.scrollY > 24
}

function submitSearch() {
  const q = searchQuery.value.trim()
  if (q) {
    router.push({ path: '/catalog/salyuti/', query: { q } })
    searchQuery.value = ''
  }
}

watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false
  },
)

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-40 transition-all duration-300"
    :class="scrolled ? 'bg-night-950/85 shadow-card backdrop-blur-md' : 'bg-gradient-to-b from-night-950/80 to-transparent'"
  >
    <div class="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:h-20 md:gap-6 md:px-6">
      <RouterLink to="/" class="flex shrink-0 items-center gap-2.5">
        <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-flame-500 to-gold-400 shadow-glow-orange">
          <AppIcon name="sparkles" :size="22" class="text-night-900" />
        </span>
        <span class="hidden flex-col leading-tight sm:flex">
          <span class="text-base font-extrabold tracking-wide text-white md:text-lg">ФЕЙЕРВЕРК-МАСТЕР</span>
          <span class="text-[11px] text-mist-400">салюты и шоу-программы</span>
        </span>
      </RouterLink>

      <div class="ml-auto flex items-center gap-2.5 md:gap-3">
        <form class="hidden items-center md:flex" @submit.prevent="submitSearch">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Поиск салюта"
              class="w-40 rounded-full border border-white/10 bg-night-800/70 py-2 pl-4 pr-10 text-sm text-white placeholder-mist-600 transition-all outline-none focus:w-52 focus:border-gold-400/60 xl:w-44"
            >
            <button
              type="submit"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-mist-400 transition hover:text-gold-400"
              aria-label="Найти"
            >
              <AppIcon name="search" :size="18" />
            </button>
          </div>
        </form>

        <a
          :href="`tel:${companyContacts.phoneHref}`"
          class="hidden items-center gap-2 font-bold text-white transition-colors hover:text-gold-400 lg:flex"
        >
          <AppIcon name="phone" :size="20" class="text-flame-500" />
          <span class="whitespace-nowrap">{{ companyContacts.phone }}</span>
        </a>

        <a
          :href="`tel:${companyContacts.phoneHref}`"
          class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-gold-400 hover:text-gold-400 md:flex lg:hidden"
          aria-label="Позвонить"
        >
          <AppIcon name="phone" :size="20" />
        </a>

        <RouterLink
          to="/cart/"
          class="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-gold-400 hover:text-gold-400"
          aria-label="Корзина"
        >
          <AppIcon name="cart" :size="20" />
          <Transition name="cart-badge">
            <span
              v-if="cart.totalCount > 0"
              class="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-flame-500 px-1 text-xs font-bold text-white"
            >
              {{ cart.totalCount }}
            </span>
          </Transition>
        </RouterLink>

        <button
          class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-gold-400 hover:text-gold-400 lg:hidden"
          :aria-expanded="mobileOpen"
          aria-label="Меню"
          @click="mobileOpen = !mobileOpen"
        >
          <AppIcon :name="mobileOpen ? 'close' : 'menu'" :size="22" />
        </button>
      </div>
    </div>

    <nav
      class="hidden items-center gap-1 border-t border-white/10 px-4 py-2 lg:flex md:px-6"
      aria-label="Основное меню"
      :class="scrolled ? '' : 'border-white/5'"
    >
      <div class="mx-auto flex w-full max-w-7xl items-center gap-1">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex-1 whitespace-nowrap rounded-lg px-1 py-2 text-center text-sm font-medium transition-colors md:px-3"
          :class="isActive(item.to) ? 'text-gold-400' : 'text-mist-200 hover:text-white'"
        >
          {{ item.label }}
        </RouterLink>
      </div>
    </nav>

    <Transition name="mobile-menu">
      <div v-if="mobileOpen" class="border-t border-white/10 bg-night-950/95 backdrop-blur-md lg:hidden">
        <nav class="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4" aria-label="Мобильное меню">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="rounded-lg px-3 py-3 text-base font-medium text-mist-100 transition-colors hover:bg-night-800 hover:text-gold-400"
            :class="isActive(item.to) ? 'text-gold-400' : ''"
          >
            {{ item.label }}
          </RouterLink>
          <form class="mt-2 flex gap-2 px-3 md:hidden" @submit.prevent="submitSearch">
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Поиск салюта"
              class="input-base"
            >
            <button type="submit" class="btn-gradient h-12 w-12 shrink-0 !px-0" aria-label="Найти">
              <AppIcon name="search" :size="20" />
            </button>
          </form>
          <a
            :href="`tel:${companyContacts.phoneHref}`"
            class="mt-2 flex items-center gap-2 px-3 py-3 font-bold text-white"
          >
            <AppIcon name="phone" :size="20" class="text-flame-500" />
            {{ companyContacts.phone }}
          </a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.cart-badge-enter-active,
.cart-badge-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.cart-badge-enter-from,
.cart-badge-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
