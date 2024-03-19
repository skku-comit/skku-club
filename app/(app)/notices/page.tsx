import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { createApiCaller } from '@/lib/api/trpc/server'

export default async function NoticesPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  let offset = Number(searchParams?.page)
  if (isNaN(offset)) {
    offset = 0
  }

  const apiCaller = await createApiCaller()
  const notices = await apiCaller.notices.list({
    offset
  })

  return (
    <div className="flex flex-col gap-y-4">
      <hr></hr>
      <nav>
        <Link href={`/notices/new`}>
          <Button>새 글 작성</Button>
        </Link>
      </nav>
      <main>
        {notices.map((notice) => (
          <div key={notice.id}>
            <h2>{notice.title}</h2>
            <p>{notice.publishedAt.toISOString()}</p>
          </div>
        ))}
      </main>
    </div>
  )
}
