<script setup lang="ts">
import { companyContacts } from '@/data/site'
import AppIcon from '@/components/ui/AppIcon.vue'

const navItems = [
  { label: 'Каталог', to: '/catalog/' },
  { label: 'Салюты', to: '/catalog/salyuti/' },
  { label: 'Сертификаты', to: '/docs/sert/' },
  { label: 'Доставка и оплата', to: '/dostavka/' },
  { label: 'Проведение салютов', to: '/show/' },
  { label: 'О компании', to: '/o-kompanii/' },
  { label: 'Контакты', to: '/contacts/' },
]
</script>

<template>
  <footer class="border-t border-white/10 bg-night-950">
    <div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 md:px-6 lg:grid-cols-4">
      <div>
        <RouterLink to="/" class="flex items-center gap-2.5">
          <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-flame-500 to-gold-400">
            <AppIcon name="sparkles" :size="22" class="text-night-900" />
          </span>
          <span class="flex flex-col leading-tight">
            <span class="text-lg font-extrabold tracking-wide text-white">ФЕЙЕРВЕРК-МАСТЕР</span>
            <span class="text-[11px] text-mist-400">салюты и шоу-программы</span>
          </span>
        </RouterLink>
        <p class="mt-4 text-sm leading-relaxed text-mist-400">
          Продажа сертифицированной пиротехники и проведение пиротехнических шоу в Москве и Московской области.
        </p>
      </div>

      <div>
        <h3 class="mb-4 text-sm font-bold tracking-widest text-white uppercase">Навигация</h3>
        <ul class="space-y-2.5">
          <li v-for="item in navItems" :key="item.to">
            <RouterLink :to="item.to" class="text-sm text-mist-400 transition-colors hover:text-gold-400">
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="mb-4 text-sm font-bold tracking-widest text-white uppercase">Контакты</h3>
        <ul class="space-y-3 text-sm">
          <li>
            <a :href="`tel:${companyContacts.phoneHref}`" class="flex items-center gap-2.5 font-semibold text-white transition-colors hover:text-gold-400">
              <AppIcon name="phone" :size="16" class="shrink-0 text-flame-500" />
              {{ companyContacts.phone }}
            </a>
          </li>
          <li>
            <a :href="`tel:${companyContacts.phoneAltHref}`" class="flex items-center gap-2.5 text-mist-400 transition-colors hover:text-gold-400">
              <AppIcon name="phone" :size="16" class="shrink-0 text-flame-500" />
              {{ companyContacts.phoneAlt }}
            </a>
          </li>
          <li>
            <a :href="`mailto:${companyContacts.email}`" class="flex items-center gap-2.5 text-mist-400 transition-colors hover:text-gold-400">
              <AppIcon name="mail" :size="16" class="shrink-0 text-sky-400" />
              {{ companyContacts.email }}
            </a>
          </li>
          <li class="flex items-center gap-2.5 text-mist-400">
            <AppIcon name="pin" :size="16" class="shrink-0 text-gold-400" />
            {{ companyContacts.address }}
          </li>
          <li class="flex items-center gap-2.5 text-mist-400">
            <AppIcon name="clock" :size="16" class="shrink-0 text-sky-400" />
            {{ companyContacts.workHours }}
          </li>
        </ul>
      </div>

      <div>
        <h3 class="mb-4 text-sm font-bold tracking-widest text-white uppercase">Мы в соцсетях</h3>
        <div class="flex gap-3">
          <a
            v-for="social in companyContacts.socials"
            :key="social.id"
            :href="social.url"
            target="_blank"
            rel="noopener"
            :aria-label="social.label"
            class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-mist-400 transition hover:border-gold-400 hover:text-gold-400 hover:shadow-glow-gold"
          >
            <AppIcon :name="social.id" :size="20" />
          </a>
        </div>
        <p class="mt-6 text-xs leading-relaxed text-mist-600">
          Планируйте салют заранее: в новогодний сезон и перед праздниками расписание запусков заполняется за 1–2 недели.
        </p>
      </div>
    </div>

    <div class="border-t border-white/5">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-mist-600 md:flex-row md:px-6">
        <p>© 2016–2026 ООО «Фейерверк-Мастер». Все права защищены.</p>
        <div class="flex items-center gap-5">
          <span>Продажа пиротехники лицам младше 16 лет запрещена</span>
          <RouterLink to="/docs/sert/" class="transition-colors hover:text-gold-400">Политика конфиденциальности</RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>
