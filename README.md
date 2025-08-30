

Aplikacja Book Tracker na potrzeby rekrutacji

## Instalacja

### 1. Sklonuj repozytorium
```bash
git clone https://github.com/bartekmazik/zadanie_rekrutacyjne.git
cd zadanie_rekrutacyjne
```
### 2. Setup npm
```bash
npm i
```
### 3. Setup bazy danych
```bash
npx prisma migrate dev
npx prisma db seed
```
### 4. Uruchomienie aplikacji
```bash
npm run dev
```
### 5. Wejdź w [http://localhost:3000](http://localhost:3000) na przeglądarce
