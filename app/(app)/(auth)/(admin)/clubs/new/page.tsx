'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  ClubCampusField,
  ClubCategoryField,
  ClubDescriptionField,
  ClubNameField
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
import { Form } from '@/components/ui/form'
import { apiClient } from '@/lib/api/trpc/client'
import { NewClubSchema } from '@/lib/schemas'

type Inputs = z.infer<typeof NewClubSchema>

export default function NewClubPage() {
  const form = useForm<Inputs>({
    mode: 'all',
    resolver: zodResolver(NewClubSchema),
    defaultValues: {
      name: '',
      description: ''
    }
  })
  const router = useRouter()
  const create = apiClient.clubs.create.useMutation({
    onSuccess(data, variables, context) {
      router.push(`/club/${data.id}`)
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
              <CardTitle className="font-bold">동아리 추가</CardTitle>
              <CardDescription className="font-bold">
                동아리를 추가합니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ClubNameField />

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
