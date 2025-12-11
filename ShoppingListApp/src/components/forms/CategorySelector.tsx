import { FormControl, Select,SelectChangeEvent, MenuItem } from '@mui/material';
import {SHOPPING_ITEM_TYPES, ShoppingItemType} from '../../types/ShoppingItem';
import { CategoryIcon } from '../common/CategoryIcon';

/**
 * A kategória választó komponens tulajdonságai.
 */
export type CategoryIconProps = {
    onChange: ( newCategory: ShoppingItemType ) => void;
    value: ShoppingItemType;
}

/**
 * Kategória választó legördülő menü.
 * * Megjeleníti az összes elérhető termékkategóriát (SHOPPING_ITEM_TYPES) egy listában.
 * * Minden opció mellett megjeleníti a hozzá tartozó ikont is a CategoryIcon segítségével.
 * * @param props - A komponens beállításai (aktuális érték, változás kezelő)
 */
export function CategorySelector( { value, onChange }: CategoryIconProps )
{   

    /**
     * Belső eseménykezelő a Select változásához.
     * A Material UI eseményéből kinyeri az értéket és továbbítja a szülőnek.
     */
    const handleChange = (event: SelectChangeEvent) => {
        onChange( (event.target as any).value as ShoppingItemType );
    };

    return <FormControl>
        <Select
            value={ value }
            onChange={handleChange}
        >
            { SHOPPING_ITEM_TYPES.map( type => (
                <MenuItem key={ type } value={ type }>
                    <div>
                        <CategoryIcon category={ type } size="small" />
                        <span>{ " " + type }</span>
                    </div>
                </MenuItem>
            ) ) }
        </Select>

    </FormControl>
}