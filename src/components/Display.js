import Card from "@/components/Card"

export default function Display({children}) {

    return (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {Array(8).fill(0).map((_, index) => (
                <Card key={`card_${index}`}>
                    Test
                </Card>
            ))}
        </div>
    )
}