import { PropsWithChildren } from 'react'

export default function MdxLayout({ children }: PropsWithChildren) {
  return <div className="markdown-body">{children}</div>
}
