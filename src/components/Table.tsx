import React, { useMemo, useState } from 'react'
import { UserData } from '../hooks/useGetData'
import { usePagination } from '../hooks/usePagination'
import { Pagination } from './Pagination'
import { Search } from './Search'
import { parseUkDate } from '../utils/utils'

type TableProps = {
  data: UserData[]
}

type SortOrder = 'asc' | 'desc'

const headers = [
  { key: 'id', label: 'ID', isSortable: false },
  { key: 'first_name', label: 'First name', isSortable: false },
  { key: 'last_name', label: 'Last name', isSortable: false },
  { key: 'email', label: 'Email', isSortable: false },
  { key: 'date_of_birth', label: 'DOB', isSortable: true },
  { key: 'industry', label: 'Industry', isSortable: true },
  { key: 'salary', label: 'Salary', isSortable: true },
  { key: 'years_of_experience', label: 'Years of exp', isSortable: false }
]

export type SortKey = keyof Pick<
  UserData,
  'date_of_birth' | 'salary' | 'industry' | 'id'
>

export const sortData = (
  data: UserData[],
  sortKey: SortKey,
  order: SortOrder
): UserData[] => {
  const sortedData = data.sort((a, b) => {
    if (a[sortKey] === b[sortKey]) {
      return 0
    }

    if (a[sortKey] === null) {
      return 1
    }
    if (b[sortKey] === null) {
      return -1
    }

    if (sortKey === 'date_of_birth') {
      if (order === 'asc') {
        return parseUkDate(a.date_of_birth) > parseUkDate(b.date_of_birth)
          ? 1
          : -1
      }
      return parseUkDate(a.date_of_birth) < parseUkDate(b.date_of_birth)
        ? 1
        : -1
    }

    if (order === 'asc') {
      return a[sortKey] > b[sortKey] ? 1 : -1
    }
    return a[sortKey] < b[sortKey] ? 1 : -1
  })

  return sortedData
}

const filterDataBySearch = (data: UserData[], searchText: string) => {
  if (searchText.length > 1) {
    const lowerCaseSearch = searchText.toLowerCase().trim()

    return data.filter((item) => {
      return (
        item.first_name?.toLowerCase().includes(lowerCaseSearch) ||
        item.last_name?.toLowerCase().includes(lowerCaseSearch)
      )
    })
  }
  return data
}

const Table: React.FC<TableProps> = ({ data }) => {
  const [sortKey, setSortKey] = useState<SortKey>('id')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  const [searchText, setSearchText] = useState('')

  const [dataLength, setDataLength] = useState(data.length)

  const {
    activePage,
    setActivePage,
    nextPage,
    previousPage,
    itemsPerPage,
    setItemsPerPage,
    pageNumbersArr
  } = usePagination(dataLength)

  const sortedData = useMemo(() => {
    let _sorted = sortData(data, sortKey, sortOrder)
    _sorted = filterDataBySearch(_sorted, searchText)

    setDataLength(_sorted.length)

    const start = activePage * itemsPerPage - itemsPerPage
    const end = activePage * itemsPerPage

    return _sorted.slice(start, end)
  }, [data, sortKey, sortOrder, activePage, itemsPerPage, searchText])

  return (
    <div>
      <h2>Table</h2>
      <Search onChange={(e) => setSearchText(e)} />
      <table className="table-auto">
        <thead>
          <tr>
            {headers.map((row) => {
              return (
                <th key={row.key} className="p-2">
                  <span>{row.label}</span>
                  {row.isSortable ? (
                    <button
                      onClick={() => {
                        setSortKey(row.key as SortKey)
                        setSortOrder((prev) =>
                          prev === 'asc' ? 'desc' : 'asc'
                        )
                      }}
                      className="ml-2"
                    >
                      {sortKey === row.key && sortOrder === 'desc' ? '▼' : '▲'}
                    </button>
                  ) : null}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIdx) => {
            return (
              <tr key={`row=${rowIdx}`}>
                {headers.map((header, headerIdx) => {
                  const rowItem = row[header.key as keyof typeof row]
                  return (
                    <td
                      key={`item-${rowIdx}-${headerIdx}`}
                      className={`p-2 ${
                        rowIdx % 2 === 0 ? 'bg-slate-300' : ''
                      }`}
                    >{`${rowItem}`}</td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <Pagination
        nextPage={nextPage}
        prevPage={previousPage}
        activePage={activePage}
        setPage={setActivePage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        pageNumbersArr={pageNumbersArr}
      />
    </div>
  )
}

export { Table }
