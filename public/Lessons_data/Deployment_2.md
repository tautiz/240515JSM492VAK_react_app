# React ir Vite Aplikacijų Deploy naudojant Vercel: Visapusiškas Vadovas

**Įvadas**  
Ši mokymo programa sukursite nuo nulio React aplikaciją su Vite, sukonfigūruosite produkcinį build'ą ir išmoksite ją visapusiškai deploy'inti naudojant Vercel platformą. Kursas pritaikytas tiek pradedantiesiems, tiek pažengusiems kūrėjams.

## 1. Pamoka: Vercel Platformos Pagrindai
### 1.1 Kas yra Vercel?
Vercel yra serverless cloud platforma, specializuota moderniems front-end aplikacijų hostinimui. Pagrindiniai privalumai[^3][^5]:
- Automatinis CI/CD (Continuous Integration/Continuous Deployment)
- Integracija su GitHub, GitLab, Bitbucket
- Globalus CDN tinklas
- Serverless funkcijų palaikymas

**Pavyzdys: Vercel Deployment Ciklas**  

Kodo pakeitimas → Push į Git → Automatinis build'as → Deploy visuose CDN mazguose

### 1.2 Vercel vs Tradiciniai Hostingai
| Charakteristika       | Vercel           | Tradicinis Hostingas |
|------------------------|------------------|----------------------|
| Scalability            | Auto-scaling     | Rankinis valdymas    |
| Deployment greitis      | 10-30 sek.       | 5-15 min.            |
| Serverio konfigūracija  | Nereikalinga     | Reikalinga           |
| Kaina                   | Pay-as-you-go    | Fiksuota             |

**Pratimas #1:**  
Sugalvokite 2 skirtingus projektų scenarijus (mažas portfolio ir didelis e-commerce). Kuriuo atveju rinktumėte Vercel? Atsakymą pagrįskite.

## 2. Pamoka: Projekto Kūrimas ir Konfigūracija
### 2.1 React + Vite Inicijavimas

```
npm create vite@latest mano-projektas --template react-ts
cd mano-projektas
npm install
npm run dev
```

**Konfigūracijos Failas (vite.config.ts):**

```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
plugins: [react()],
base: '/mano-projektas/',  \# Svarbu statiniams deploy'ams
build: {
outDir: 'dist',
assetsDir: 'static'
}
})
```

### 2.2 Svarbūs Build Parametrai
- **base:** Nustato root path'ą (būtinas GitHub Pages ar subdomain'ams)
- **assetsInclude:** Papildomi assetų tipai
- **server.hmr:** Karštojo perkrovimo konfigūracija

**Užduotis:** Modifikuokite base parametrą kad jis atitiktų jūsų GitHub vartotojo vardą. Kaip tai paveiks assetų kelius?

## 3. Pamoka: Deploy Processas Vercel
### 3.1 Automatinis Deploy per Git Integraciją
1. Prisijungti prie Vercel paskyros
2. Pasirinkti GitHub/GitLab/Bitbucket repozitoriją
3. Konfigūruoti build nustatymus:
```
{
"buildCommand": "npm run build",
"outputDirectory": "dist",
"installCommand": "npm ci"
}
```

4. Patvirtinti deploy

**Problemos Sprendimas:** Ką daryti jei build'as nepavyksta dėl trūkstamų dependencies?  
Sprendimas[^6]: Įsitikinti kad visos build dependencies yra `dependencies` sekcijoje, ne `devDependencies`

### 3.2 Rankinis Deploy naudojant Vercel CLI

```
npm install -g vercel
vercel login
vercel deploy --prod
```

**Pratimas #2:** Palyginkite automatinio ir rankinio deploy privalumus/trūkumus. Kuriuo atveju ką naudotumėte?

## 4. Pamoka: Pažengusios Temos
### 4.1 Custom Domain Konfigūracija
1. Įsigyti domeną (pvz., per Namecheap)
2. Vercel Dashboard → Settings → Domains
3. Pridėti DNS įrašus:

```
Type: A     Name: @      Value: 76.76.21.21
Type: CNAME Name: www    Value: cname.vercel-dns.com
```

**Svarbu:** SSL sertifikatas generuojamas automatiškai per 24h[^8]

