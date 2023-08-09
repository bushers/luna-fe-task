import { ITEMS_PER_PAGE_CHOICES } from '../hooks/usePagination'
import { Dropdown } from './Dropdown'

type PaginationProps = {
  activePage: number
  nextPage: () => void
  prevPage: () => void
  setPage: (pageNum: number) => void
  itemsPerPage: number
  setItemsPerPage: (num: number) => void
  pageNumbersArr: (string | number)[]
}

const Pagination: React.FC<PaginationProps> = ({
  activePage,
  nextPage,
  prevPage,
  setPage,
  setItemsPerPage,
  pageNumbersArr
}) => {
  return (
    <div className="flex justify-start mt-4">
      <Dropdown
        options={ITEMS_PER_PAGE_CHOICES}
        onSelect={(num) => setItemsPerPage(Number(num))}
        name="num-of-pages"
        label="Select number of items per page"
      />

      <button onClick={() => prevPage()} className="p-2 ml-8 mr-4 bg-slate-500">
        Prev
      </button>
      {pageNumbersArr.map((item, idx) => {
        if (typeof item === 'string') {
          return (
            <button className={`p-2`} key={`item-${idx}`} disabled>
              {item}
            </button>
          )
        }

        return (
          <button
            className={`p-2 mr-4 ${
              activePage === item ? 'bg-lime-300' : 'bg-slate-500'
            }`}
            onClick={() => setPage(item)}
            key={`item-${idx}`}
          >
            {item}
          </button>
        )
      })}
      <button onClick={() => nextPage()} className="p-2 bg-slate-500">
        Next
      </button>
    </div>
  )
}

export { Pagination }
