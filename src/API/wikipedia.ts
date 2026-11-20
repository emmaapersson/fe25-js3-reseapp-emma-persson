export interface WikipediaData {
    extract: string
    image: string | null
    imageAlt: string
    url: string
}

export async function getWikipediaInfo(
    countryName:string
): Promise<WikipediaData> {
    const title = encodeURIComponent(countryName)
    const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`
    )

    if (!response.ok) {
        throw new Error('Could not fetch Wikipedia information.')
    }

    const data = await response.json()

    return {
        extract: data.extract || 'No introduction available.',
        image: data.thumbnail?.sourse || null,
        imageAlt: data.thumbnail?.alt || `Image of ${countryName}`,
        url: data.content_urls?.desktop?.page || 
        `https://en.wikipedia.org/wiki/${title}`
    }
}