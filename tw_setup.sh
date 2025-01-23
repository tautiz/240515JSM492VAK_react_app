#!/bin/bash

# Tailwind CSS installeris egzistuojantiems Vite + React projektams
echo "⚡️ Vite + React + Tailwind CSS integratorius"

# 1. Tikriname ar yra package.json
if [ ! -f "package.json" ]; then
  echo "❌ Klaida: Nerastas package.json. Paleiskite šį skriptą projekto šakninėje direktorijoje."
  exit 1
fi

# 2. Įdiegiame reikiamus paketus
echo "📦 Instaliuojami paketai..."
npm install -D tailwindcss postcss autoprefixer

# 3. Inicializuojame Tailwind konfigūraciją
echo "⚙️ Kuriama konfigūracija..."
npx tailwindcss init -p

# 4. Sukuriame/atnaujiname Tailwind konfigūracijos failą
cat > tailwind.config.js <<EOF
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

# 5. Sukuriame Tailwind CSS bazinį failą
echo "🎨 Kuriamas CSS bazinis failas..."
cat > src/index.css <<EOF
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF

# 6. Patikriname ar importuotas CSS failas main.jsx
MAIN_FILE="src/main.jsx"
if grep -q "./index.css" "$MAIN_FILE"; then
  echo "✅ CSS importas jau egzistuoja"
else
  echo "📝 Pridedamas CSS importas..."
  sed -i.bak "/import ReactDOM from 'react-dom';/a\\
import './index.css';" "$MAIN_FILE"
  rm "$MAIN_FILE.bak"
fi

# 7. Patikrinimas
echo "✅ Instaliacija baigta!"
echo "🚽 Rekomenduojama paleisti: npm run dev"

# Bonus: Testinis elementas App.jsx
read -p "Ar norite pridėti testinį Tailwind elementą į App.jsx? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  sed -i.bak '/<React.StrictMode>/a\
    <div className="bg-red-100 p-4 m-4 rounded-lg">\
      🎉 Tailwind veikia!\
    </div>' src/App.jsx
  rm src/App.jsx.bak
  echo "✔️ Testinis elementas pridėtas!"
fi

echo "🛠️ Paleiskite: npm run dev"