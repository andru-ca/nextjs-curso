// Usando ES modules - sintaxis moderna
import StyleDictionary from 'style-dictionary';

// Primero registramos el transformador personalizado globalmente
StyleDictionary.registerTransform({
  name: 'custom/color/rgb-to-hex',
  type: 'value',
  filter: (token) => {
    return token.$type === 'color' && 
           typeof token.$value === 'object' && 
           token.$value.default && 
           token.$value.default.model === 'rgb';
  },
  transform: (token) => {
    const rgb = token.$value.default;
    const toHex = (value) => Math.round(value).toString(16).padStart(2, '0');
    return `#${toHex(rgb.red)}${toHex(rgb.green)}${toHex(rgb.blue)}`;
  }
});

// Define la configuración.
const sd = new StyleDictionary({
  source: ['tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'styles/variables/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables',
      }],
      // Usa el transformador personalizado junto con los transformadores estándar
      transforms: ['name/kebab', 'custom/color/rgb-to-hex'],
    },
  },
});

// Construye todas las plataformas.
sd.buildAllPlatforms();