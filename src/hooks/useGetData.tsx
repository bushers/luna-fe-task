import { useQuery } from 'react-query'

export type UserData = {
  id: number
  first_name: string
  last_name: string
  email: string
  date_of_birth: string
  industry: string
  salary: number
  years_of_experience: number
}

const fetchData = (url: string): Promise<UserData[]> => {
  return fetch(url).then((res) => res.json())
}

export const useGetData = (url: string) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['getData'],
    queryFn: () => fetchData(url)
  })

  return { isLoading, error, data }
}
