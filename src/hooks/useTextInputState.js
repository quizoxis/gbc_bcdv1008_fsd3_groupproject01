import React from 'react'

export default function useToDoItemState() {
  const [value, setValue] = React.useState('')
  const onChange = event => setValue(event.target.checked)
  return {
    value,
    onChange,
  }
}
