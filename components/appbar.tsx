import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Appbar() {
  return (
    <header className="px-4 py-4 text-xl text-gray-200 bg-teal-600">
        <nav className="flex items-center justify-between max-w-6xl mx-auto">
            <ul className="flex space-x-6">
                <li><Link href='/'>CashFlow</Link></li>
            </ul>
            <div>
                <button onClick={()=>signOut()}>SignOut</button>
            </div>
        </nav>
    </header>
  )
}
