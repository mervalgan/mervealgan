import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ChatMessage } from '@/types'

interface UIState {
  commandPaletteOpen: boolean
  chatOpen: boolean
  chatMessages: ChatMessage[]
  setCommandPaletteOpen: (v: boolean) => void
  setChatOpen: (v: boolean) => void
  addChatMessage: (msg: ChatMessage) => void
  clearChat: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      commandPaletteOpen: false,
      chatOpen: false,
      chatMessages: [],
      setCommandPaletteOpen: (v) => set({ commandPaletteOpen: v }),
      setChatOpen: (v) => set({ chatOpen: v }),
      addChatMessage: (msg) =>
        set((s) => ({ chatMessages: [...s.chatMessages.slice(-20), msg] })),
      clearChat: () => set({ chatMessages: [] }),
    }),
    { name: 'merve-ui', partialize: (s) => ({ chatMessages: s.chatMessages }) }
  )
)
