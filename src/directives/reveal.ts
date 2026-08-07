import type { Directive } from 'vue'

const reveal: Directive<HTMLElement> = {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (binding.value?.delay) {
      el.style.transitionDelay = `${binding.value.delay}ms`
    }
    if (typeof binding.value === 'number') {
      el.style.transitionDelay = `${binding.value}ms`
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('revealed')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
  },
}

export default reveal
