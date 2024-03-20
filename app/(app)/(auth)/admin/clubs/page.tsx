import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function ClubsPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <div></div>
      <div>
        <Link href={`/admin/clubs/new`}>
          <Button>동아리 추가</Button>
        </Link>
      </div>
      <div></div>
    </div>
  )
}
