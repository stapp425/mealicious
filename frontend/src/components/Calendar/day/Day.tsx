import { AnimatePresence, motion } from 'framer-motion'
import { type Plan as PlanType } from '@/types/plan'
import { format } from 'date-fns'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import Plan from './Plan'
import * as Placeholder from '@/components/Theme/Placeholder'

type Props = {
  className?: string
  currentDay: Date
  setDay: (value: number) => void
  events?: PlanType[]
}

const Day: React.FC<Props> = ({ className, setDay, currentDay, events }) => (    
  <motion.div
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -100, opacity: 0 }}
    transition={{ ease: "easeInOut", duration: 0.35 }}
    className={className}
  >
    <div className="flex justify-between items-center gap-6">
      <ToggleButton
        onClick={() => setDay(-1)}
        className="rounded-full border border-slate-400 p-2 hover:-translate-x-2 transition-transform"
      >
        <ChevronLeft />
      </ToggleButton>
      <AnimatePresence>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 0.35 }} 
          className="relative w-[550px] h-[550px] border border-slate-400 flex flex-col rounded-md p-4"
        >
          <h1 className="text-center font-bold text-3xl">
            {format(currentDay, "MMMM dd, yyyy")}
          </h1>
          <h2 className="text-center text-muted-foreground font-[600] my-1">
            {format(currentDay, "EEEE")}
          </h2>
          { 
            events && events.length > 0 
              ? <ScrollArea className="flex-1" type="always">
                  {events.map((event, index) => <Plan key={index} plan={event}/>)}
                  <ScrollBar/>
                </ScrollArea>
              : <Placeholder.Root
                  icon={<X size={64}/>}
                  className="my-auto size-full"
                >
                  <Placeholder.Message>No Meals Found!</Placeholder.Message>
                </Placeholder.Root>
          }
        </motion.div>
      </AnimatePresence>
      <ToggleButton
        onClick={() => setDay(1)}
        className="rounded-full border border-slate-400 p-2 hover:translate-x-2 transition-transform"
      >
        <ChevronRight/>
      </ToggleButton>
    </div>
  </motion.div>
)

type ButtonProps = {
  className?: string
  onClick: () => void
  children: React.ReactNode
}

const ToggleButton: React.FC<ButtonProps> = ({ className, onClick, children }) => (
  <button 
    onClick={onClick}
    className={className}
  >
    {children}
  </button>
)

export default Day