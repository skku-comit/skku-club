'use client'

import { useUser } from '@auth0/nextjs-auth0/client'
import { RiAccountCircleLine, RiCloseCircleLine } from '@remixicon/react'
import { Route } from 'next'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

import { Logo } from '@/components/common/logo'
import { MenuItem } from '@/components/navbar/menu-item'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { useCurrentRedirectUrl } from '@/lib/hooks/use-current-redirect-url'
import { route } from '@/lib/utils'

export interface NavBarProps extends PropsWithChildren {}

export function NavBar() {
  const getRedirectUrl = useCurrentRedirectUrl()
  const { user, isLoading: isAuth0Loading } = useUser()

  const accountMenus: MenuItemProps[] = [
    {
      title: '내 계정',
      href: route(`/account`),
      icon: <RiAccountCircleLine />
    },
    {
      title: '로그아웃',
      href: route(`/api/auth/logout`),
      icon: <RiCloseCircleLine />
    }
  ]

  const unionMenuItems: MenuItemProps[] = [
    {
      title: '소개',
      href: route('/introduction')
    },
    {
      title: '회칙',
      href: route('/rules')
    },
    {
      title: '공지사항',
      href: route('/notices')
    },
    {
      title: 'FAQ',
      href: route('/faq')
    }
  ]
  const clubMenuItems: MenuItemProps[] = [
    {
      title: '중앙동아리 (명륜)',
      href: route('/clubs/central/seoul')
    },
    {
      title: '중앙동아리 (율전)',
      href: route('/clubs/central/suwon')
    }
  ]
  const adminMenuItems: MenuItemProps[] = [
    {
      title: '공지사항 작성',
      href: route('/notices/new')
    },
    {
      title: '동아리 목록 관리',
      href: route('/admin/clubs')
    }
  ]

  if (isAuth0Loading) return null

  return (
    <nav className="fixed top-0 flex h-[56px] w-full flex-row border-b-2 bg-white">
      <div className="lg:flex-1"></div>
      <div className="flex flex-[4] flex-row items-center align-middle">
        <div className="h-[32px]">
          <Logo size={32} />
        </div>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>동아리연합회</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  {unionMenuItems.map((item) => (
                    <MenuItem key={item.title} {...item} />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>동아리 홍보 / 소개</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  {clubMenuItems.map((item) => (
                    <MenuItem key={item.title} {...item} />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>관리자 메뉴</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  {adminMenuItems.map((item) => (
                    <MenuItem key={item.title} {...item} />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex-1"></div>

        {user ? (
          <NavigationMenu className="h-full">
            <NavigationMenuList>
              <NavigationMenuItem className="flex flex-col">
                <NavigationMenuTrigger>{user.name}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="flex w-[100px] flex-col gap-3 p-4 md:w-[120px] lg:w-[150px] ">
                    {accountMenus.map((component) => (
                      <AccountMenuItem key={component.title} {...component} />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ) : (
          <Link href={`/api/auth/login?returnTo=${getRedirectUrl()}`}></Link>
        )}
      </div>
      <div className="lg:flex-1"></div>
    </nav>
  )
}

type MenuItemProps = { title: string; icon?: React.ReactNode; href: Route }

function AccountMenuItem({ title, icon, href }: MenuItemProps) {
  return (
    <li>
      <Link
        href={href}
        legacyBehavior
        passHref
        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      >
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          {icon && <div className="mr-[8px] flex items-center">{icon}</div>}
          <div className="text-sm font-medium leading-none">{title}</div>
        </NavigationMenuLink>
      </Link>
    </li>
  )
}
