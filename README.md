# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

---

## PokemonCart Komponenti

**Fayl yolu:** `src/components/Custom/FormTask/PokemonCart/PokemonCart.jsx`

### Təsvir
`PokemonCart` — istifadəçinin Pokémon adı və şəkil URL-i daxil edərək kartına əlavə edə, mövcud Pokémonları görə və silə biləcəyi bir React komponentidir.

### İstifadə olunan React konseptləri
| Konsept | İzah |
|---|---|
| `useState` | Form sahələri (`name`, `imageUrl`) və kart siyahısı (`cart`) idarə olunur |
| Controlled Inputs | `value` + `onChange` ilə inputlar React state-ə bağlıdır |
| List rendering | `.map()` ilə kart siyahısı render edilir |
| Unikal `id` | `Date.now()` ilə hər yeni Pokémon üçün unikal `id` yaradılır |
| `.filter()` | `Remove` düyməsi basıldıqda həmin `id`-li element siyahıdan çıxarılır |

### State strukturu
```js
const [name, setName] = useState("");         // input: Pokémon adı
const [imageUrl, setImageUrl] = useState(""); // input: şəkil URL-i
const [cart, setCart] = useState([]);         // [ { id, name, image }, ... ]
```

### Funksionallıq

#### 1. Pokémon əlavə etmək
- İstifadəçi **Pokémon Name** və **Pokémon Image URL** sahələrini doldurur.
- **Add to Cart** düyməsinə basıldıqda yeni obyekt yaradılır və `cart` state-ə əlavə olunur.
- Sahələr avtomatik sıfırlanır.

```jsx
const newPokemon = { id: Date.now(), name: name.trim(), image: imageUrl.trim() };
setCart([...cart, newPokemon]);
setName("");
setImageUrl("");
```

#### 2. Kartı göstərmək
- `cart` boşdursa: **"No Pokémon in the cart yet."** mesajı görünür.
- `cart`-da element varsa: hər Pokémon üçün şəkil, ad və **Remove** düyməsi göstərilir.

#### 3. Pokémon silmək
- **Remove** düyməsi basıldıqda həmin Pokémonun `id`-si ilə siyahı filtrlənir.

```jsx
setCart(cart.filter((pokemon) => pokemon.id !== id));
```

### Fayl strukturu
```
PokemonCart/
├── PokemonCart.jsx         # Komponent məntiqi
└── pokemonCart.module.css  # CSS Modules ilə stillər
```

---

## EmailValidator Komponenti — Sətir-Sətir İzah

**Fayl yolu:** `src/components/Custom/FormTask/EmailValidator/EmailValidator.jsx`

---

### 1-ci sətir
```js
import { useState } from "react";
```
React-in `useState` hook-unu daxil edirik. Bu olmasa state istifadə edə bilmərik.

---

### 2-ci sətir
```js
import styles from "./emailValidator.module.css";
```
CSS Modules faylını import edirik. `styles.container`, `styles.input` kimi class adlarına bu dəyişən vasitəsilə çatırıq.

---

### 4–9-cu sətirləri
```js
const MIN_LENGTH = 10;
```
Email üçün minimum simvol sayını **sabit** (constant) kimi saxlayırıq. Rəqəmi bir yerdə dəyişmək kifayətdir — kodun hər yerinə avtomatik tətbiq olunur.

---

### 10-cu sətir
```js
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
```
Email yoxlamaq üçün **regex** (müntəzəm ifadə):

| Hissə | Mənası |
|---|---|
| `^` | Sətrin başlanğıcı |
| `[^\s@]+` | Boşluq (`\s`) və `@` olmayan ən az 1 simvol (istifadəçi adı) |
| `@` | Məcburi `@` işarəsi |
| `[^\s@]+` | `@`-dan sonra domen adı |
| `\.` | Nöqtə (literal `.`, `\.` yazılır çünki `.` regex-də "istənilən simvol" deməkdir) |
| `[a-zA-Z]{2,}` | Ən az 2 hərf (`.com`, `.az`, `.net` …) |
| `$` | Sətrin sonu |

---

### 12–27-ci sətirləri — `getErrors` funksiyası
```js
function getErrors(email) {
  const errors = [];
  ...
  return errors;
}
```
Komponentdən **kənarda** yazılmış saf (pure) funksiya. State istifadə etmir.  
`email` string alır, yoxlama keçməyən şərtlər üçün `errors` massivinə mesaj əlavə edir, massivi qaytarır.

