/**
 * Русские стоп-слова (предлоги, союзы, частицы) - только самые короткие
 */
const RUSSIAN_STOP_WORDS = new Set([
  'а',
  'в',
  'и',
  'к',
  'о',
  'с',
  'у',
  'я',
  'во',
  'да',
  'до',
  'за',
  'из',
  'ко',
  'на',
  'не',
  'ни',
  'но',
  'об',
  'от',
  'по',
  'со',
  'без',
  'для',
  'при',
  'под',
  'над',
  'про',
])

/**
 * Упрощённый русский стеммер - обрезает окончания слов
 * Возвращает корень слова для поиска похожих форм
 */
export function stemRussian(word: string): string {
  if (word.length < 4) return word.toLowerCase()

  const lower = word.toLowerCase()

  // Длинные окончания сначала (от длинных к коротким)
  const endings = [
    // Причастия/деепричастия
    'ывшись',
    'ившись',
    'ывши',
    'ивши',
    // Глаголы
    'ировать',
    'ывать',
    'ивать',
    'овать',
    // Существительные
    'ностью',
    'ности',
    'ность',
    'ением',
    'ением',
    'ками',
    'ами',
    'ями',
    // Прилагательные падежи
    'ейшего',
    'ейшему',
    'ейшей',
    'ейская',
    'ейское',
    'ейший',
    'ного',
    'ному',
    'ными',
    'ого',
    'его',
    'ому',
    'ему',
    'ой',
    'ей',
    'ий',
    'ый',
    'ая',
    'яя',
    'ое',
    'ее',
    'ие',
    'ые',
    'ою',
    'ею',
    'ию',
    'ью',
    'ом',
    'ем',
    'им',
    'ым',
    'ах',
    'ях',
    'ов',
    'ев',
    'ам',
    'ям',
    'ми',
    // Короткие
    'ть',
    'ся',
    'сь',
    'а',
    'я',
    'о',
    'е',
    'и',
    'ы',
    'у',
    'ю',
    'ь',
  ]

  for (const ending of endings) {
    if (lower.endsWith(ending) && lower.length - ending.length >= 3) {
      return lower.slice(0, -ending.length)
    }
  }

  return lower
}

/**
 * Разбивает текст на значимые слова (убирает стоп-слова)
 */
export function getSearchWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\wа-яё\s]/gi, ' ')
    .split(/\s+/)
    .filter((word) => word.length >= 2 && !RUSSIAN_STOP_WORDS.has(word))
}

/**
 * Нормализует строку для поиска: убирает пробелы, дефисы, спецсимволы,
 * приводит к нижнему регистру
 */
export function normalizeForSearch(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\s\-_.,!?()[\]{}'"]/g, '')
    .trim()
}

/**
 * Транслитерирует русский текст в латиницу для поиска по slug
 */
export function transliterate(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/а/g, 'a')
    .replace(/б/g, 'b')
    .replace(/в/g, 'v')
    .replace(/г/g, 'g')
    .replace(/д/g, 'd')
    .replace(/е/g, 'e')
    .replace(/ё/g, 'e')
    .replace(/ж/g, 'zh')
    .replace(/з/g, 'z')
    .replace(/и/g, 'i')
    .replace(/й/g, 'j')
    .replace(/к/g, 'k')
    .replace(/л/g, 'l')
    .replace(/м/g, 'm')
    .replace(/н/g, 'n')
    .replace(/о/g, 'o')
    .replace(/п/g, 'p')
    .replace(/р/g, 'r')
    .replace(/с/g, 's')
    .replace(/т/g, 't')
    .replace(/у/g, 'u')
    .replace(/ф/g, 'f')
    .replace(/х/g, 'h')
    .replace(/ц/g, 'c')
    .replace(/ч/g, 'ch')
    .replace(/ш/g, 'sh')
    .replace(/щ/g, 'sch')
    .replace(/ы/g, 'y')
    .replace(/ь/g, '')
    .replace(/ъ/g, '')
    .replace(/э/g, 'e')
    .replace(/ю/g, 'yu')
    .replace(/я/g, 'ya')
}
