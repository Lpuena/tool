import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      btn: 'transition-all duration-200 transform hover:scale-105 active:scale-95 text-white font-medium px-7 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300',
    },
    {
      'a-btn': 'relative text-gray-600 hover:text-gray-900 transition-colors after:block after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600  hover:after:w-full after:transition-all',
    },
  ],
  rules: [
  ],
  theme: {
    colors: {
      // ...
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
