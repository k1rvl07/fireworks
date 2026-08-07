<script setup lang="ts">
import { team } from '@/data/site'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import SparkBackground from '@/components/ui/SparkBackground.vue'
</script>

<template>
  <div class="relative overflow-hidden">
    <SparkBackground :density="35" :opacity="0.45" />

    <section class="relative mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <SectionTitle
        eyebrow="О компании"
        title="Фейерверк-Мастер — 10 лет ярких праздников"
        subtitle="Мы верим, что каждый праздник достоин неба. Поэтому с 2016 года делаем его по-настоящему незабываемым"
      />

      <div class="grid gap-10 lg:grid-cols-2">
        <div v-reveal class="space-y-5 text-mist-200">
          <p>
            Компания «Фейерверк-Мастер» начиналась с небольшого склада и одного пиротехника. Сегодня это команда
            из 12 специалистов, собственный склад площадью 400 м² и парк залповых установок для шоу любой сложности.
          </p>
          <p>
            Наша миссия — дарить людям яркие эмоции, делая это <b class="text-white">безопасно и профессионально</b>.
            Каждое изделие проходит контроль качества, каждая площадка — проверку на безопасность, каждый сценарий —
            согласование с нашими инженерами.
          </p>
          <p>
            Мы работаем по лицензии МЧС, сотрудничаем с лучшими производителями пиротехники и состоям в Российской
            пиротехнической ассоциации. За 10 лет мы провели более 1200 мероприятий — от домашних праздников до
            городских фестивалей с десятками тысяч зрителей.
          </p>

          <div class="grid grid-cols-3 gap-4 pt-4">
            <div v-for="value in [
              { icon: 'shield', title: 'Безопасность', text: 'как главный приоритет' },
              { icon: 'badge', title: 'Качество', text: 'сертифицированных изделий' },
              { icon: 'heart', title: 'Индивидуальность', text: 'программа под каждого' },
            ]" :key="value.title" class="card p-4 text-center">
              <AppIcon :name="value.icon" :size="22" class="mx-auto mb-2 text-gold-400" />
              <p class="text-sm font-bold text-white">{{ value.title }}</p>
              <p class="mt-1 text-xs text-mist-400">{{ value.text }}</p>
            </div>
          </div>
        </div>

        <div v-reveal="{ delay: 120 }" class="grid grid-cols-2 gap-4">
          <div
            v-for="(photo, i) in [
              { label: 'Склад пиротехники', gradient: ['#FF6A00', '#FFD700'] },
              { label: 'Офис и шоурум', gradient: ['#00A3FF', '#A35CFF'] },
              { label: 'Залповые установки', gradient: ['#FFD700', '#00E5A0'] },
              { label: 'Команда на площадке', gradient: ['#FF2D55', '#FF9A3D'] },
            ]" :key="i"
            class="group relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-white/10"
            :style="{ background: `linear-gradient(135deg, ${photo.gradient[0]}44, ${photo.gradient[1]}33), radial-gradient(circle at 40% 30%, ${photo.gradient[0]}55, transparent 55%), #0B0E1A` }"
          >
            <AppIcon name="sparkles" :size="34" class="text-white/70 transition-transform duration-300 group-hover:scale-110" />
            <span class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night-950/95 to-transparent p-3 pt-8 text-xs font-semibold text-white">
              {{ photo.label }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <SectionTitle eyebrow="Команда" title="Люди, которые делают праздник" center />
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="(member, i) in team" :key="member.id" v-reveal="{ delay: i * 80 }" class="card group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40">
          <div
            class="flex aspect-square items-center justify-center"
            :style="{ background: `linear-gradient(135deg, ${member.gradient[0]}55, ${member.gradient[1]}33), radial-gradient(circle at 50% 35%, ${member.gradient[0]}66, transparent 60%), #0B0E1A` }"
          >
            <span class="flex h-20 w-20 items-center justify-center rounded-full text-3xl font-extrabold text-night-950" :style="{ background: `linear-gradient(135deg, ${member.gradient[0]}, ${member.gradient[1]})` }">
              {{ (member.name.split(' ')[0] ?? '').charAt(0) }}
            </span>
          </div>
          <div class="p-5">
            <h3 class="font-bold text-white">{{ member.name }}</h3>
            <p class="mt-0.5 text-sm font-semibold text-gold-400">{{ member.role }}</p>
            <p class="mt-2 text-sm leading-relaxed text-mist-400">{{ member.bio }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <SectionTitle eyebrow="Достижения" title="Награды и членство" />
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="(award, i) in [
          { title: 'Член Российской пиротехнической ассоциации', year: 'с 2018' },
          { title: 'Лучший оператор праздничных мероприятий Москвы', year: '2023' },
          { title: 'Победитель фестиваля фейерверков «Русская зима»', year: '2024' },
          { title: 'Благодарность Правительства Москвы', year: '2025' },
        ]" :key="i" v-reveal="{ delay: i * 80 }" class="card flex items-start gap-4 p-5">
          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-400/15 text-gold-400">
            <AppIcon name="badge" :size="20" />
          </span>
          <div>
            <p class="text-sm font-semibold text-white">{{ award.title }}</p>
            <p class="mt-1 text-xs text-mist-600">{{ award.year }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
