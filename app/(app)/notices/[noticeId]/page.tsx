import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { createApiCaller } from '@/lib/api/trpc/server'

export default async function NoticePage({
  params: { noticeId }
}: {
  params: { noticeId: string }
}) {
  const apiCaller = await createApiCaller()
  const notice = await apiCaller.notices.get({ id: Number(noticeId) })

  return (
    <div>
      <Card>
        <CardHeader>
          <h1>{notice.title}</h1>
          <p>공지일: {notice.publishedAt.toLocaleDateString()}</p>
        </CardHeader>
        <CardContent>{notice.content}</CardContent>
      </Card>
    </div>
  )
}
