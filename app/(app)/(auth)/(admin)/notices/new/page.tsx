'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { apiClient } from '@/lib/api/trpc/client'
import { NewNoticeSchema } from '@/lib/schemas'

type Inputs = z.infer<typeof NewNoticeSchema>

export default function NewNoticePage() {
  const form = useForm<Inputs>({
    mode: 'all',
    resolver: zodResolver(NewNoticeSchema),
    defaultValues: {
      publishedAt: new Date()
    }
  })
  const router = useRouter()
  const create = apiClient.notices.create.useMutation({
    onSuccess(data, variables, context) {
      router.push(`/notices/${data.id}`)
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
              <CardTitle className="font-bold">공지사항 작성하기</CardTitle>
              <CardDescription className="font-bold">
                공지사항은 지정된 시각에 올라갑니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <FormField
                  name="title"
                  render={({ field, fieldState, formState }) => {
                    return (
                      <FormItem>
                        <FormLabel className="block font-bold">제목</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="mt-1 block w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          공지사항 제목은 100자 이내로 작성해주세요
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />

                <FormField
                  name="publishedAt"
                  render={({ field, fieldState, formState }) => {
                    return (
                      <FormItem>
                        <FormLabel className="block font-bold">
                          공지 시점
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="datetime"
                            className="mt-1 block w-full"
                            {...field}
                            onChange={(e) => {
                              form.setValue(
                                'publishedAt',
                                new Date(e.target.value)
                              )
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          학생들한테 표시되는 공지 시각이고, 이 시각 이후에
                          공지가 표시됩니다
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />

                <FormField
                  name="content"
                  render={({ field, fieldState, formState }) => {
                    return (
                      <FormItem>
                        <FormLabel className="block font-bold">내용</FormLabel>
                        <FormControl>
                          <Textarea className="mt-1 block w-full" {...field} />
                        </FormControl>
                        <FormDescription>
                          공지 내용은 자유롭게 작성해주세요.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full font-bold" type="submit">
                공지사항 작성
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}
