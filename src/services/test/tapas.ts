import { Manga } from 'src/classes/manga'
import { BaseSite } from 'src/classes/sites/baseSite'
import { SiteType } from 'src/enums/siteEnum'
import { getMangaInfo, getSite, searchManga } from '../siteService'
import { mangaEqual, searchValid } from '../testService'

const SITE_TYPE = SiteType.Tapas
const QUERY = 'mystic musketeer'

export async function testTapas(): Promise<void> {
  const site = getSite(SITE_TYPE)
  if (!site) throw Error('Site not found')

  await readUrl(site)
  await readUrlReverseOrder()
  await search(site)
}

async function readUrl(site: BaseSite): Promise<void> {
  const manga = await getMangaInfo(site.getTestUrl(), SITE_TYPE)
  const desired = new Manga(site.getTestUrl(), SITE_TYPE)
  const chapter = 139

  desired.chapter = `${chapter}. Emily`
  desired.image = 'https://us-a.tapas.io/sa/92/7c0dcaff-6150-4a77-8690-90a3863d2925_z.jpg'
  desired.title = 'Villains Are Destined to Die'
  desired.chapterUrl = 'https://tapas.io/episode/3104004'
  desired.chapterNum = chapter + 12
  desired.chapterDate = '2 days ago'

  mangaEqual(manga, desired)
}

async function readUrlReverseOrder(): Promise<void> {
  const manga = await getMangaInfo('https://tapas.io/series/mystic-musketeer/info', SITE_TYPE)
  const desired = new Manga('https://tapas.io/series/mystic-musketeer/info', SITE_TYPE)
  const chapter = 132

  desired.chapter = `Episode ${chapter}`
  desired.image = 'https://us-a.tapas.io/sa/6e/fa82be22-6637-48e7-a6a0-b33b70e3d169_z.jpg'
  desired.title = 'Mystic Musketeer'
  desired.chapterUrl = 'https://tapas.io/episode/3110221'
  desired.chapterNum = chapter

  mangaEqual(manga, desired)
}

async function search(site: BaseSite): Promise<void> {
  const results = await searchManga(QUERY, SITE_TYPE)
  const desired = new Manga(site.getTestUrl(), SITE_TYPE)
  desired.image = 'https://us-a.tapas.io/sa/6e/fa82be22-6637-48e7-a6a0-b33b70e3d169_z.jpg'
  desired.chapter = 'Episode 132'
  desired.url = 'https://tapas.io/series/mystic-musketeer/info'

  return searchValid(results, desired, QUERY)
}
