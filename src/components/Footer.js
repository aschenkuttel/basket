import clsx from "clsx"

export default function Footer({className}) {

    return (
        <footer className={clsx("h-8 flex flex-col justify-center items-center bg-gray-100 border-t border-gray-200 shadow-lg px-8", className)}>
            <a href="https://chainlab.solutions/"><p className="font-mono text-sm">Copyright © 2023 by<span className="text-blue-600"> Chainlab</span></p></a>
        </footer>
    )
}