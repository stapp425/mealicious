import { useState } from "react"

const DragAndDrop: React.FC = () => {
  const [activeTest, setActiveTest]= useState<string>("active widget here")
  
  return (
    <div className="flex gap-2">
      <div className="h-full bg-purple-200 flex flex-col justify-between gap-3">
        <div 
          className="bg-blue-300 cursor-grab active:cursor-grabbing" 
          draggable
          onDragStart={e => e.dataTransfer.setData("text/plain", "Test 1")}
        >
          Test 1
        </div>
        <div 
          className="bg-red-300 cursor-grab active:cursor-grabbing"
          draggable
          onDragStart={e => e.dataTransfer.setData("text/plain", "Test 2")}
        >
          Test 2
        </div>
        <div
          className="bg-green-300 cursor-grab active:cursor-grabbing"
          draggable
          onDragStart={e => e.dataTransfer.setData("text/plain", "Test 3")}
        >
          Test 3
        </div>
      </div>
      <div 
        className="w-[200px] h-[300px] border border-dashed border-slate-500 rounded-md"
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          const receivedString = e.dataTransfer.getData("text/plain")
          setActiveTest(receivedString)
        }}
      >
        {activeTest}
      </div>
    </div>
  )
}

export default DragAndDrop