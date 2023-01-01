import Link from "next/link";

export default function Appbar() {
  return (
    <header className="bg-teal-600 text-gray-200 py-4 text-xl">
        <nav className="flex justify-between max-w-6xl mx-auto items-center">
            <ul className="flex space-x-6">
                <li><Link href='/'>Home</Link></li>
                <li><Link href='/about'>About</Link></li>
            </ul>
            <div>
                <div>SignIn</div>
            </div>
        </nav>
    </header>
  )
}
