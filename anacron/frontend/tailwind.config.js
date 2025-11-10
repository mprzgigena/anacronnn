/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores médicos profesionales
        medical: {
          primary: '#0066cc',     // Azul médico principal
          secondary: '#4a90e2',   // Azul claro
          accent: '#00a65a',      // Verde médico (éxito)
          warning: '#f39c12',     // Naranja (precaución)
          danger: '#e74c3c',      // Rojo (urgente)
          light: '#ecf0f1',       // Gris muy claro
          dark: '#2c3e50',        // Azul oscuro
        },
        turno: {
          pendiente: '#f39c12',   // Naranja
          confirmado: '#00a65a',  // Verde
          completado: '#3498db',  // Azul
          cancelado: '#e74c3c',   // Rojo
          noAsistio: '#95a5a6',   // Gris
        }
      },
      fontFamily: {
        'medical': ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '1rem',
      },
      boxShadow: {
        'medical': '0 4px 6px -1px rgba(0, 102, 204, 0.1), 0 2px 4px -1px rgba(0, 102, 204, 0.06)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}

