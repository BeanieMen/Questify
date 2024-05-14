'use client'

import * as React from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function MenuDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-0 md:hidden bg-"
        >
          <Menu />
          <span className="sr-only">Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white dark:bg-black border-0"
      >
        <DropdownMenuItem onClick={() => (window.location.href = '/about')}>
          About
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => (window.location.href = '/blogs')}>
          Blog
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
