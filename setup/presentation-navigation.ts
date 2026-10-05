import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useNav, useSlideContext } from '@slidev/client'
import sections from '../config/section-overviews.json'

export function usePresentationNavigation() {
  const { $nav } = useSlideContext()
  const { isPrintMode, isPresenter } = useNav()
  const router = useRouter()
  const contentSlides = computed(() => $nav.value.slides.filter(slide =>
    !slide.meta.slide.frontmatter.presentationCover
    && !slide.meta.slide.frontmatter.sectionOverview && !slide.meta.slide.frontmatter.presentationContents))
  const chapters = computed(() => sections.flatMap(section => {
    const slides = contentSlides.value.filter(slide => slide.meta.slide.frontmatter.readmeMajor === section.anchor)
    const overview = $nav.value.slides.find(slide => slide.meta.slide.frontmatter.sectionOverview
      && slide.meta.slide.frontmatter.readmeAnchor === section.anchor)
    return slides.length && overview ? [{ ...section, page: overview.no, slides }] : []
  }))
  const contentsPage = computed(() => $nav.value.slides.find(slide => slide.meta.slide.frontmatter.presentationContents)?.no)
  const href = (page: number) => isPrintMode.value
    ? `https://picoos.invalid/slide/${page}`
    : router.resolve({ path: `${isPresenter.value ? '/presenter' : ''}/${page}` }).href
  return { navigation: $nav, chapters, contentSlides, contentsPage, href }
}
