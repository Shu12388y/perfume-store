import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ShoppingBag } from 'lucide-react'

function Cart() {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <ShoppingBag size={18} />
          </button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>This action cannot be undone.</SheetDescription>
          </SheetHeader>
        <SheetFooter className='text-center'>Continue Shopping</SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Cart
