'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { SearchTechnicianIcon } from "@/components"

export function SearchTechnician({
  placeholder
}: {
  placeholder: string
}): JSX.Element {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)

    term.length > 0 ? params.set('query', term) : params.delete('query')

    // replace the route with a route that gets from the input that was converted into a query
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div className='flex justify-center items-center w-full py-6'>
      <input
        className='peer block w-full rounded-md border border-[#B9B8B8
] py-[9px] pl-[14.56px] mr-3 text-sm  focus:outline-[#B9B8B8] placeholder:text-[#B9B8B8]'
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <SearchTechnicianIcon />

    </div>
  )
}