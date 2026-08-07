<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { portfolio, reviews, services, showAddons, showOptions, teamTypes } from '@/data/site'
import type { PortfolioItem } from '@/types'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import StarRating from '@/components/ui/StarRating.vue'
import SparkBackground from '@/components/ui/SparkBackground.vue'

const activeType = ref<'all' | 'svadba' | 'korporativ' | 'gorodskoy'>('all')
const portfolioItems = computed<PortfolioItem[]>(() =>
  activeType.value === 'all' ? portfolio : portfolio.filter((p) => p.type === activeType.value),
)

const selectedAddons = reactive<string[]>([])
const selectedType = ref('vysotniy')
const showDate = ref('')

const calcTotal = computed(() => {
  const base = showOptions.find((o) => o.id === selectedType.value)?.price ?? 0
  const addons = showAddons.filter((a) => selectedAddons.includes(a.id)).reduce((sum, a) => sum + a.price, 0)
  return base + addons
})

function toggleAddon(id: string) {
  const i = selectedAddons.indexOf(id)
  if (i >= 0) selectedAddons.splice(i, 1)
  else selectedAddons.push(id)
}

const formatMoney = (n: number) => new Intl.NumberFormat('ru-RU').format(n) + ' ₽'

const requestForm = reactive({ name: '', phone: '', email: '', comment: '' })
const sent = ref(false)

function submitRequest() {
  if (!requestForm.name || !requestForm.phone) return
  sent.value = true
  setTimeout(() => {
    sent.value = false
    requestForm.name = ''
    requestForm.phone = ''
    requestForm.email = ''
    requestForm.comment = ''
  }, 4000)
}
</script>

