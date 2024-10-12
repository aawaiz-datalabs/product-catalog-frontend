import { atom } from 'jotai'

export interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
}

export const cartAtom = atom<CartItem[]>([])