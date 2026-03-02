import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error('DATABASE_URL vantar í .env');
}
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const defaultContent = `
Þessi frétt er hluti af prófunargögnum sem notuð eru við þróun og uppsetningu vefþjónustu.
Markmið hennar er að líkja eftir raunverulegu efni án þess að vísa í tiltekin atvik eða einstaklinga.

Við þróun hugbúnaðar er mikilvægt að vinna með gögn sem endurspegla raunhæfa notkun.
Slík gögn gera kleift að prófa birtingu, gagnageymslu, leit og síðuskiptingu.

Kerfið styður grunnvirkni eins og skráningu, uppfærslu, eyðingu og birtingu gagna.
Áhersla er lögð á gagnasamræmi, villumeðhöndlun og öryggi.

Texti sem þessi er einnig gagnlegur til að prófa framsetningu í notendaviðmóti,
til dæmis hvernig lengri texti birtist og hvernig kerfið meðhöndlar mismunandi textamagn.

Innihald fréttarinnar hefur ekki sjálfstætt upplýsingagildi og er eingöngu ætlað til tæknilegra prófana.
`.trim();
async function main() {
    const a1 = await prisma.author.upsert({
        where: { email: 'author1@example.com' },
        update: { name: 'Author 1' },
        create: { name: 'Author 1', email: 'author1@example.com' },
    });
    const a2 = await prisma.author.upsert({
        where: { email: 'author2@example.com' },
        update: { name: 'Author 2' },
        create: { name: 'Author 2', email: 'author2@example.com' },
    });
    const a3 = await prisma.author.upsert({
        where: { email: 'author3@example.com' },
        update: { name: 'Author 3' },
        create: { name: 'Author 3', email: 'author3@example.com' },
    });
    const a4 = await prisma.author.upsert({
        where: { email: 'author4@example.com' },
        update: { name: 'Author 4' },
        create: { name: 'Author 4', email: 'author4@example.com' },
    });
    const newsData = [
        { slug: 'frett-1', title: 'Frétt 1', summary: 'Samantekt fyrir frétt 1.', published: true, authorId: a1.id },
        { slug: 'frett-2', title: 'Frétt 2', summary: 'Samantekt fyrir frétt 2.', published: true, authorId: a2.id },
        { slug: 'frett-3', title: 'Frétt 3', summary: 'Samantekt fyrir frétt 3.', published: false, authorId: a3.id },
        { slug: 'frett-4', title: 'Frétt 4', summary: 'Samantekt fyrir frétt 4.', published: true, authorId: a4.id },
        { slug: 'frett-5', title: 'Frétt 5', summary: 'Samantekt fyrir frétt 5.', published: true, authorId: a1.id },
        { slug: 'frett-6', title: 'Frétt 6', summary: 'Samantekt fyrir frétt 6.', published: false, authorId: a2.id },
        { slug: 'frett-7', title: 'Frétt 7', summary: 'Samantekt fyrir frétt 7.', published: true, authorId: a3.id },
        { slug: 'frett-8', title: 'Frétt 8', summary: 'Samantekt fyrir frétt 8.', published: true, authorId: a4.id },
        { slug: 'frett-9', title: 'Frétt 9', summary: 'Samantekt fyrir frétt 9.', published: true, authorId: a1.id },
        { slug: 'frett-10', title: 'Frétt 10', summary: 'Samantekt fyrir frétt 10.', published: true, authorId: a2.id },
        { slug: 'frett-11', title: 'Frétt 11', summary: 'Samantekt fyrir frétt 11.', published: false, authorId: a3.id },
    ];
    for (const item of newsData) {
        await prisma.news.upsert({
            where: { slug: item.slug },
            update: {
                title: item.title,
                summary: item.summary,
                content: defaultContent,
                published: item.published,
                authorId: item.authorId,
            },
            create: {
                slug: item.slug,
                title: item.title,
                summary: item.summary,
                content: defaultContent,
                published: item.published,
                authorId: item.authorId,
            },
        });
    }
}
main()
    .then(() => console.log('Seed búið'))
    .catch((error) => {
    console.error('Seed villa:', error);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
});
