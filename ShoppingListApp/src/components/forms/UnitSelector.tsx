import { FormControl, Select,SelectChangeEvent, MenuItem } from '@mui/material';
import {SHOPPING_ITEM_UNITS, ShoppingItemUnit} from '../../types/ShoppingItem';
import './UnitSelector.css';

/**
 * A UnitSelector komponens tulajdonságai.
 */
export type UnitSelectorProps = {
    onChange: ( newUnit: ShoppingItemUnit ) => void;
    value: ShoppingItemUnit;
}

/**
 * Mértékegység választó komponens.
 * * Kifejezetten a QuantityInput részeként való használatra lett optimalizálva.
 * * Minimalista megjelenésű (keret nélküli, standard variant), hogy vizuálisan beleolvadjon a számmező mellé.
 * * @param props - A komponens beállításai
 */
export function UnitSelector( { value, onChange }: UnitSelectorProps )
{   
    /**
     * Belső eseménykezelő a Select változásához.
     */
    const handleChange = (event: SelectChangeEvent) => {
        onChange( (event.target as any).value as ShoppingItemUnit );
    };

    return <FormControl variant="standard" className="UnitSelector-FormControl">
        <Select
            className="UnitSelector-select"
            variant="standard"      
            disableUnderline={true} 
            value={ value }
            onChange={handleChange}
        >
            { SHOPPING_ITEM_UNITS.map( unit => (
                <MenuItem key={ unit } value={ unit }>
                    <div>
                        <span>{ " " + unit }</span>
                    </div>
                </MenuItem>
            ) ) }
        </Select>

    </FormControl>
}