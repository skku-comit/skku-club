import { Route } from 'next'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

import { NavigationMenuLink } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

export type MenuItemProps = PropsWithChildren<{
  title: string

  href: Route
}>

export const MenuItem = ({ title, href, children }: MenuItemProps) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
          )}
          href={href}
        >
          <div className="text-sm font-medium leading-none">{title}</div>

          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