### 4.2 Environment Variables
Vercel sistemos kintamieji[^5]:

```
// .env.local
VITE_API_KEY=your_key_here
VITE_VERCEL_ENV=production

```

**Užduotis:** Sukurkite skirtingus environment kintamuosius development ir production režimams.

## 5. Įvertinimas ir Testavimas
### 5.1 Žinių Testas

1. Ką daro `vercel deploy --prebuilt`?
   a) Sukuria naują build'ą  
   b) Naudoja jau sukompiliuotą build'ą  
   c) Atkuria seną versiją  

2. Kuris CLI įrankis naudojamas Vercel autentifikacijai?
   a) `vercel auth`  
   b) `vercel login`  
   c) `vercel connect`

**Atsakymai:** 1-b, 2-b

### 5.2 Galutinis Projektas
Sukurkite ir išdeploy'inkite React aplikaciją su šiomis funkcijomis:
- Custom domain
- 3 skirtingi environment kintamieji
- GitHub Actions CI/CD
- Vienas serverless API endpoint

## 6. Geriausios Praktikos
1. **Dependency Management:**  
   Visada naudokite `npm ci` vietoj `npm install` build procese[^6]

2. **Build Optimizacija:**  
   Vite statiniai assetai turėtų būti mažesni nei 100KB[^4]

3. **Klaidų Gavyba:**  
   Naudokite `vercel logs --scope your-project-id` klaidų analizei

**Iššūkis:** Kas atsitiks jei bandysite deploy'inti projektą be `vite.config.js`? Kaip tai išspręstumėte?

## Išvados ir Tolimesnis Mokymasis

Sėkmingai išmokote pagrindinius Vercel deploy proceso aspektus. Tolesni žingsniai:
- Serverless funkcijų integravimas
- Edge Network konfigūracija
- A/B testavimo įrankių naudojimas

**Papildomi Šaltiniai:**  
- [Vercel Oficiali Dokumentacija](https://vercel.com/docs) [^3][^5]  
- [Vite Deployment Best Practices](https://vitejs.dev/guide/static-deploy.html) [^4][^7]  
- [React TypeScript Vercel Template](https://github.com/daniel-nagy/vercel-react-vite-template) [^1]

```
[^1]: https://github.com/daniel-nagy/vercel-react-vite-template

[^2]: https://www.youtube.com/watch?v=0u1QeJG2dYk

[^3]: https://vercel.com/guides/deploying-react-with-vercel

[^4]: https://dev.to/fab_builder/react-vite-the-ultimate-guide-to-static-application-deployment-cik

[^5]: https://vercel.com/docs/frameworks/vite

[^6]: https://stackoverflow.com/questions/72001670/how-to-deploy-react-typescript-app-to-vercel-with-vite

[^7]: https://dev.to/fab_builder/deploying-a-static-vite-react-app-a-complete-guide-1l76

[^8]: https://www.youtube.com/watch?v=LiQdOAkXkks

[^9]: https://vercel.com/templates/react/vite-react

[^10]: https://www.reddit.com/r/react/comments/1h13i4w/react_vite_deploy_in_vercel_error/

[^11]: https://stackoverflow.com/questions/78131377/why-im-not-able-to-deploy-my-vite-app-on-vercel

[^12]: https://stackoverflow.com/questions/78098996/how-to-deploy-a-vite-react-ssr-application-on-vercel

[^13]: https://vercel.com/docs/projects/project-configuration

[^14]: https://www.youtube.com/watch?v=7T4w0QJtL-o

[^15]: https://www.youtube.com/watch?v=LiQdOAkXkks

[^16]: https://www.youtube.com/watch?v=FvsvHzcwOmQ

[^17]: https://codeparrot.ai/blogs/a-beginners-guide-to-using-vite-react

[^18]: https://robiul.dev/deploy-vite-react-app-on-both-github-pages-and-vercel

[^19]: https://www.youtube.com/watch?v=CNJkX9rYI8U

[^20]: https://dzone.com/articles/how-use-and-deploy-vite-with-react

[^21]: https://www.reddit.com/r/react/comments/1alyunr/deploying_vite_react_app_on_vercel_doesnt_show_up/

[^22]: https://github.com/vercel/vercel/discussions/6538

[^23]: https://vite.dev/guide/build
```