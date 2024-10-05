import { AppContext } from "@/App"
import siteLogo from "@/img/logo/mealicious-logo.svg"
import { useContext } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Calendar, House, List, LogOut, LucideProps, Pencil, Search, Menu } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { signOut } from "@/util/auth"
import { cn } from "@/lib/utils"

type NavBarProps = {
  className?: string
}

const NavBar: React.FC<NavBarProps> = ({ className }) => {
  const navigate = useNavigate()
  const { activeSection } = useContext(AppContext)
  
  const activeSectionStyle = {
    backgroundColor: "#fed7aa",
    borderRight: "5px solid #f97316"
  }
  
  return (
    <div className={cn("float-start sticky top-0 left-0 z-50 flex-none bg-white w-[325px] h-screen py-4 space-y-4 shadow-lg", className)}>
      <img
        src={siteLogo}
        alt="Mealicious Logo"
        width="175px"
        className="mx-auto"
      />
      <div>
        <Section 
          label="Dashboard"
          Icon={House}
          style={activeSection === "dashboard" ? activeSectionStyle : {}}
          onClick={() => navigate("/dashboard")}
        />
        <Accordion type="single" collapsible>
          <AccordionSection accordionItem={1} title="Recipes">
            <SubSection label="All Recipes" Icon={List} to="/recipes"/>
            <SubSection label="Create Recipe" Icon={Pencil} to="recipes/create"/>
            <SubSection label="Search Recipes" Icon={Search} to="recipes/search"/>
          </AccordionSection>
          <AccordionSection accordionItem={2} title="Meals">
            <SubSection label="All Meals" Icon={List} to="/meals"/>
            <SubSection label="Create Meal" Icon={Pencil} to="/meals/create"/>
          </AccordionSection>
          <AccordionSection accordionItem={3} title="Plans">
            <SubSection label="Meal Calendar" Icon={Calendar} to="/meals/calendar"/>
          </AccordionSection>
        </Accordion>
        <SignOutButton/>
      </div>
      <h2 className="text-muted-foreground w-full absolute bottom-4 italic pl-4">&copy; 2024 Shawn Tapp</h2>
    </div>
  )
}

const NavBarSheet: React.FC = () => (
  <Sheet>
    <SheetTrigger>
      <Menu size={26}/>
    </SheetTrigger>
    <SheetContent side="left" className="p-0 w-fit">
      <NavBar/>
      <VisuallyHidden.Root>
        <SheetHeader className="hidden">
          <SheetTitle>Mealicious Navigation Menu</SheetTitle>
          <SheetDescription className="hidden">
            Allows the user to navigate to different pages of the website.
            Open by default on large screen sizes and collapsible on smaller sizes.
          </SheetDescription>
        </SheetHeader>
      </VisuallyHidden.Root>
    </SheetContent>
  </Sheet>
)

type AccordionSectionProps = {
  title: string
  accordionItem: number
  children?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

type SectionProps = {
  Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
  label: string
  to: string
} & React.HTMLAttributes<HTMLDivElement>

const Section: React.FC<Omit<SectionProps, "to"> & { destructive?: boolean }> = ({ Icon, label, destructive = false, onClick }) => (
  <div 
    className={`border-none flex justify-between items-center p-4 ${destructive ? "bg-red-500 hover:bg-red-800" : "hover:bg-slate-300"} hover:cursor-pointer transition-colors`}
    style={destructive ? {backgroundColor: "#ef4444", color: "white"} : {}}
    onClick={onClick}
  >
    <h2 className="font-[600] text-xl">{label}</h2>
    <Icon size={24}/> 
  </div>
)

const AccordionSection: React.FC<AccordionSectionProps> = ({ title, accordionItem = 1, children }) => (
  <AccordionItem value={`item-${accordionItem}`} className="border-none">
    <AccordionTrigger className="font-[600] text-xl p-4">{title}</AccordionTrigger>
    <AccordionContent className="h-fit">{children}</AccordionContent>
  </AccordionItem>
)

const SubSection: React.FC<SectionProps> = ({ Icon, label, to }) => (
  <Link className="h-[50px] flex justify-between items-center pl-8 pr-4 hover:bg-slate-300 transition-colors" to={to}>
    <h3 className="font-[600]">{label}</h3>
    <Icon size={16}/>
  </Link>
)

const SignOutButton: React.FC = () => (
  <AlertDialog>
    <AlertDialogTrigger className="w-full">
      <Section label="Sign Out" Icon={LogOut} destructive/>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          Proceeding may cause unsaved changes to be lost.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={signOut} className="bg-red-500">
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
)

export { NavBar, NavBarSheet }