import { FormControl, Select,SelectChangeEvent, MenuItem } from '@mui/material';
import {SHOPPING_ITEM_TYPES} from '../../types/ShoppingItem';
import { CategoryIcon } from '../common/CategoryIcon';
import FilterListIcon from '@mui/icons-material/FilterList';
import { FilterOption } from '../../context/ShoppingListContext';
import './FilterBar.css';

/**
 * A FilterBar komponens tulajdonságai.
 */
export type FilterBarProps = {
    category?: FilterOption;
    onChange: ( newCategory: FilterOption ) => void;
}

/**
 * Kategória szűrő sáv komponens.
 * * Egy legördülő menüt jelenít meg, amelyben a felhasználó kiválaszthatja,
 * hogy mely termékkategóriákat szeretné látni a listában.
 * * Tartalmaz egy "Minden termék" opciót és a `SHOPPING_ITEM_TYPES`-ban definiált kategóriákat.
 * * @param props - A komponens beállításai (aktuális szűrő, változás kezelő)
 */
export function FilterBar( { category, onChange }: FilterBarProps )
{   
    /**
     * A Select változását kezelő belső függvény.
     * Kinyeri az értéket az eseményből és meghívja a szülő onChange függvényét.
     */
    const handleChange = ( event: SelectChangeEvent ) =>
    {
        onChange( (event.target as any).value as FilterOption );
    };

    return <FormControl>
        <Select className="FilterBar"
            value={ category }
            onChange={ handleChange }
            startAdornment={ <FilterListIcon sx={ { mr: 1, color: 'action.active' } } /> } // Kis extra ikon az elejére
        >
            <MenuItem value="Minden">
                <div>
                    <span>Minden termék</span>
                </div>
            </MenuItem>

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