import { defineStore } from 'pinia'
import type { ChapterToSection } from '@/store/modules/guide/types'

const useGuideStore = defineStore('guide', () => {
  const chapterToSection = ref<Array<ChapterToSection>>([])

  const addChapterToSection = (cts: ChapterToSection) => {
    if (chapterToSection.value.some(c => c.chapterId === cts.chapterId)) {
      return
    }
    chapterToSection.value.push(cts)
  }
  const removeChapterToSection = (chapterId: number) => {
    chapterToSection.value = chapterToSection.value.filter(c => c.chapterId !== chapterId)
  }
  const getChapterToSection = (chapterId: number) => {
    return chapterToSection.value.find(c => c.chapterId === chapterId)
  }
  const getNextSection = (chapterId: number, sectionId: number) => {
    const cts = getChapterToSection(chapterId)
    if (!cts) {
      return null
    }
    const index = cts.sectionIdList.findIndex(s => s === sectionId)
    if (index === -1) {
      return null
    }
    return cts.sectionIdList[index + 1] || null
  }
  return {
    chapterToSection,
    addChapterToSection,
    removeChapterToSection,
    getChapterToSection,
    getNextSection,
  }
})

export default useGuideStore
