import { ShoppingItemUnit } from "../../types/ShoppingItem";
import { UnitSelector } from "./UnitSelector";
import { Paper, TextField } from '@mui/material';
import './QualityInput.css';

/**
 * A QuantityInput komponens tulajdonságai.
 */
export type QuantityInputProps = {
    quantity: number;
    unit: ShoppingItemUnit;
    onQuantityChange: (newQuantity: number) => void;
    onUnitChange: (newUnit: ShoppingItemUnit) => void;
}

/**
 * Összetett beviteli mező a mennyiség és a mértékegység együttes kezelésére.
 * * Egy közös Paper konténerben jeleníti meg a TextField-et és a UnitSelector-t (mértékegység).
 * * A CSS segítségével a két mező vizuálisan egyetlen egységet alkot.
 * * @param props - A komponens beállításai (értékek és eseménykezelők)
 */
export function QuantityInput({ quantity, unit, onQuantityChange, onUnitChange }: QuantityInputProps) {
    return <Paper variant="outlined" className="QuantityInput-paper">
        <TextField
            className="QuantityInput-field"
            variant="standard"
            type="number"
            value={quantity}
            onChange={(e) => onQuantityChange(parseFloat((e.target as HTMLInputElement).value))}
        />
        <UnitSelector value={unit} onChange={onUnitChange} />

    </Paper>;
}