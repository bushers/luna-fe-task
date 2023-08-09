type SearchProps = {
  onChange: (inputText: string) => void
}

const Search: React.FC<SearchProps> = ({ onChange }) => {
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value
    onChange(inputText)
  }

  return (
    <div>
      <input
        type="text"
        onChange={onInputChange}
        placeholder="Search by first or surname"
      />
    </div>
  )
}

export { Search }
