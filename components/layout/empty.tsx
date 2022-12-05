import { LayoutProps } from '@/models/common'
import React from 'react'

export const EmptyLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <div>
        <h1>EmptyLayout</h1>
        <div>{children}</div>
      </div>
    </div>
  )
}
