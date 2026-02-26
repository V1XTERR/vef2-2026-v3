## Keyrsla

## Ná í breytingar án copy/paste

Ef breytingarnar eru merge-aðar í `main`, þá þarftu bara:

```bash
git checkout main
git pull origin main
```

Ef breytingarnar eru á feature branch sem einhver annar push-aði:

```bash
git fetch origin
git checkout -b prisma-setup origin/<branch-nafn>
```

```bash
npm install
```

Settu upp `.env` með gagnagrunnstengingu:

```bash
DATABASE_URL="postgresql://..."
```

Ef þið viljið bara "pusha allt" (schema + seed) í einu skrefi:

```bash
npm run setup:db
```

Eða skref fyrir skref:

```bash
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
```

Skoðaðu gögn í Prisma Studio:

```bash
npm run prisma:studio
```

Keyrðu API þjón:

```bash
npm run dev
```

Opnaðu svo `http://localhost:3000`.
