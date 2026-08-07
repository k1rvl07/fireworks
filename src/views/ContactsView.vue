<script setup lang="ts">
import { reactive, ref } from 'vue'
import { companyContacts } from '@/data/site'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const form = reactive({ name: '', phone: '', email: '', topic: 'Подбор салюта', message: '' })
const sent = ref(false)

const topics = ['Подбор салюта', 'Заказ шоу', 'Доставка и оплата', 'Сотрудничество', 'Другое']

function submit() {
  if (!form.name || !form.phone || !form.message) return
  sent.value = true
  setTimeout(() => {
    sent.value = false
    form.name = ''
    form.phone = ''
    form.email = ''
    form.message = ''
  }, 4000)
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
    <SectionTitle eyebrow="Свяжитесь с нами" title="Контакты" subtitle="Ответим на вопросы, подберём салют и рассчитаем доставку" />

    <div class="grid gap-10 lg:grid-cols-2">
      <div class="space-y-8">
        <div
          class="relative flex min-h-72 items-center justify-center overflow-hidden rounded-2xl border border-white/10"
          :style="{ background: 'radial-gradient(ellipse at 50% 60%, rgba(0,163,255,0.15), transparent 60%), radial-gradient(circle at 20% 20%, rgba(255,106,0,0.12), transparent 40%), #0B0E1A' }"
          role="img"
          aria-label="Карта: Москва, ул. Пирожковая, д. 15, стр. 2"
        >
          <div class="relative flex flex-col items-center gap-3 text-center">
            <span class="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-flame-500 to-gold-400 text-night-900 shadow-glow-orange">
              <AppIcon name="pin" :size="26" />
            </span>
            <p class="font-bold text-white">{{ companyContacts.address }}</p>
            <p class="text-sm text-mist-400">Метро «Полежаевская», 5 минут пешком</p>
          </div>
          <span class="absolute right-4 top-4 rounded-full bg-night-950/60 px-3 py-1 text-xs text-mist-400 backdrop-blur">
            Яндекс.Карты · интерактивная карта
          </span>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="card p-5">
            <p class="mb-3 flex items-center gap-2 text-sm font-semibold text-mist-400">
              <AppIcon name="phone" :size="16" class="text-flame-500" /> Телефоны
            </p>
            <a :href="`tel:${companyContacts.phoneHref}`" class="block font-bold text-white transition hover:text-gold-400">{{ companyContacts.phone }}</a>
            <a :href="`tel:${companyContacts.phoneAltHref}`" class="mt-1 block text-mist-400 transition hover:text-gold-400">{{ companyContacts.phoneAlt }}</a>
          </div>
          <div class="card p-5">
            <p class="mb-3 flex items-center gap-2 text-sm font-semibold text-mist-400">
              <AppIcon name="mail" :size="16" class="text-sky-400" /> Email
            </p>
            <a :href="`mailto:${companyContacts.email}`" class="break-all font-bold text-white transition hover:text-gold-400">{{ companyContacts.email }}</a>
          </div>
          <div class="card p-5">
            <p class="mb-3 flex items-center gap-2 text-sm font-semibold text-mist-400">
              <AppIcon name="clock" :size="16" class="text-gold-400" /> Режим работы
            </p>
            <p class="font-bold text-white">{{ companyContacts.workHours }}</p>
            <p class="mt-1 text-sm text-mist-400">Доставка 31.12 — по договорённости</p>
          </div>
          <div class="card p-5">
            <p class="mb-3 flex items-center gap-2 text-sm font-semibold text-mist-400">
              <AppIcon name="team" :size="16" class="text-sky-400" /> Мы в соцсетях
            </p>
            <div class="flex gap-2.5">
              <a
                v-for="social in companyContacts.socials"
                :key="social.id"
                :href="social.url"
                target="_blank"
                rel="noopener"
                :aria-label="social.label"
                class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-mist-400 transition hover:border-gold-400 hover:text-gold-400"
              >
                <AppIcon :name="social.id" :size="18" />
              </a>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <p class="mb-4 text-sm font-semibold text-mist-400">Реквизиты (для юридических лиц)</p>
          <dl class="grid grid-cols-1 gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
            <div class="flex justify-between gap-4"><dt class="text-mist-600">ОГРН</dt><dd class="font-semibold text-white">{{ companyContacts.requisites.ogrn }}</dd></div>
            <div class="flex justify-between gap-4"><dt class="text-mist-600">ИНН</dt><dd class="font-semibold text-white">{{ companyContacts.requisites.inn }}</dd></div>
            <div class="flex justify-between gap-4"><dt class="text-mist-600">КПП</dt><dd class="font-semibold text-white">{{ companyContacts.requisites.kpp }}</dd></div>
            <div class="flex justify-between gap-4"><dt class="text-mist-600">Расчётный счёт</dt><dd class="text-right font-semibold text-white">{{ companyContacts.requisites.account }}</dd></div>
          </dl>
        </div>
      </div>

      <div>
        <form class="card space-y-4 p-7 md:p-8" @submit.prevent="submit">
          <h2 class="text-xl font-bold text-white">Форма обратной связи</h2>
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-mist-200" for="c-name">Имя *</label>
              <input id="c-name" v-model="form.name" type="text" required class="input-base">
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-mist-200" for="c-phone">Телефон *</label>
              <input id="c-phone" v-model="form.phone" type="tel" required class="input-base">
            </div>
          </div>
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-mist-200" for="c-email">Email</label>
              <input id="c-email" v-model="form.email" type="email" class="input-base">
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-mist-200" for="c-topic">Тема</label>
              <select id="c-topic" v-model="form.topic" class="input-base appearance-none">
                <option v-for="topic in topics" :key="topic" :value="topic">{{ topic }}</option>
              </select>
            </div>
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-mist-200" for="c-message">Сообщение *</label>
            <textarea id="c-message" v-model="form.message" rows="5" required class="input-base resize-none"></textarea>
          </div>
          <BaseButton type="submit" size="lg" block :disabled="sent">
            <AppIcon :name="sent ? 'check' : 'mail'" :size="20" />
            {{ sent ? 'Сообщение отправлено!' : 'Отправить' }}
          </BaseButton>
        </form>
      </div>
    </div>
  </div>
</template>
