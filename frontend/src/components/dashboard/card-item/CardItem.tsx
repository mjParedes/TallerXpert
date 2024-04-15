'use client'

import Link from "next/link";
import type { CardDashboardProps } from "@/interfaces";

interface CardProps {
  card: CardDashboardProps
}


export const CardItem = ({ card }: CardProps) => {


  if (!card.link) {

    const handleClick = () => {
      alert(`${card.title}`)
    }

    return (
      <div onClick={handleClick}>
        <div className={`${card.className} w-[215px] h-[170px] flex flex-col gap-4 rounded p-4 text-white cursor-pointer`}>

          <div>
            {card.icon}
          </div>

          <h1 className="text-2xl capitalize">{card.title}
          </h1>

          <span className="text-right">
            Total: {card.total}
          </span>
        </div>
      </div>
    )
  }

  return (
    <Link href={card.link}>
      <div className={`${card.className} w-[215px] h-[170px] flex flex-col gap-4 rounded p-4 text-white cursor-pointer`}>

        <div>
          {card.icon}
        </div>

        <h1 className="text-2xl capitalize">{card.title}
        </h1>

        <span className="text-right">
          Total: {card.total}
        </span>
      </div>
    </Link>
  )
}
