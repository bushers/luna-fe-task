const parseUkDate = (str: string) => {
  const date = str.split('/')
  const d = parseInt(date[0], 10),
    m = parseInt(date[1], 10),
    y = parseInt(date[2], 10)
  return new Date(y, m - 1, d)
}

export { parseUkDate }
