export default function Card({title, children}) {
    return (
        <div className="flex flex-col max-w-md w-72 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 text-center text-2xl text-cyan-600 sm:px-6">
                {title}
            </div>
            <div className="flex-1 px-4 py-5 flex flex-col sm:p-6">
                {children}
            </div>
        </div>
    )
}
