'use client'

import { RiCloseLine } from '@remixicon/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { apiClient } from '@/lib/api/trpc/client'

export interface EditAdminButtonProps {
  clubId: bigint
}

export function EditAdminButton({ clubId }: EditAdminButtonProps) {
  const form = useForm<{ email: string }>()
  const [open, setOpen] = useState(false)

  const clubAdmins = apiClient.clubs.listAdmins.useQuery({ clubId })
  const changeRole = apiClient.clubs.changeRole.useMutation()

  const onSubmit = form.handleSubmit(async (data) => {
    if (!data.email) return
    try {
      await changeRole.mutateAsync({
        clubId,
        email: data.email,
        role: 'OWNER'
      })
    } catch (e) {
      alert(`이메일을 확인해주세요. ${(e as any).message}`)
      return
    }

    alert('동아리 임원진으로 등록되었습니다.')

    form.reset()
    setOpen(false)
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">수정 권한 관리</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>동아리 임원진 관리 </DialogTitle>
              <DialogDescription>
                동아리 소개를 수정할 수 있는 권한을 가진 학생 목록입니다.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-y-4">
              <h1>현재 권한 가진 학생:</h1>
              {clubAdmins.data?.map((admin) => (
                <div
                  key={admin.id.toString()}
                  className="flex flex-row justify-between"
                >
                  <div>
                    {admin.name} - {admin.email}
                  </div>
                  <Button
                    variant={'outline'}
                    onClick={async () => {
                      try {
                        const email = admin.email
                        console.log('onClick', email)

                        await changeRole.mutateAsync({
                          clubId,
                          email: email,
                          role: 'MEMBER'
                        })

                        alert('권한이 제거되었습니다.')
                      } catch (e) {
                        alert(
                          `권한 제거 실패: 이메일을 확인해주세요. ${(e as any).message}`
                        )
                        return
                      }

                      clubAdmins.refetch()
                    }}
                  >
                    <RiCloseLine />
                  </Button>
                </div>
              ))}
            </div>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  이메일
                </Label>
                <Input
                  id="email"
                  className="col-span-3"
                  {...form.register('email')}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">추가</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
