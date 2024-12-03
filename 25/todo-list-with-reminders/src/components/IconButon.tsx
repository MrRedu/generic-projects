interface IconButtonProps {
  children: React.ReactNode
  onClick: () => void
  type?: "button" | "submit" | "reset" | undefined
  iconDescription: string
}

export const IconButton = (
  { children, onClick, type = "button", iconDescription }:
    IconButtonProps
): JSX.Element => {
  return (
    <button type={type} className="text-white w-10 h-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center" onClick={onClick}>
      {children}
      <span className="sr-only">{iconDescription}</span>
    </button>
  )
}