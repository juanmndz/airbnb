import Image from "next/image"
import { StarIcon } from "@heroicons/react/solid"

function MapInfoCard({img, star, title, price, total}) {
    return (
        <div className="flex flex-col w-60">
            <div className="relative h-52 w-[100%]">
                <Image
                    src={img}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                />
            </div>

            <p className="flex items-center">
                <StarIcon className="h-7 text-red-500"/>
                {star}
            </p>

            <h4 className="text-xl">{title}</h4>
            <p className="text-md font-semibold">{price}</p>
            <p className="font-extralight">{total}</p>
        </div>
    )
}

export default MapInfoCard