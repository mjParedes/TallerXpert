type Option = {
  value: string;
  label: string;
}

type SelectProps = {
  options: Option[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  title: string
}

export const Select = ({ options, value, onChange, title }: SelectProps) => {
  return (
    <div className="flex flex-row gap-x-4 items-center justify-end w-full sm:w-auto md:w-auto lg:w-auto">
      <p className="font-bold text-base">{title}</p>
      <select value={value} onChange={onChange} className="w-44 md:w-[200px] lg:w-[200px] h-8 border-[1px] border-black rounded bg-[#D9D9D9]">
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>

  )
}
