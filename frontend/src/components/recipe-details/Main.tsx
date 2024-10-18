import { Heart, Earth, type LucideProps } from "lucide-react"
import { forwardRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

type MainSection = {
  Image: React.FC<{ src: string, alt: string }>
  Favorite: React.FC
  Title: React.FC<{ children: React.ReactNode }>
  Times: React.FC<{ children: React.ReactNode }>
  Time: React.FC<{ Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>, children: React.ReactNode }>
  Diets: React.FC<{ diets: string[] }>
  DishTypes: React.FC<{ dishTypes: string[] }>
  Source: React.FC<{ to?: string, children: React.ReactNode }>
  isFavorite?: boolean
} & React.ForwardRefExoticComponent<MainProps & React.RefAttributes<HTMLDivElement>>

type MainProps = { isFavorite?: boolean } & React.HTMLAttributes<HTMLDivElement>

const Main: MainSection = forwardRef<HTMLDivElement, MainProps>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1 flex flex-col gap-2", className)} {...props}>
    {children}
  </div>
)) as MainSection

Main.Image = (props) => (
  <img
    {...props}
    className="w-full max-h-[250px] lg:rounded-md object-cover"
  />
)

Main.Title = ({ children }) => (
  <h1 className="font-bold text-3xl">{children}</h1>
)

Main.Favorite = () => (
  <div className="flex gap-1.5 text-rose-400 font-[600]">
    <Heart/>
    <span>Favorited Recipe</span>
  </div>
)

Main.Times = ({ children }) => (
  <div className="flex gap-2">
    {children}
  </div>
)

Main.Time = ({ Icon, children }) => (
  <div className="flex justify-between items-center gap-2 bg-orange-500 py-2 px-3 text-white rounded-md">
    <Icon/>
    <span className="text-center">
      <b>{children}</b> mins
    </span>
  </div>
)

Main.Diets = ({ diets }) => (
  <div className="flex flex-wrap gap-1 text-nowrap">
    { diets.map((diet, index) => <Badge key={index} className="bg-orange-500 gap-2 select-none pointer-events-none">{diet}</Badge>) }
  </div>
)

Main.DishTypes = ({ dishTypes }) => (
  <div className="flex-1 flex flex-wrap gap-2 text-nowrap">
    { 
      dishTypes.map((dish, index) => (
        <div key={index} className="flex-1 border border-slate-300 font-[600] flex justify-center items-center py-1 px-3 rounded-md">
          {dish}
        </div>
      ))
    }
  </div>
)

Main.Source = ({ to = "/", children }) => (
  <div className="flex gap-2">
    <Link to={to} target="_blank">
      <Earth/>
    </Link>
    <p className="text-muted-foreground">{children}</p>
  </div>
)

export default Main