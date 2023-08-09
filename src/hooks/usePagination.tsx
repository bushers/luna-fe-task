import { useEffect, useState } from 'react'

export const ITEMS_PER_PAGE_CHOICES = [5, 10, 20, 50]

export const usePagination = (totalItems: number) => {
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_CHOICES[0])

  useEffect(() => {
    if (page > totalPages) {
      setActivePage(totalPages)
    }
  }, [itemsPerPage])

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const setActivePage = (pageNumber: number) => {
    if (pageNumber <= 0) {
      setPage(1)
    } else if (pageNumber > totalPages) {
      setPage(totalPages)
    } else {
      setPage(pageNumber)
    }
  }

  const nextPage = () => setActivePage(page + 1)
  const previousPage = () => setActivePage(page - 1)

  const pageNumbersArr = getPageNumbers({
    currentPage: page,
    totalPages
  })

  return {
    activePage: page,
    setActivePage,
    nextPage,
    previousPage,
    totalPages,
    itemsPerPage,
    setItemsPerPage,
    pageNumbersArr
  }
}

type GetPageNumbersArgs = {
  currentPage: number
  totalPages: number
  pageNumbersToShow?: number
}

export const getPageNumbers = ({
  currentPage,
  totalPages,
  pageNumbersToShow = 3
}: GetPageNumbersArgs) => {
  const lastPageNumber = totalPages
  const currentPageNumber =
    currentPage <= lastPageNumber ? currentPage : lastPageNumber
  const maxPagesBeforeCurrentPage = Math.floor(pageNumbersToShow / 2)
  const maxPagesAfterCurrentPage = Math.ceil(pageNumbersToShow / 2) - 1

  let startPage = 1
  let endPage = lastPageNumber

  if (lastPageNumber <= 1) {
    return [1]
  }

  if (currentPageNumber <= maxPagesBeforeCurrentPage) {
    startPage = 1
    endPage = pageNumbersToShow
  } else if (currentPageNumber + maxPagesAfterCurrentPage >= lastPageNumber) {
    startPage = lastPageNumber - pageNumbersToShow + 1
  } else {
    startPage = currentPageNumber - maxPagesBeforeCurrentPage
    endPage = currentPageNumber + maxPagesAfterCurrentPage
  }

  let pageNumbers: (string | number)[] = Array.from(
    Array(endPage + 1 - startPage).keys()
  )
    .map((pageNumber) => startPage + pageNumber)
    .filter((pageNumber) => pageNumber <= lastPageNumber && pageNumber > 0)

  if (Number(pageNumbers[0]) > 1) {
    if (Number(pageNumbers[0]) <= 2) {
      pageNumbers = [1, ...pageNumbers]
    } else {
      const ellipsis = Number(pageNumbers[0]) > 3 ? '...' : 2
      pageNumbers = [1, ellipsis, ...pageNumbers]
    }
  }

  if (pageNumbers[pageNumbers.length - 1] !== lastPageNumber) {
    if (pageNumbers[pageNumbers.length - 1] === lastPageNumber - 1) {
      pageNumbers = [...pageNumbers, lastPageNumber]
    } else {
      const ellipsis =
        Number(pageNumbers[pageNumbers.length - 1]) < lastPageNumber - 2
          ? '...'
          : lastPageNumber - 1
      pageNumbers = [...pageNumbers, ellipsis, lastPageNumber]
    }
  }

  return pageNumbers
}
