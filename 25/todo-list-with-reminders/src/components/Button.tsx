interface ButtonProps {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset" | undefined
}

export const Button = ({ children, onClick, type = "button" }: ButtonProps) => {
  return (
    <button
      type={type}
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none "
      onClick={onClick}
    >
      {children}
    </button>
  )
};


