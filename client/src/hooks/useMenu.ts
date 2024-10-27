// src/hooks/useMenu.ts
import { create } from 'zustand';

// Definir el estado del store y los tipos
interface MenuState {
    valor: boolean;
    invertirValor: () => void;
}

// Crear el store Zustand con el tipo definido
const useMenu = create<MenuState>((set) => ({
    valor: false, // valor inicial
    invertirValor: () => set((state) => ({ valor: !state.valor })) // función para invertir el valor
}));

export default useMenu;
