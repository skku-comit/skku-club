import Link from 'next/link'
import * as sanitizeHtml from 'sanitize-html'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { createApiCaller } from '@/lib/api/trpc/server'
import { formatCampus, formatCategory } from '@/lib/format'

export default async function ClubPage({
  params: { clubId }
}: {
  params: { clubId: string }
}) {
  const apiCaller = await createApiCaller()
  const club = await apiCaller.clubs.get({ id: BigInt(clubId) })

  if (!club) {
    return <div>동아리를 찾을 수 없습니다.</div>
  }

  const description = sanitizeHtml.default(club.description, {
    ...sanitizeHtml.defaults,
    allowedAttributes: {
      '*': ['style'],
      a: ['href', 'name', 'target', 'style'],
      img: [
        'src',
        'srcset',
        'alt',
        'title',
        'width',
        'height',
        'loading',
        'style'
      ]
    },
    allowedStyles: {
      '*': {
        color: [
          /^[a-zA-Z]+$/i,
          /^#(0x)?[0-9a-f]+$/i,
          /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/
        ],
        'text-align': [/^left$/, /^right$/, /^center$/],
        'font-size': [/^\d+(?:px|em|%)$/]
      }
    }
  })

  return (
    <div className="flex flex-col">
      <Card>
        <CardHeader>
          <div className="flex flex-row justify-between">
            <div>
              <CardTitle>{club.name}</CardTitle>
              <CardDescription>
                {formatCategory(club.category)} - {formatCampus(club.campus)}
              </CardDescription>
            </div>
            <div>
              <Link href={`/club/${club.id}/edit`}>
                <Button variant={'outline'}> 수정 </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </CardContent>
      </Card>
    </div>
  )
}
