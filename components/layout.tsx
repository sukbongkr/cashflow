import { ReactNode } from "react"
import Appbar from "./appbar"

interface Props {
    children : ReactNode
}

export default function Layout({children}:Props) {
  return (
    <>
      <Appbar />
      {children}
    </>
  )
}
