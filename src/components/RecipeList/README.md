# RecipeList Komponenti

## Ümumi məlumat

`RecipeList` komponenti [DummyJSON](https://dummyjson.com/recipes) API-sından reseptləri çəkir, kartlar şəklində göstərir və istifadəçinin seçdiyi reseptləri aşağıdakı cədvəldə idarə etməyə imkan verir.

---

## Fayl-fayl ətraflı izahat — hər biri nə edir və başqaları ilə necə bağlıdır?

---

### 1. `recipeReducer.js` — Bütün state-in "beyni"

Bu fayl üç şey ixrac edir:

```js
export const LS_KEY = "savedRecipes";
```
`localStorage`-da istifadə olunan açar adı. Bir yerdə saxlanır ki, bütün fayllar eyni açarı işlətsin.

```js
export const initialState = {
  recipes: [],
  saved: JSON.parse(localStorage.getItem(LS_KEY) || "[]"),
  loading: true,
};
```
- `recipes: []` — API-dan gələcək reseptlər üçün boş başlanğıc
- `saved: JSON.parse(...)` — Səhifə açılanda `localStorage`-dan əvvəlki siyahı oxunur. Heç nə yoxdursa boş massiv götürülür
- `loading: true` — Başlanğıcda yükləmə aktiv sayılır

```js
export function reducer(state, action) {
  switch (action.type) {
    case "SET_RECIPES":   // API cavabı gəldi → recipes-i yenilə, loading-i dayandır
    case "ADD_RECIPE":    // Resept əlavə et → saved-ə yeni element qoş
    case "REMOVE_RECIPE": // Resept sil → saved-dən id-yə görə filtrələ
  }
}
```
`dispatch({type: "..."})` çağırıldıqda `reducer` işə düşür və yeni state qaytarır. **Bu fayl özü heç nə render etmir, yalnız məntiq saxlayır.**

---

### 2. `RecipeList.jsx` — Əsas komponent, hamısını bir yerə yığır

```js
import { reducer, initialState, LS_KEY } from "./recipeReducer";
```
`recipeReducer.js`-dən hazır məntiq və başlanğıc dəyərləri götürülür.

```js
const [state, dispatch] = useReducer(reducer, initialState);
const { recipes, saved, loading } = state;
```
- `useReducer` — `initialState` ilə başlayır, hər `dispatch` çağırışında `reducer` işə düşür
- `state` içindən `recipes`, `saved`, `loading` çıxarılır

```js
useEffect(() => {
  UserService.getRecipes()
    .then((data) => dispatch({ type: "SET_RECIPES", payload: data }));
}, []);
```
- Komponent **ilk dəfə** ekrana gəldikdə işə düşür (boş `[]` asılılıq)
- API-dan reseptlər gəlir → `dispatch` çağırılır → `reducer`-dəki `SET_RECIPES` işə düşür → `recipes` dolar, `loading` `false` olur

```js
useEffect(() => {
  localStorage.setItem(LS_KEY, JSON.stringify(saved));
}, [saved]);
```
- Hər dəfə `saved` dəyişdikdə işə düşür
- Yeni siyahını `localStorage`-a yazır ki, səhifəni yeniləndikdə məlumat itməsin

```js
function addRecipe(recipe) {
  if (saved.find((r) => r.id === recipe.id)) {
    toast.warning(...);  // Artıq varsa əlavə etmə
    return;
  }
  dispatch({ type: "ADD_RECIPE", payload: recipe });
  toast.success(...);
}
```
- `RecipeCard`-dan gəlir (prop kimi ötürülür)
- Dublikat yoxlanılır → `reducer`-ə `ADD_RECIPE` göndərilir → `saved` yenilənir

```js
function deleteRecipe(id) {
  dispatch({ type: "REMOVE_RECIPE", payload: id });
  toast.success(...);
}
```
- `RecipeRow`-dan gəlir (prop kimi ötürülür)
- `reducer`-ə `REMOVE_RECIPE` göndərilir → `saved`-dən həmin id-li resept çıxarılır

```js
if (loading) return <Spinner />;
```
- `loading` hələ `true`-dursa kartlar yerinə `Spinner` göstərilir

```jsx
<RecipeCard
  recipe={recipe}
  onGetRecipe={addRecipe}
  isAdded={saved.some((r) => r.id === recipe.id)}
/>
```
- Hər kart üçün `isAdded` hesablanır: bu resept `saved`-dədirsə `true`, deyilsə `false`
- `addRecipe` funksiyası `onGetRecipe` kimi karta ötürülür

```jsx
<RecipeRow recipe={recipe} onRemove={deleteRecipe} />
```
- Cədvəlin hər sətiri `RecipeRow`-a ötürülür
- `deleteRecipe` funksiyası `onRemove` kimi sətirə ötürülür

---

### 3. `RecipeCard.jsx` — Hər reseptin kart görünüşü

```jsx
export default function RecipeCard({ recipe, onGetRecipe, isAdded }) {
```
`RecipeList.jsx`-dən üç prop alır:
- `recipe` — göstəriləcək resept obyekti
- `onGetRecipe` — düyməyə klik olduqda çağırılacaq `addRecipe` funksiyası
- `isAdded` — bu reseptin artıq cədvəldə olub olmadığını bildirir (`true/false`)

```jsx
<button
  className={`${styles.getBtn} ${isAdded ? styles.getBtnAdded : ""}`}
  onClick={() => onGetRecipe(recipe)}
>
  {isAdded ? "✔ Added" : "Get Recipe"}
</button>
```
- `isAdded === true` → düymə yaşıl + "✔ Added" yazır (klik olsa da artıq dublikat yoxlanılır)
- `isAdded === false` → düymə normal + "Get Recipe" yazır
- Klik olduqda `RecipeList.jsx`-dəki `addRecipe` funksiyası çağırılır

---

### 4. `RecipeRow.jsx` — Cədvəldəki hər sətir + modal idarəsi

```jsx
const [modal, setModal] = useState(null);
// null | "ingredients" | "instructions" | "confirm"
```
Bu komponent öz lokal `modal` state-ini saxlayır. Hansı modal açıq olduğunu burada bilir.

```jsx
function openModal(type) { setModal(type); }
function openRemoveModal() { setModal("confirm"); }
```
- **Ingredients** düyməsi → `openModal("ingredients")` → `modal = "ingredients"`
- **Instructions** düyməsi → `openModal("instructions")` → `modal = "instructions"`
- **Remove** düyməsi → `openRemoveModal()` → `modal = "confirm"`

```jsx
{modal === "ingredients" && (
  <Modal title={`${recipe.name} — Ingredients`} items={recipe.ingredients} onClose={() => setModal(null)} />
)}
{modal === "instructions" && (
  <Modal title={`${recipe.name} — Instructions`} items={recipe.instructions} onClose={() => setModal(null)} />
)}
{modal === "confirm" && (
  <ConfirmModal
    name={recipe.name}
    onConfirm={() => { onRemove(recipe.id); setModal(null); }}
    onCancel={() => setModal(null)}
  />
)}
```
- `modal` dəyərinə görə müvafiq modal render olunur
- `onClose` / `onCancel` → `setModal(null)` → modal bağlanır
- `onConfirm` → `onRemove(recipe.id)` çağırılır (`RecipeList.jsx`-dəki `deleteRecipe`) + modal bağlanır

---

### 5. `Modal.jsx` — Ingredients / Instructions məlumat modalı

```jsx
export default function Modal({ title, items, onClose }) {
```
`RecipeRow.jsx`-dən üç prop alır:
- `title` — modal başlığı (məs: `"Pasta — Ingredients"`)
- `items` — göstəriləcək siyahı (ya `recipe.ingredients`, ya `recipe.instructions`)
- `onClose` — bağlama üçün funksiya (`setModal(null)`)

```jsx
<div className={styles.overlay} onClick={onClose}>
  <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
```
- Arxa şəffaf sahəyə (`overlay`) klik → `onClose` işə düşür → modal bağlanır
- Modal pəncərəsinin özünə klik → `stopPropagation` ilə klik arxaya keçmir → modal bağlanmır

```jsx
{items.map((item, i) => (
  <li key={i} className={styles.modalItem}>{item}</li>
))}
```
`items` massivinin hər elementi `<li>` kimi göstərilir.

---

### 6. `ConfirmModal.jsx` — Silmə təsdiq modalı

```jsx
export default function ConfirmModal({ name, onConfirm, onCancel }) {
```
`RecipeRow.jsx`-dən üç prop alır:
- `name` — silinmək istənən reseptin adı (göstərmək üçün)
- `onConfirm` — "Bəli, sil" klik → `onRemove(id)` + `setModal(null)`
- `onCancel` — "Ləğv et" klik → yalnız `setModal(null)`

```jsx
<div className={styles.overlay} onClick={onCancel}>
```
Arxa şəffaf sahəyə klik → `onCancel` → modal bağlanır, heç nə silinmir.

```jsx
<button onClick={onConfirm}>Bəli, sil</button>
<button onClick={onCancel}>Ləğv et</button>
```
- **Bəli, sil** → `RecipeList.jsx`-dəki `deleteRecipe(id)` çağırılır → reducer `REMOVE_RECIPE` işlədır → `saved`-dən çıxarılır → `localStorage` yenilənir → `toast.success`
- **Ləğv et** → yalnız modal bağlanır

---

### 7. `Spinner.jsx` — Yükləmə animasiyası

```jsx
export default function Spinner() {
  return <div className={styles.spinner}></div>;
}
```
- Yalnız bir `div` render edir, CSS `@keyframes spin` ilə fırlanır
- `RecipeList.jsx`-də `if (loading) return <Spinner />` şərti ilə göstərilir
- API cavabı gəlib `SET_RECIPES` dispatch olunanda `loading: false` olur → `Spinner` yox olur

---

## Ümumi data axını (tam zəncir)

```
recipeReducer.js
  └─ initialState, reducer, LS_KEY ixrac edir
        ↓
RecipeList.jsx
  ├─ useReducer(reducer, initialState) → state = {recipes, saved, loading}
  ├─ useEffect #1 → API çağırışı → dispatch(SET_RECIPES) → recipes dolar, loading false olur
  ├─ useEffect #2 → saved dəyişdikdə localStorage-a yaz
  ├─ addRecipe → dispatch(ADD_RECIPE) → saved-ə əlavə olunur
  ├─ deleteRecipe → dispatch(REMOVE_RECIPE) → saved-dən çıxarılır
  │
  ├─ loading=true? → <Spinner /> göstər
  │
  ├─ recipes.map → <RecipeCard recipe onGetRecipe={addRecipe} isAdded />
  │      └─ klik → addRecipe(recipe) çağırılır
  │
  └─ saved.map → <RecipeRow recipe onRemove={deleteRecipe} />
         ├─ [Ingredients] klik → modal="ingredients" → <Modal items={recipe.ingredients} />
         ├─ [Instructions] klik → modal="instructions" → <Modal items={recipe.instructions} />
         └─ [Remove] klik → modal="confirm" → <ConfirmModal>
                ├─ "Bəli, sil" → deleteRecipe(id) → dispatch(REMOVE_RECIPE)
                └─ "Ləğv et"  → modal bağlanır
```

---

## Komponentlər — hər biri nə edir?

### `RecipeList.jsx` — Əsas komponent
- `useReducer` ilə bütün state-i idarə edir (`recipes`, `saved`, `loading`)
- `useEffect` ilə API-dan data çəkir
- `useEffect` ilə `saved` dəyişdikdə `localStorage`-a yazır
- `addRecipe` — resepti siyahıya əlavə edir
- `deleteRecipe` — resepti siyahıdan silir
- `RecipeCard` və `RecipeRow` komponentlərini render edir

---

### `RecipeCard.jsx` — Resept kartı
- Hər resepti ayrıca kart şəklində göstərir (şəkil, ad, mətbəx)
- `isAdded` prop-u `true` olduqda düymə **"✔ Added"** (yaşıl) görünür
- `isAdded` `false` olduqda düymə **"Get Recipe"** görünür
- Düyməyə klik edildikdə `addRecipe` funksiyası çağırılır

---

### `RecipeRow.jsx` — Cədvəl sətri
- `saved` siyahısındakı hər resept üçün cədvəldə bir sətir yaradır
- Özünün lokal `modal` state-i var (`useState`)
- **Ingredients**, **Instructions**, **Remove** düymələrini idarə edir
- Düymələrə klik olduqda müvafiq modal açılır

---

### `Spinner.jsx` — Yükləmə animasiyası
- API sorğusu tamamlanana qədər ekranda fırlanan dairə göstərir
- `loading: true` olduqda `RecipeList` bu komponenti render edir
- Data gəldikdən sonra avtomatik yox olur

---

## Modallar — hər biri nə edir?

### `Modal.jsx` — Məlumat modalı
- **Ingredients** və ya **Instructions** düyməsinə klik edildikdə açılır
- `title` — modal başlığı (resept adı + növ)
- `items` — siyahı elementi kimi göstəriləcək məlumatlar (array)
- `onClose` — bağlama funksiyası
- Kənar sahəyə (`overlay`) klik etdikdə bağlanır
- Modal içinə klik etdikdə `stopPropagation` ilə bağlanmır

```
[ Ingredients ] klik  →  Modal açılır  →  materiallar siyahısı görünür
[ Instructions ] klik →  Modal açılır  →  addım-addım izahat görünür
```

---

### `ConfirmModal.jsx` — Silmə təsdiq modalı
- **Remove** düyməsinə klik edildikdə açılır
- Birbaşa silmək əvəzinə istifadəçidən təsdiq alır
- **"Bəli, sil"** → `deleteRecipe(id)` çağırılır → sətir silinir → `toast.success`
- **"Ləğv et"** → modal bağlanır, heç nə silinmir
- Kənar sahəyə klik → modal bağlanır, heç nə silinmir

```
[ Remove ] klik
     ↓
ConfirmModal açılır: "Silmək istədiyinizə əminsiniz?"
     ├── "Bəli, sil"  → silinir + toast
     └── "Ləğv et"   → bağlanır
```

---

## İstifadə olunan texnologiyalar

| Texnologiya | Məqsəd |
|---|---|
| `useState` | Reseptlər, seçilmişlər və yükləmə vəziyyəti |
| `useEffect` | Komponent mount olduqda API-dan data çəkmək |
| `axios` (UserService) | HTTP sorğusu |
| `react-toastify` | Bildiriş mesajları |
| CSS Modules | Komponent səviyyəsində stillər |

---

## Komponent strukturu

```
RecipeList          ← əsas komponent (state + API)
├── RecipeCard      ← hər resept kartı
├── RecipeRow       ← cədvəldəki hər sətir
│   ├── Modal           ← Ingredients / Instructions modalı
│   └── ConfirmModal    ← Silmə təsdiq modalı
```

---

## State

```js
const [recipes, setRecipes] = useState([]);   // API-dan gələn bütün reseptlər
const [saved,   setSaved]   = useState([]);   // cədvələ əlavə edilənlər
const [loading, setLoading] = useState(true); // yükləmə vəziyyəti
```

---

## İş axını

### 1. Data çəkmək
```js
useEffect(() => {
  UserService.getRecipes()
    .then(setRecipes)
    .finally(() => setLoading(false));
}, []);
```
Komponent ilk dəfə render olduqda API sorğusu göndərilir, gələn data `recipes` state-ə yazılır.

---

### 2. Get Recipe
```js
function handleGetRecipe(recipe) {
  if (saved.find((r) => r.id === recipe.id)) {
    toast.info("artıq əlavə olunub");
    return;
  }
  setSaved((prev) => [...prev, recipe]);
  toast.success("əlavə edildi!");
}
```
- Resept artıq cədvəldədirsə → `toast.info`
- Yeni reseptdirsə → `saved`-ə əlavə olunur → `toast.success`

---

### 3. Ingredients / Instructions modalları

`RecipeRow` daxilindəki `modal` state hansı modalın açıq olduğunu bildirir:

```js
const [modal, setModal] = useState(null);
// null | "ingredients" | "instructions" | "confirm"
```

Düyməyə klik → `setModal("ingredients")` → `<Modal>` komponenti render olunur.

---

### 4. Remove (silmə təsdiqi)

**Remove** düyməsinə klik edildikdə birbaşa silmək əvəzinə `ConfirmModal` açılır:

```
Remove klik
   ↓
ConfirmModal açılır
   ├── "Bəli, sil"  → onRemove(id) + toast.error
   └── "Ləğv et"   → modal bağlanır, heç nə dəyişmir
```

---

### 5. Toast bildirişləri

| Hadisə | Toast növü |
|---|---|
| Resept əlavə edildi | `toast.success` |
| Resept artıq var | `toast.info` |
| Resept silindi | `toast.error` |

---

## Modal qaydaları

- Kənar sahəyə (`overlay`) klik → modal bağlanır
- Modal içinə klik → bağlanmır (`stopPropagation`)
- **Close** / **Ləğv et** düyməsi → modal bağlanır
