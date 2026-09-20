# Lumirai IA - Frontend (Web)

Bienvenido al repositorio del Frontend web de **Lumirai IA**. Esta aplicación es la interfaz principal para acceder al salón de clases interactivo y a la tutora virtual (Nexa).

## Tecnologías Utilizadas
- **React 19**
- **Vite**
- **React Router DOM**
- **Bootstrap 5** (Base de grillas y utilidades)
- **CSS Personalizado** (Estilos Glassmorphism, paletas dinámicas)

## Estructura del Proyecto

```text
frontend/
├── public/              # Archivos estáticos
├── src/
│   ├── assets/          # Imágenes y recursos gráficos
│   ├── components/      # Componentes UI reutilizables (Sidebar, Modales, Tarjetas)
│   ├── layouts/         # Plantillas base (DashboardLayout, AuthLayout)
│   ├── pages/           # Vistas principales (Salón, Landing, Login, Onboarding)
│   ├── index.css        # Estilos globales y diseño responsive
│   ├── main.jsx         # Punto de entrada de React
│   └── App.jsx          # Enrutamiento principal
└── vite.config.js       # Configuración del empaquetador
```

## Instalación y Uso

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Levanta el servidor de desarrollo local (puerto 5420):
   ```bash
   npm run dev
   ```

3. Construir para producción:
   ```bash
   npm run build
   ```

## Notas de Desarrollo
- La plataforma ha sido optimizada para ser completamente **responsive**.
- Toda la lógica visual repetitiva se ha extraído a la carpeta `components/` y `layouts/`.
