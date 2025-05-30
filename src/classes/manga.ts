import { LinkingSiteType } from '../enums/linkingSiteEnum'
import { Status } from '../enums/statusEnum'
import { SiteType } from '../enums/siteEnum'

export class Manga {
    url: string
    altSources: Record<string, string> | undefined
    site: SiteType | LinkingSiteType
    chapter = 'Unknown'
    chapterNum = 0
    chapterUrl = ''
    chapterDate = ''
    image = ''
    title = ''
    read: string | undefined
    readNum: number | undefined
    readUrl: string | undefined
    linkedSites: Record<string, number>
    status: Status
    notes: string | undefined
    rating: number | undefined
    shouldUpdate: boolean | undefined

    constructor (url: string, site: SiteType | LinkingSiteType) {
      this.url = url
      this.site = site
      this.linkedSites = {}
      this.status = Status.READING
    }

    static inherit (initialManga: Manga, newManga: Manga) {
      newManga.altSources = initialManga.altSources
      if (initialManga.altSources) {
        const initialAltSources = initialManga.altSources
        const newAltSources: Record<string, string> = {}

        Object.entries(initialAltSources).forEach(([key, value]) => {
          if (key === newManga.site.toString()) return
          newAltSources[key] = value
        })

        newManga.altSources = newAltSources
      }

      newManga.read = initialManga.read
      newManga.readNum = initialManga.readNum
      newManga.readUrl = initialManga.readUrl
      newManga.linkedSites = initialManga.linkedSites
      newManga.status = initialManga.status
      newManga.notes = initialManga.notes
      newManga.rating = initialManga.rating
      newManga.shouldUpdate = initialManga.shouldUpdate

      return newManga
    }
}
