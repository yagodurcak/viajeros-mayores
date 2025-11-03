# 🛠️ ESLint, Prettier y Husky - Guía Completa

## 📋 Scripts Disponibles

### Linting (ESLint)

```bash
# Ejecutar el linter y ver errores
npm run lint

# Ejecutar el linter y corregir errores automáticamente
npm run lint:fix
```

### Formateo (Prettier)

```bash
# Formatear todo el código automáticamente
npm run format

# Verificar si el código está bien formateado (sin hacer cambios)
npm run format:check
```

### Type Checking (TypeScript)

```bash
# Verificar tipos de TypeScript sin compilar
npm run type-check
```

## 🎣 Git Hooks con Husky

Husky está configurado para ejecutar verificaciones automáticas en momentos clave del flujo de Git:

### Pre-commit Hook

Se ejecuta **antes de cada commit** y verifica:

- ✅ **ESLint**: Corrige automáticamente errores de linting
- ✅ **Prettier**: Formatea el código automáticamente
- 📦 Solo se ejecuta en archivos que están en staging (más rápido)

**¿Qué hace?**

- Ejecuta `lint-staged` que aplica ESLint y Prettier solo a los archivos modificados
- Si hay errores que no se pueden corregir automáticamente, el commit se cancela

### Pre-push Hook

Se ejecuta **antes de hacer push** y verifica:

- ✅ **Type Check**: Verifica que no haya errores de TypeScript
- ✅ **Lint**: Verifica que no haya errores de ESLint en todo el proyecto

**¿Qué hace?**

- Ejecuta `npm run type-check` para verificar tipos
- Ejecuta `npm run lint` para verificar errores de linting
- Si hay errores, el push se cancela

### ⚠️ ¿Qué pasa si los hooks fallan?

Si un hook falla (encuentra errores), Git cancelará la operación (commit o push). Debes:

1. Revisar los errores mostrados en la terminal
2. Corregirlos manualmente o con `npm run lint:fix`
3. Volver a intentar el commit o push

### 🚫 Saltar hooks (NO RECOMENDADO)

En casos extremos, puedes saltar los hooks con:

```bash
git commit --no-verify  # Saltar pre-commit
git push --no-verify    # Saltar pre-push
```

**⚠️ ADVERTENCIA**: Solo usa esto en emergencias. Saltar los hooks puede introducir código con errores en el repositorio.

## ⚙️ Configuración

### ESLint (`.eslintrc.json`)

- **Extends**: Next.js, TypeScript y Prettier
- **Reglas principales**:
  - Variables no usadas deben empezar con `_`
  - `any` genera advertencias
  - `console.log` genera advertencias (excepto `console.warn` y `console.error`)
  - Preferir `const` sobre `let`
  - No usar `var`

### Prettier (`.prettierrc`)

- **Semi**: `;` al final de cada línea
- **Single Quote**: Comillas simples para strings
- **Print Width**: 80 caracteres por línea
- **Tab Width**: 2 espacios
- **Trailing Comma**: Comas finales en ES5

### Lint-staged (`package.json`)

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,css,md}": [
    "prettier --write"
  ]
}
```

## 🔧 Integración con VS Code

Si usas VS Code, las extensiones recomendadas se instalarán automáticamente:

- **ESLint**: Para linting en tiempo real
- **Prettier**: Para formateo automático
- **Tailwind CSS IntelliSense**: Para autocompletado de Tailwind

### Configuración automática

El proyecto está configurado para:

- ✅ Formatear automáticamente al guardar
- ✅ Corregir problemas de ESLint automáticamente al guardar
- ✅ Mostrar errores y advertencias en tiempo real

## 📝 Mejores Prácticas

1. **Antes de hacer commit**: Los hooks se encargarán automáticamente
2. **Variables no usadas**: Usa `_` al inicio (ej: `_unusedVar`)
3. **Evita `any`**: Usa tipos específicos o `unknown` cuando sea necesario
4. **Console logs**: Úsalos solo para desarrollo, elimínalos antes de producción o usa `console.warn`/`console.error`

## 🚀 Flujo de Trabajo con Husky

### Workflow Normal

```bash
# 1. Desarrolla tu código
npm run dev

# 2. Agrega archivos al staging
git add .

# 3. Haz commit (Husky ejecutará pre-commit automáticamente)
git commit -m "feat: nueva funcionalidad"
# ✅ Pre-commit: ESLint + Prettier en archivos modificados

# 4. Haz push (Husky ejecutará pre-push automáticamente)
git push
# ✅ Pre-push: Type check + Lint en todo el proyecto
```

### Si hay errores en pre-commit

```bash
git commit -m "mensaje"
# ❌ Error: ESLint encontró errores

# Opción 1: Corregir automáticamente
npm run lint:fix

# Opción 2: Corregir manualmente y volver a intentar
# Edita los archivos...
git add .
git commit -m "mensaje"
```

### Si hay errores en pre-push

```bash
git push
# ❌ Error: TypeScript encontró errores

# Corrige los errores de tipos
npm run type-check  # Para ver los errores
# Edita los archivos...
git add .
git commit -m "fix: corregir tipos"
git push  # Intenta de nuevo
```

## 🎯 Resultado

✅ **Código consistente y limpio**: Prettier asegura formato uniforme  
✅ **Sin errores de linting**: ESLint detecta y corrige problemas  
✅ **Type-safe**: TypeScript verifica tipos antes de push  
✅ **Commits limpios**: Husky previene commits con errores  
✅ **Protección del repositorio**: Solo código de calidad llega a producción

## 🔍 Verificar configuración

```bash
# Ver hooks instalados
ls -la .husky/

# Verificar que todo funciona
npm run lint
npm run format:check
npm run type-check

# Resultado esperado:
# ✔ No ESLint warnings or errors
# ✅ All matched files use Prettier code style!
# ✔ No TypeScript errors
```

## 📦 Archivos de configuración

- `.eslintrc.json` - Configuración de ESLint
- `.prettierrc` - Configuración de Prettier
- `.prettierignore` - Archivos ignorados por Prettier
- `.eslintignore` - Archivos ignorados por ESLint
- `.husky/pre-commit` - Hook antes de commit
- `.husky/pre-push` - Hook antes de push
- `.vscode/settings.json` - Configuración de VS Code
- `.vscode/extensions.json` - Extensiones recomendadas

## 🆘 Troubleshooting

### Los hooks no se ejecutan

```bash
# Re-instalar husky
npm run prepare
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```

### Errores de permisos

```bash
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```

### Quiero desactivar temporalmente los hooks

```bash
# Opción 1: Saltar un commit específico
git commit --no-verify -m "mensaje"

# Opción 2: Desactivar temporalmente
mv .husky .husky.backup
# ... hacer commits sin hooks ...
mv .husky.backup .husky
```

---

**💡 Tip**: Si trabajas en equipo, asegúrate de que todos ejecuten `npm install` después de clonar el repositorio para que Husky se configure automáticamente.
