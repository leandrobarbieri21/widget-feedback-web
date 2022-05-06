import { X } from 'phosphor-react'
import { Popover } from '@headlessui/react'

export function CloseButton() {
  return (
    <Popover.Button
      title="Close feedback"
      className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-100"
    >
      <X weight="bold" className="w-4 h-4" />
    </Popover.Button>
  )
}