<template>
  <div class="relative overflow-hidden">
    <SparkBackground :density="50" :opacity="0.5" />

    <section class="relative overflow-hidden">
      <div
        class="mx-auto flex min-h-[60vh] max-w-7xl flex-col justify-center px-4 py-20 md:px-6"
        :style="{ background: 'radial-gradient(ellipse at 75% 40%, rgba(255,106,0,0.25), transparent 55%), radial-gradient(ellipse at 25% 70%, rgba(0,163,255,0.15), transparent 50%)' }"
      >
        <p class="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-gold-400/40 bg-night-950/40 px-4 py-1.5 text-sm font-semibold tracking-widest text-gold-400 uppercase backdrop-blur">
          <AppIcon name="sparkles" :size="14" />
          Пиротехнические шоу
        </p>
        <h1 class="mb-5 max-w-3xl text-4xl leading-tight font-extrabold text-white md:text-6xl">
          Сделаем ваш праздник <span class="text-gradient">незабываемым</span>
        </h1>
        <p class="mb-8 max-w-xl text-lg leading-relaxed text-mist-200 md:text-xl">
          Высотные салюты и парковые фейерверки, синхронизированные с музыкой. Команда пиротехников с опытом 15+ лет.
        </p>
        <div class="flex flex-wrap gap-4">
          <a href="#calculator"><BaseButton size="lg">Рассчитать шоу <AppIcon name="arrow-right" :size="20" /></BaseButton></a>
          <a href="#portfolio"><BaseButton size="lg" variant="ghost">Смотреть портфолио</BaseButton></a>
        </div>
      </div>
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-night-900 to-transparent" />
    </section>

    <section class="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <SectionTitle
        eyebrow="О нас"
        title="Команда, которой доверяют"
        subtitle="Работаем официально: лицензия МЧС, аккредитация на зрелищные мероприятия, членство в Российской пиротехнической ассоциации"
      />
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="(item, i) in [
          { icon: 'rocket', title: '15+ лет', text: 'опыта проведения шоу' },
          { icon: 'shield', title: 'Лицензия МЧС', text: 'на хранение и использование пиротехники' },
          { icon: 'team', title: '800+ шоу', text: 'проведено командой за последние 5 лет' },
          { icon: 'badge', title: 'Член ассоциации', text: 'Российской пиротехнической ассоциации' },
        ]" :key="i" v-reveal="{ delay: i * 80 }" class="card p-6 text-center">
          <span class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-flame-500/15 to-gold-400/15 text-flame-500">
            <AppIcon :name="item.icon" :size="24" />
          </span>
          <p class="text-xl font-extrabold text-white">{{ item.title }}</p>
          <p class="mt-1 text-sm text-mist-400">{{ item.text }}</p>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 pb-16 md:px-6">
      <SectionTitle eyebrow="Услуги" title="Что мы проводим" center />
      <div class="grid gap-6 md:grid-cols-3">
        <div v-for="(service, i) in services" :key="service.id" v-reveal="{ delay: i * 100 }" class="card group relative overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40 hover:shadow-glow-gold">
          <span class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-flame-500/20 to-gold-400/20 text-flame-500">
            <AppIcon :name="service.icon" :size="26" />
          </span>
          <h3 class="mb-2 text-xl font-bold text-white">{{ service.title }}</h3>
          <p class="mb-5 flex-1 text-sm leading-relaxed text-mist-400">{{ service.description }}</p>
          <div class="mb-4 flex flex-wrap gap-2 text-xs text-mist-400">
            <span class="rounded-full border border-white/10 px-3 py-1">{{ service.height }}</span>
            <span class="rounded-full border border-white/10 px-3 py-1">{{ service.duration }}</span>
          </div>
          <p class="text-xl font-extrabold text-gold-400">{{ service.price }}</p>
        </div>
      </div>
    </section>

    <section id="calculator" class="mx-auto max-w-7xl scroll-mt-28 px-4 py-16 md:px-6 lg:scroll-mt-32">
      <div class="card grid gap-10 p-8 md:p-10 lg:grid-cols-2">
        <div>
          <SectionTitle eyebrow="Калькулятор" title="Рассчитайте стоимость шоу" subtitle="Выберите тип программы и опции — получите ориентировочную стоимость. Точная смета — после согласования сценария" />
          <div class="space-y-6">
            <div>
              <p class="mb-3 font-semibold text-mist-200">Тип шоу</p>
              <div class="space-y-2.5">
                <label
                  v-for="option in showOptions"
                  :key="option.id"
                  class="flex cursor-pointer items-center justify-between rounded-xl border p-4 transition"
                  :class="selectedType === option.id ? 'border-gold-400/60 bg-gold-400/5 shadow-glow-gold' : 'border-white/10 hover:border-white/30'"
                >
                  <span class="flex items-center gap-3">
                    <input v-model="selectedType" type="radio" name="show-type" :value="option.id" class="accent-gold-400">
                    <span class="font-semibold text-white">{{ option.title }}</span>
                  </span>
                  <span class="text-sm font-bold text-gold-400">{{ formatMoney(option.price) }}</span>
                </label>
              </div>
            </div>

            <div>
              <p class="mb-3 font-semibold text-mist-200">Дополнительно</p>
              <div class="space-y-2.5">
                <label
                  v-for="addon in showAddons"
                  :key="addon.id"
                  class="flex cursor-pointer items-center justify-between rounded-xl border p-4 transition"
                  :class="selectedAddons.includes(addon.id) ? 'border-sky-400/60 bg-sky-400/5' : 'border-white/10 hover:border-white/30'"
                >
                  <span class="flex items-center gap-3">
                    <input type="checkbox" :checked="selectedAddons.includes(addon.id)" class="accent-sky-400" @change="toggleAddon(addon.id)">
                    <span class="font-semibold text-white">{{ addon.title }}</span>
                  </span>
                  <span class="text-sm font-bold text-sky-400">{{ formatMoney(addon.price) }}</span>
                </label>
              </div>
            </div>

            <div>
              <label class="mb-3 block font-semibold text-mist-200" for="show-date">
                Дата и место проведения
              </label>
              <input
                id="show-date"
                v-model="showDate"
                type="text"
                placeholder="Например: 31 декабря 2026, Москва, набережная"
                class="input-base"
              >
            </div>
          </div>
        </div>

        <div class="flex flex-col">
          <div class="flex flex-1 flex-col justify-center rounded-2xl border border-white/10 bg-night-950/50 p-8">
            <p class="mb-2 text-sm text-mist-400">Ориентировочная стоимость</p>
            <p class="text-gradient mb-6 text-5xl font-extrabold">{{ formatMoney(calcTotal) }}</p>
            <div class="space-y-2 text-sm text-mist-300">
              <p class="flex items-center justify-between">
                <span>Программа: <b class="text-white">{{ showOptions.find((o) => o.id === selectedType)?.title }}</b></span>
                <span>{{ formatMoney(showOptions.find((o) => o.id === selectedType)?.price ?? 0) }}</span>
              </p>
              <p v-for="addon in showAddons.filter((a) => selectedAddons.includes(a.id))" :key="addon.id" class="flex items-center justify-between">
                <span>Опция: <b class="text-white">{{ addon.title }}</b></span>
                <span>{{ formatMoney(addon.price) }}</span>
              </p>
              <p v-if="showDate" class="border-t border-white/10 pt-2 text-mist-400">Дата и место: {{ showDate }}</p>
            </div>
            <div class="mt-6 flex items-start gap-3 rounded-xl border border-sky-400/20 bg-sky-400/5 p-4 text-xs leading-relaxed text-mist-300">
              <AppIcon name="info" :size="16" class="mt-0.5 shrink-0 text-sky-400" />
              Точная стоимость зависит от площадки, метеоусловий и согласования сценария. Менеджер уточнит детали.
            </div>
          </div>

          <form class="mt-6 space-y-4" @submit.prevent="submitRequest">
            <div class="grid gap-4 sm:grid-cols-2">
              <input v-model="requestForm.name" type="text" required placeholder="Ваше имя *" class="input-base">
              <input v-model="requestForm.phone" type="tel" required placeholder="Телефон *" class="input-base">
            </div>
            <input v-model="requestForm.email" type="email" placeholder="Email" class="input-base">
            <textarea v-model="requestForm.comment" rows="3" placeholder="Комментарий: повод, количество гостей, пожелания…" class="input-base resize-none"></textarea>
            <BaseButton type="submit" size="lg" block :disabled="sent">
              <AppIcon :name="sent ? 'check' : 'rocket'" :size="20" />
              {{ sent ? 'Заявка отправлена!' : 'Отправить заявку на расчёт' }}
            </BaseButton>
          </form>
        </div>
      </div>
    </section>

    <section id="portfolio" class="mx-auto max-w-7xl scroll-mt-28 px-4 py-16 md:px-6 lg:scroll-mt-32">
      <SectionTitle eyebrow="Портфолио" title="Наши работы" subtitle="Более 1200 мероприятий: от камерных свадеб до городских фестивалей" />
      <div class="mb-8 flex flex-wrap gap-2">
        <button
          v-for="type in [{ id: 'all' as const, label: 'Все' }, ...teamTypes]"
          :key="type.id"
          class="rounded-full border px-5 py-2 text-sm font-semibold transition"
          :class="activeType === type.id ? 'border-transparent bg-gradient-to-r from-flame-500 to-gold-400 text-night-900 shadow-glow-orange' : 'border-white/15 text-mist-300 hover:border-gold-400/60 hover:text-gold-400'"
          @click="activeType = type.id"
        >
          {{ type.label }}
        </button>
      </div>

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(item, i) in portfolioItems"
          :key="item.id"
          v-reveal="{ delay: (i % 3) * 100 }"
          class="group relative flex aspect-[4/3] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40 hover:shadow-glow-gold"
          :style="{ background: `linear-gradient(135deg, ${item.gradient[0]}44, ${item.gradient[1]}33), radial-gradient(circle at 30% 25%, ${item.gradient[0]}55, transparent 50%), #0B0E1A` }"
        >
          <div
            class="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-2xl transition-opacity duration-300 group-hover:opacity-90"
            :style="{ background: `radial-gradient(circle, ${item.gradient[0]}88, transparent 70%)` }"
          />
          <span class="relative flex h-14 w-14 items-center justify-center rounded-full bg-night-950/60 text-white backdrop-blur transition group-hover:scale-110">
            <AppIcon :name="item.video ? 'play' : 'zoom'" :size="22" />
          </span>
          <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night-950/95 to-transparent p-5 pt-12">
            <span class="mb-1 inline-block rounded-full bg-flame-500/90 px-2.5 py-0.5 text-xs font-bold text-white">{{ item.typeLabel }}</span>
            <p class="font-bold text-white">{{ item.title }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <SectionTitle eyebrow="Отзывы о шоу" title="Впечатления наших клиентов" />
      <div class="grid gap-5 md:grid-cols-2">
        <figure v-for="review in reviews.filter((r) => r.service)" :key="review.id" class="card p-6">
          <div class="mb-3 flex items-center gap-3">
            <span
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-extrabold text-night-950"
              :style="{ background: `linear-gradient(135deg, ${review.photoGradient[0]}, ${review.photoGradient[1]})` }"
            >
              {{ review.name.charAt(0) }}
            </span>
            <div>
              <figcaption class="font-bold text-white">{{ review.name }}</figcaption>
              <p class="text-xs text-mist-600">{{ review.service }} · {{ review.date }}</p>
            </div>
          </div>
          <StarRating :rating="review.rating" class="mb-3" />
          <blockquote class="text-sm leading-relaxed text-mist-400">«{{ review.text }}»</blockquote>
        </figure>
      </div>
    </section>
  </div>
</template>
