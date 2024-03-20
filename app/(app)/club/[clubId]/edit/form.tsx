'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Form, useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  ClubCampusField,
  ClubCategoryField,
  ClubDescriptionField
} from '@/components/club/edit/fields'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { apiClient } from '@/lib/api/trpc/client'
import { ApiOutput } from '@/lib/api/trpc/router'
import { UpdateClubSchema } from '@/lib/schemas'

type Inputs = z.infer<typeof UpdateClubSchema>

export default function ClubEditForm({
  club
}: {
  club: NonNullable<ApiOutput['clubs']['get']>
}) {
  const form = useForm<Inputs>({
    mode: 'all',
    resolver: zodResolver(UpdateClubSchema),
    defaultValues: {
      description: ''
    }
  })
  const router = useRouter()
  const create = apiClient.clubs.update.useMutation({
    onSuccess(data, variables, context) {
      router.push(`/club/${club.id}`)
    }
  })

  const onSubmit = form.handleSubmit(async (values) => {
    await create.mutateAsync(values)
  })

  return (
    <div className="flex flex-col">
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle className="font-bold">동아리 수정</CardTitle>
              <CardDescription className="font-bold">
                HTML을 사용하실 수 있습니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ClubDescriptionField />

                <ClubCategoryField />

                <ClubCampusField />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full font-bold" type="submit">
                동아리 생성
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}
