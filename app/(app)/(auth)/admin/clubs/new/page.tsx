'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { apiClient } from '@/lib/api/trpc/client'
import { NewClubSchema } from '@/lib/schemas'

type Inputs = z.infer<typeof NewClubSchema>

export default function NewClubPage() {
  const form = useForm<Inputs>({
    mode: 'all',
    resolver: zodResolver(NewClubSchema),
    defaultValues: {
      title: '',
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
}
