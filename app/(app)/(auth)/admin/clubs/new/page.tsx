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
                <FormField
                  name="name"
                  render={({ field, fieldState, formState }) => {
                    return (
                      <FormItem>
                        <FormLabel className="block font-bold">이름</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="mt-1 block w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          동아리 이름을 입력하세요
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />

                <FormField
                  name="description"
                  render={({ field, fieldState, formState }) => {
                    return (
                      <FormItem>
                        <FormLabel className="block font-bold">
                          동아리 설명
                        </FormLabel>
                        <FormControl>
                          <Textarea className="mt-1 block w-full" {...field} />
                        </FormControl>
                        <FormDescription>
                          추후에 동아리 임원한테 동아리 설명 수정 권한을 줄 수
                          있습니다
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />

                <FormField
                  name="category"
                  render={({ field, fieldState, formState }) => {
                    return (
                      <FormItem>
                        <FormLabel className="block font-bold">
                          동아리 분류
                        </FormLabel>
                        <FormControl>
                          <Textarea className="mt-1 block w-full" {...field} />
                        </FormControl>
                        <FormDescription>
                          추후에 동아리 임원한테 동아리 설명 수정 권한을 줄 수
                          있습니다
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />

                <FormField
                  name="campus"
                  render={({ field, fieldState, formState }) => {
                    return (
                      <FormItem>
                        <FormLabel className="block font-bold">
                          동아리 분류
                        </FormLabel>
                        <FormControl>
                          <Textarea className="mt-1 block w-full" {...field} />
                        </FormControl>
                        <FormDescription>
                          추후에 동아리 임원한테 동아리 설명 수정 권한을 줄 수
                          있습니다
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
                동아리 생성
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}
