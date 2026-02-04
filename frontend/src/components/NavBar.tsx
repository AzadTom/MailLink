import { ExternalLink, Github, Send } from "lucide-react"
import Link from "next/link"

const NavBar = () => {
    return (
        <>
            <nav id="navbar" className="flex justify-between items-center py-5 sticky top-0 bg-[#0a0a0a] px-4 sm:mx-0 z-50">
                <div className="flex gap-1 items-center">
                    <Send />
                    <h1 className="text-2xl font-bold">
                        <Link href="/">Send</Link>
                    </h1>
                </div>
                <ul className="flex items-center gap-12">
                    <li>
                        <a href="https://github.com/AzadTom?tab=repositories">
                            <Github />
                        </a>
                    </li>
                    <li>
                        <a href="https://azadtom.netlify.app/">
                            <ExternalLink />
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default NavBar