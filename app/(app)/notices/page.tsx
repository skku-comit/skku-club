import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default async function NoticesPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <hr></hr>
      <nav>
        <Link href={`/notices/new`}>
          <Button>새 글 작성</Button>
        </Link>
      </nav>
      <main></main>
    </div>
  )
}
