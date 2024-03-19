import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { createApiCaller } from '@/lib/api/trpc/server'

export default async function NoticesPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const apiCaller = await createApiCaller()
  const notices = await apiCaller.notices.list({
    offset: Number(searchParams?.page) * 10
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
            <p>{notice.content}</p>
          </div>
        ))}
      </main>
    </div>
  )
}
