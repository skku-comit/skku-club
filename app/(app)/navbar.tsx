'use client'

import { RiAccountCircleLine } from '@remixicon/react'
import { RiCloseCircleLine } from '@remixicon/react'
import { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
import { route } from '@/lib/utils'

export interface NavBarProps extends PropsWithChildren {}

export function NavBar() {
  const pathname = usePathname()

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

  const mainMenuItems: MenuItemProps[] = []

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
                  {mainMenuItems.map((item) => (
                    <MenuItem key={item.title} {...item} />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex-1"></div>

        <NavigationMenu className="h-full">
          <NavigationMenuList>
            <NavigationMenuItem className="flex flex-col">
              <NavigationMenuTrigger>로그인</NavigationMenuTrigger>
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
      </div>
      <div className="lg:flex-1"></div>
    </nav>
  )
}

type MenuItemProps = { title: string; icon: React.ReactNode; href: Route }

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
          <div className="mr-[8px] flex items-center">{icon}</div>
          <div className="text-sm font-medium leading-none">{title}</div>
        </NavigationMenuLink>
      </Link>
    </li>
  )
}
