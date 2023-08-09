type DropdownProps = {
  options: string[] | number[]
  onSelect: (item: string | number) => void
  name: string
  label: string
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  name,
  label
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>

      <select
        name={name}
        id={name}
        onChange={(e) => {
          onSelect(e.target.value)
        }}
      >
        {options.map((opt, idx) => {
          return (
            <option key={`${opt}-${idx}`} value={opt}>
              {opt}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export { Dropdown }
