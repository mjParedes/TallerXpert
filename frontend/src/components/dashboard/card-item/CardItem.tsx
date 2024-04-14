interface Props {
  card: {
    icon: JSX.Element;
    title: string;
    total: number;
    className?: string;
  }
}


export const CardItem = ({ card }: Props) => {
  return (
    <div className={`${card.className} w-[215px] h-[170px] flex flex-col gap-4 rounded p-4 text-white`}>

      <div>
        {card.icon}
      </div>

      <h1 className="text-2xl capitalize">{card.title}
      </h1>

      <span className="text-right">
        Total: {card.total}
      </span>
    </div>
  )
}
