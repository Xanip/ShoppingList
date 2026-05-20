/**
 * A bevásárlólistán szereplő tételek lehetséges kategóriái.
 * Ezek alapján történik a szűrés és az ikonok kiválasztása.
 */
export type ShoppingItemType = 'Élelmiszer' | 'Műszaki' | 'Ruházat' | 'Vegyi áru' | 'Egyéb';

/**
 * A konstans tömb a kategóriák iterálásához.
 */
export const SHOPPING_ITEM_TYPES: ShoppingItemType[] = [ 'Élelmiszer', 'Műszaki', 'Ruházat', 'Vegyi áru', 'Egyéb' ];

/**
 * A támogatott mértékegységek listája.
 */
export type ShoppingItemUnit = 'db' | 'kg' | 'dkg' | 'g' | 'l' | 'dl' | 'csomag';

/**
 * A konstans tömb a mértékegységek iterálásához.
 */
export const SHOPPING_ITEM_UNITS: ShoppingItemUnit[] = [ 'db', 'kg', 'dkg', 'g', 'l', 'dl', 'csomag' ];

/**
 * Egyetlen bevásárlólista elemet reprezentáló interfész.
 * Ez az alkalmazás fő adatmodellje.
 */
export interface ShoppingItem {
    id: string;
    name: string;
    quantity: number;
    unit: ShoppingItemUnit;
    category: ShoppingItemType;
}