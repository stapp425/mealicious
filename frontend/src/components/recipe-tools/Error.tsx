import { Info } from "lucide-react"

type Props = {
  children: React.ReactNode
}

const Error: React.FC<Props> = ({ children }: Props) => (
  <div className="flex gap-2 border bg-red-200 border-red-500 p-3 rounded-sm mt-2">
    <Info />
    {children}
  </div> 
)

export default Error