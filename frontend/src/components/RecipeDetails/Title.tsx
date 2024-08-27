import { Clock, Heart, Microwave, Clipboard, Earth } from "lucide-react"
import { forwardRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"

type Props = {
  className?: string
  title: string
  isFavorite: boolean
  image: string
  times: {
    readyTime: number
    cookTime: number
    prepTime: number
  }
  diets?: string[]
  dishTypes?: string[]
  source?: {
    name: string
    url: string
  }
}

const Title = forwardRef<HTMLDivElement, Props>(({ className, title, isFavorite, image, times, diets, dishTypes, source }, ref) => {
  return (
    <div ref={ref} className={className}>
      <img
        src={image} 
        alt={title}
        className="rounded-md max-w-[300px]"
      />
      <div className="flex-1 flex flex-col gap-2">
        <h1 className="font-bold text-3xl">{title}</h1>
        {
          isFavorite &&
            <div className="flex gap-1.5 text-rose-400 font-[600]">
              <Heart/>
              <span>Favorited Recipe</span>
            </div>
        }
        <div className="flex gap-2">
          <div className="flex justify-between items-center gap-2 bg-orange-500 py-2 px-3 text-white rounded-md">
            <Clock/>
            <span className="text-center">
              <b>{times.readyTime || "-"}</b> mins
            </span>
          </div>
          <div className="flex justify-between items-center gap-2 bg-orange-500 py-2 px-3 text-white rounded-md">
            <Microwave/>
            <span className="text-center">
              <b>{times.cookTime || "-"}</b> mins
            </span>
          </div>
          <div className="flex justify-between items-center gap-2 bg-orange-500 py-2 px-3 text-white rounded-md">
            <Clipboard/>
            <span className="text-center">
              <b>{times.prepTime || "-"}</b> mins
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 text-nowrap">
          { diets?.map((diet, index) => <Badge key={index} className="bg-orange-500 gap-2 select-none pointer-events-none">{diet}</Badge>) }
        </div>
        <div className="flex-1 flex flex-wrap gap-2 text-nowrap">
          { 
            dishTypes?.map((dish, index) => (
              <div key={index} className="flex-1 border border-slate-300 font-[600] flex justify-center items-center py-1 px-3 rounded-md">
                {dish}
              </div>
            ))
          }
        </div>
        {
          source &&
            <div className="flex gap-2">
              <Link to={source.url} target="_blank">
                <Earth/>
              </Link>
              <p className="text-muted-foreground">{source.name}</p>
            </div>
        }
      </div>
    </div>
  )
})

export default Title