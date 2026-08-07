<script setup lang="ts">
import { reactive, ref } from 'vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const form = reactive({ name: '', phone: '', email: '', consent: true })
const sent = ref(false)

function submit() {
  if (!form.name || !form.phone) return
  sent.value = true
  setTimeout(() => {
    sent.value = false
    form.name = ''
    form.phone = ''
    form.email = ''
  }, 4000)
}
</script>

<template>
  <section class="relative overflow-hidden py-16 md:py-24">
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-flame-500/5 to-transparent" />

    <div class="relative mx-auto max-w-7xl px-4 md:px-6">
      <div class="card relative overflow-hidden p-8 md:p-12">
        <div
          class="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-25 blur-3xl"
          style="background: radial-gradient(circle, #FFD700, transparent 70%)"
        />
        <div class="relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle
              eyebrow="Быстрая связь"
              title="Получите консультацию"
              subtitle="Оставьте заявку — менеджер перезвонит в течение 15 минут в рабочее время и поможет подобрать салют под ваш бюджет"
            />
            <ul class="space-y-3">
              <li v-for="item in ['Подберём салют под площадку и бюджет', 'Расскажем про технику безопасности', 'Рассчитаем доставку и установку']" :key="item" class="flex items-center gap-3 text-mist-200">
                <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-400/15 text-gold-400">
                  <AppIcon name="check" :size="14" />
                </span>
                {{ item }}
              </li>
            </ul>
          </div>

          <form class="space-y-4" @submit.prevent="submit">
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-mist-200" for="qf-name">Имя *</label>
              <input id="qf-name" v-model="form.name" type="text" required placeholder="Как к вам обращаться" class="input-base">
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-mist-200" for="qf-phone">Телефон *</label>
              <input id="qf-phone" v-model="form.phone" type="tel" required placeholder="+7 (___) ___-__-__" class="input-base">
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-mist-200" for="qf-email">Email</label>
              <input id="qf-email" v-model="form.email" type="email" placeholder="you@example.com" class="input-base">
            </div>
            <label class="flex items-start gap-2.5 text-xs leading-relaxed text-mist-400">
              <input v-model="form.consent" type="checkbox" class="mt-0.5 accent-flame-500">
              Согласен на обработку персональных данных согласно <RouterLink to="/docs/sert/" class="underline hover:text-gold-400">политике конфиденциальности</RouterLink>
            </label>
            <BaseButton type="submit" size="lg" block :disabled="sent">
              <AppIcon :name="sent ? 'check' : 'phone'" :size="20" />
              {{ sent ? 'Заявка отправлена!' : 'Получить консультацию' }}
            </BaseButton>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
