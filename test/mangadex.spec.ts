import { MangaDex } from '../src/classes/sites/mangadex'
import { Manga } from '../src/classes/manga'
import { SiteName, SiteType } from '../src/enums/siteEnum'
import { readUrl } from './helper'

const siteType = SiteType.MangaDex

describe(SiteName[siteType], function () {
  const site = new MangaDex()
  // const query = 'together with the rain'

  this.timeout(10000)

  it('Read URL', () => {
    const desired = new Manga(site.getTestUrl(), siteType)
    desired.chapter = 'Vol. 24 Ch. 95 - World of Stars and Stripes - Outro'
    desired.image = 'https://mangadex.org/images/manga/6272.jpg?1531150797'
    desired.title = 'JoJo\'s Bizarre Adventure Part 7 - Steel Ball Run (Official Colored)'
    desired.chapterUrl = 'https://mangadex.org/chapter/24552'
    desired.chapterNum = 95

    return readUrl(site, desired)
  })

  /* it('Search', () => {
    const desired = new Manga(site.getTestUrl(), siteType)
    desired.image = 'https://mangadex.org/images/manga/52590.jpg?1596841158'
    desired.chapter = 'Ch. 2 - That’s what\'s unfair about you!'
    desired.url = 'https://mangadex.org/title/52590/together-with-the-rain'

    return search(site, query, desired)
  }) */
})