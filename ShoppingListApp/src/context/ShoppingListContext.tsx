import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { ShoppingItem, ShoppingItemType } from '../types/ShoppingItem';
import { AlertColor } from '@mui/material';

/**
 * A szűrési opciók típusa.
 * Lehet egy konkrét kategória vagy a 'Minden' érték.
 */
export type FilterOption = ShoppingItemType | 'Minden';

/**
 * A ShoppingListContext által biztosított adatok és függvények interfésze.
 * Ez definiálja, hogy a komponensek mihez férhetnek hozzá.
 */
interface ShoppingListContextType {
    items: ShoppingItem[];            
    filteredItems: ShoppingItem[];     
    filter: FilterOption;              
    toastOpen: boolean;          
    toastMessage: string;        
    toastSeverity: 'success' | 'error' | 'info' | 'warning'; 
    hideToast: () => void;      
    setFilter: (category: FilterOption) => void; // Szűrő módosítása
    addItem: (item: ShoppingItem) => void;
    changeItem: (oldItem: ShoppingItem, newItem: ShoppingItem) => void;
    deleteItem: (id: string) => void;
    clearList: () => void;
}

/**
 * A Context objektum létrehozása alapértelmezett érték nélkül.
 */
const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

/**
 * A bevásárlólista globális állapotát kezelő Provider komponens.
 * Ez fogja össze az adatokat, a logikát és a perzisztenciát (LocalStorage).
 * * @param children - A beágyazott gyermek komponensek (App)
 */
export function ShoppingListProvider({ children }: { children: ReactNode }) {
    
    /**
     * Állapot: A bevásárlólista elemei.
     * Inicializáláskor megpróbálja betölteni az adatokat a LocalStorage-ból.
     */
    const [items, setItems] = useState<ShoppingItem[]>(() => {
        const storedItems = localStorage.getItem('shoppingListItems');
        return storedItems ? JSON.parse(storedItems) : [];
    });

    /**
     * Mellékhatás (Effect): Adatok mentése.
     * Minden alkalommal lefut, amikor a lista (items) változik, és elmenti azt a böngészőbe.
     */
    useEffect(() => {
        localStorage.setItem('shoppingListItems', JSON.stringify(items));
    }, [items]);

    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info');

    /**
     * Segédfüggvény visszajelző üzenet megjelenítésére.
     * @param message - A megjelenítendő szöveg
     * @param severity - Az üzenet típusa/színe (alapértelmezett: success)
     */
    const showToast = (message: string, severity: AlertColor = 'success') => {
        setToastMessage(message);
        setToastSeverity(severity);
        setToastOpen(true);
    };

    /**
     * Bezárja az aktív visszajelző üzenetet.
     */
    const hideToast = () => {
        setToastOpen(false);
    }

    const [filter, setFilter] = useState<FilterOption>('Minden');

    /**
     * Számított érték (Memoization): A szűrt lista.
     * Teljesítményoptimalizálás: csak akkor számolja újra, ha a lista vagy a szűrő változik.
     */
    const filteredItems = useMemo(() => {
        if (filter === 'Minden') {
            return items;
        } else {
            return items.filter(item => item.category === filter);
        }
    }, [items, filter]);
    
    /**
     * Új elem hozzáadása a listához.
     * Generál egy egyedi azonosítót, lejátssza a hangot és megjeleníti az üzenetet.
     * @param item - A termék adatai
     */
    const addItem = (item: ShoppingItem) => {
        const newItem = { ...item, id: crypto.randomUUID() };
        items.push(newItem); setItems([...items]);
        showToast('Termék sikeresen hozzáadva!', 'success');
    };

    /**
     * Meglévő elem adatainak módosítása.
     * @param oldItem - A régi elem (azonosításhoz)
     * @param newItem - Az új adatok
     */
    const changeItem = (oldItem: ShoppingItem, newItem: ShoppingItem) => {
        setItems( prevItems => prevItems.map( item => item.id === oldItem.id ? newItem : item ) );
        showToast('Termék sikeresen módosítva!', 'success');
    }

    /**
     * Egy elem törlése a listából ID alapján.
     * Lejátssza a törlés hangot is.
     * @param id - A törlendő elem azonosítója
     */
    const deleteItem = (id: string) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
        showToast('Termék törölve a listáról.', 'info');
    }

    /**
     * A teljes bevásárlólista törlése.
     */
    const clearList = () => {setItems([]); showToast('Lista törölve.', 'info');};

    return (
        <ShoppingListContext.Provider value={{ 
            items, 
            filteredItems,
            filter,
            toastOpen,
            toastMessage,
            toastSeverity,
            hideToast,
            setFilter, 
            addItem,
            changeItem,
            deleteItem, 
            clearList
        }}>
            {children}
        </ShoppingListContext.Provider>
    );
}

/**
 * Egyedi Hook a ShoppingListContext eléréséhez.
 * @returns A context értékei
 * @throws Hiba, ha Provider-en kívül használják
 */
export function useShoppingList() {
    const context = useContext(ShoppingListContext);
    if (!context) {
        throw new Error('useShoppingList, ShoppingListProvider-en kívül lett meghívva.');
    }
    return context;
}

/**
 * Hang lejátszása a megadott típus alapján (Hozzáadás vagy Törlés).
 * JS Audio API-t használ.
 * @param type - A művelet típusa ('add' vagy 'delete')
 */
export const playSoundEffect = (type: 'add' | 'delete') => {
    try {
        const path = type === 'add' ? '../sound/addButtonNoise.mp3' : '../sound/deleteButtonNoise.mp3';
        const audio = new Audio(path);
        audio.volume = 0.5; 
        audio.play();
    } catch (error) {
        console.warn("Nem sikerült lejátszani a hangot:", error);
    }
};