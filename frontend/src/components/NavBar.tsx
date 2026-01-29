import { ExternalLink, Github, Link, Send } from "lucide-react"

const NavBar = () => {
    return (
        <>
            <nav id="navbar" className="flex justify-between items-center py-5 sticky top-0 bg-[#0a0a0a] px-4 sm:mx-0">
                <div className="flex gap-1 items-center">
                    <Send />
                    <h1 className="text-2xl font-bold">Send</h1>
                </div>
                <ul className="flex items-center gap-12">
                    <li>
                        <a href="https://github.com/AzadTom?tab=repositories">
                           <Github/>
                        </a>
                    </li>
                    <li>
                        <a href="https://azadtom.netlify.app/">
                            <ExternalLink/>
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default NavBar