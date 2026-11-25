/** Tokens extraídos do print do Figma */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        quadra: '#85D6FF',   // Frame 3 / botão Quadra
        areia: '#FFF4A6',    // Frame 4 / botão Areia
        casual: '#A9FFF0',   // Frame 5 / botão Rodinha
        nav: '#EAEAEA',      // barra inferior
        cta: '#FFDA59',      // botão "Simbora?"
        ceu: '#6091F9',      // topo do gradiente
        abismo: '#00019A',   // base do gradiente
        tinta: '#0F172A',
        fundo: '#F5F5F5'
      },
      fontFamily: {
        display: ['"Eras Bold ITC"', 'Montserrat', '"Trebuchet MS"', 'sans-serif']
      }
    }
  },
  plugins: []
}