```js
if (!email.includes("@")) { ... }
```
**Şərt 1:** `@` işarəsinin olub-olmadığını yoxlayır. `.includes()` — string metodudur, içərisində verilmiş simvol varsa `true` qaytarır.

```js
if (email.length < MIN_LENGTH) { ... }
```
**Şərt 2:** `.length` xüsusiyyəti string-in simvol sayını verir. `10`-dan azdırsa xəta əlavə olunur.

```js
if (email.length >= MIN_LENGTH && !EMAIL_REGEX.test(email)) { ... }
```
**Şərt 3:** Uzunluq şərti keçiləndən sonra regex yoxlanır. `.test()` — regex metodudur, uyğun gəlirsə `true` qaytarır. `!` ilə tersini alırıq (uyğun gəlmirsə xəta).

---

### 31–32-ci sətirləri — State-lər
```js
const [email, setEmail] = useState("");
const [submitted, setSubmitted] = useState(false);
```
| State | Başlanğıc dəyər | Məqsəd |
|---|---|---|
| `email` | `""` | Input sahəsinin cari dəyəri |
| `submitted` | `false` | Form göndərilib-göndərilmədiyini izləyir |

---

### 34–35-ci sətirləri
```js
const errors = getErrors(email);
const isValid = email.length > 0 && errors.length === 0;
```
Bu iki sətir **state deyil** — hər render-də yenidən hesablanır.

- `errors` — `getErrors` funksiyasını çağırır, xətalar massivinı qaytarır
- `isValid` — **`&&` (VƏ operatoru):** input boş deyilsə **VƏ** xəta yoxdursa `true` olur

> **`&&` izahı:** Hər iki şərt eyni anda `true` olmalıdır. Biri `false` olarsa nəticə `false`-dur.

---

### 37–39-cu sətirləri — `handleSubmit`
```js
const handleSubmit = (e) => {
  e.preventDefault();
  setSubmitted(true);
};
```
- `e.preventDefault()` — brauzer-in formu göndərib səhifəni yeniləməsinin qarşısını alır
- `setSubmitted(true)` — uğur mesajının göstərilməsi üçün state-i dəyişir

---

### 41–44-cü sətirləri — `handleChange`
```js
const handleChange = (e) => {
  setEmail(e.target.value);
  setSubmitted(false);
};
```
- `e.target.value` — input-da yazılan cari dəyər
- `setSubmitted(false)` — istifadəçi yazmağa davam etdikdə uğur mesajı gizlədilir

---

### 54–63-cü sətirləri — Dinamik className
```jsx
className={`${styles.input} ${
  email.length > 0
    ? isValid
      ? styles.inputValid
      : styles.inputInvalid
    : ""
}`}
```
**İç-içə üçlü operator (ternary):**
1. `email.length > 0` → boşdursa heç bir əlavə class yoxdur
2. Boş deyilsə → `isValid` yoxlanır:
   - `true` → `inputValid` (yaşıl haşiyə)
   - `false` → `inputInvalid` (qırmızı haşiyə)

---

### 65–75-ci sətirləri — Canlı şərt siyahısı
```jsx
{email.length > 0 && (
  <ul>
    {[ ...şərtlər massivi... ].map(({ key, label, ok }) => (
      <li className={ok ? styles.ruleOk : styles.ruleFail}>
        {ok ? "✓" : "✗"} {label}
      </li>
    ))}
  </ul>
)}
```
- `email.length > 0 &&` — input boşdursa siyahı render edilmir
- Şərtlər **obyektlər massivi** kimi yazılıb, `.map()` ilə hər biri `<li>` elementinə çevrilir
- `ok ? styles.ruleOk : styles.ruleFail` — şərt keçibsə yaşıl, keçməyibsə qırmızı class

---

### 78–82-ci sətirləri — Düymə
```jsx
<button type="submit" disabled={!isValid}>
  Yoxla
</button>
```
`disabled={!isValid}` — `isValid` false olduqda düymə deaktiv olur, basılmır.

---

### 87–89-cu sətirləri — Uğur mesajı
```jsx
{submitted && isValid && (
  <p>✓ Email düzgündür: <strong>{email}</strong></p>
)}
```
**İki `&&` ardıcıl:** Hər iki şərt `true` olmalıdır:
1. `submitted` — form göndərilib
2. `isValid` — email keçərlidir

Yalnız ikisi birlikdə `true` olduqda mesaj göstərilir.

---

### Fayl strukturu
```
EmailValidator/
├── EmailValidator.jsx         # Komponent məntiqi
└── emailValidator.module.css  # CSS Modules ilə stillər
```

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
