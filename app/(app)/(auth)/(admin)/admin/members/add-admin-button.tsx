'use client'

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

export function AddAdminButton() {
  const form = useForm<{ email: string }>()
  const [open, setOpen] = useState(false)

  const makeAdmin = apiClient.siteMembers.changeRole.useMutation()

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await makeAdmin.mutateAsync({
        email: data.email,
        admin: true
      })
    } catch (e) {
      alert(`이메일을 확인해주세요. ${(e as any).message}`)
      return
    }

    alert('관리자로 추가되었습니다.')

    form.reset()
    setOpen(false)
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">관리자 추가</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>관리자 추가 </DialogTitle>
              <DialogDescription>
                관리자로 추가할 사용자의 이메일을 입력하세요.
              </DialogDescription>
            </DialogHeader>
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
              <Button type="submit">관리자 추가</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
