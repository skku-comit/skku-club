'use client'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export function ClubNameField() {
  return (
    <FormField
      name="name"
      render={({ field, fieldState, formState }) => {
        return (
          <FormItem>
            <FormLabel className="block font-bold">이름</FormLabel>
            <FormControl>
              <Input type="text" className="mt-1 block w-full" {...field} />
            </FormControl>
            <FormDescription>동아리 이름을 입력하세요</FormDescription>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export function ClubDescriptionField() {
  return (
    <FormField
      name="description"
      render={({ field, fieldState, formState }) => {
        return (
          <FormItem>
            <FormLabel className="block font-bold">동아리 설명</FormLabel>
            <FormControl>
              <Textarea className="mt-1 block w-full" {...field} />
            </FormControl>
            <FormDescription>
              추후에 동아리 임원한테 동아리 설명 수정 권한을 줄 수 있습니다
            </FormDescription>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export function ClubCategoryField() {
  return (
    <FormField
      name="category"
      render={({ field, fieldState, formState }) => {
        return (
          <FormItem>
            <FormLabel className="block font-bold">동아리 분류</FormLabel>
            <FormControl>
              <Select
                {...field}
                onValueChange={(e) => {
                  field.onChange(e)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="동아리 분류 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>분류</SelectLabel>
                    <SelectItem value="central">중앙동아리</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormDescription>예시: 중앙동아리, 준동아리 </FormDescription>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export function ClubCampusField() {
  return (
    <FormField
      name="campus"
      render={({ field, fieldState, formState }) => {
        return (
          <FormItem>
            <FormLabel className="block font-bold">캠퍼스</FormLabel>
            <FormControl>
              <Select
                {...field}
                onValueChange={(e) => {
                  field.onChange(e)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="캠퍼스 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>캠퍼스</SelectLabel>
                    <SelectItem value="SEOUL">명륜</SelectItem>
                    <SelectItem value="SUWON">율전</SelectItem>
                    <SelectItem value="BOTH">공통</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormDescription>
              추후에 동아리 임원한테 동아리 설명 수정 권한을 줄 수 있습니다
            </FormDescription>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
