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
  const chapter = 124

  desired.chapter = `${chapter}. Endings and Beginnings`
  desired.image = 'https://us-a.tapas.io/sa/53/035d7813-b234-45d6-b880-5563a759a95b_z.jpg'
  desired.title = 'Villains Are Destined to Die'
  desired.chapterUrl = 'https://tapas.io/episode/2881118'
  desired.chapterNum = chapter + 11
  desired.chapterDate = '4 months ago'

  mangaEqual(manga, desired)
}

async function readUrlReverseOrder(): Promise<void> {
  const manga = await getMangaInfo('https://tapas.io/series/mystic-musketeer/info', SITE_TYPE)
  const desired = new Manga('https://tapas.io/series/mystic-musketeer/info', SITE_TYPE)
  const chapter = 112

  desired.chapter = `Episode ${chapter}`
  desired.image = 'https://us-a.tapas.io/sa/6e/fa82be22-6637-48e7-a6a0-b33b70e3d169_z.jpg'
  desired.title = 'Mystic Musketeer'
  desired.chapterUrl = 'https://tapas.io/episode/2991181'
  desired.chapterNum = chapter

  mangaEqual(manga, desired)
}

async function search(site: BaseSite): Promise<void> {
  const results = await searchManga(QUERY, SITE_TYPE)
  const desired = new Manga(site.getTestUrl(), SITE_TYPE)
  desired.image = 'https://us-a.tapas.io/sa/6e/fa82be22-6637-48e7-a6a0-b33b70e3d169_z.jpg'
  desired.chapter = 'Episode 112'
  desired.url = 'https://tapas.io/series/mystic-musketeer/info'

  return searchValid(results, desired, QUERY)
}
