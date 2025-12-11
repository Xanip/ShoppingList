import { Dialog, DialogContent, DialogActions, TextField, Box } from '@mui/material';

import { ActionButton } from '../common/ActionButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { ShoppingItem } from '../../types/ShoppingItem';
import { CategorySelector } from './CategorySelector';
import { useEffect, useState } from 'react';
import { QuantityInput } from './QuantityInput';
import './ItemFormModal.css';

/**
 * Az ItemFormModal komponens tulajdonságai.
 */
interface ItemFormModalProps {
    open: boolean;
    onSave: (item: ShoppingItem) => void;
    onCancel: () => void;
    currentItem?: ShoppingItem;
}

/**
 * Alapértelmezett üres termék sablon új elem létrehozásához.
 */
const DEFAULT_ITEM: ShoppingItem = {
    id: '',
    name: '',
    quantity: 1,
    unit: 'db',
    category: 'Élelmiszer'
};

/**
 * Űrlap komponens termékek kezelésére.
 * * Lehetővé teszi új termék felvételét vagy meglévő szerkesztését.
 * * Kezeli az űrlap mezőinek belső állapotát (useState), és csak mentéskor adja át az adatokat a szülőnek.
 * * Automatikusan kitölti a mezőket, ha currentItem-et kap (Effect).
 * * @param props - A komponens beállításai
 */
export function ItemFormModal({ open, onSave, onCancel, currentItem }: ItemFormModalProps) {
    const [newItem, setNewItem] = useState<ShoppingItem>(DEFAULT_ITEM);

    /**
     * Mellékhatás (Effect): Adatok betöltése vagy alaphelyzetbe állítása.
     * Minden alkalommal lefut, amikor az ablak megnyílik, 
     * vagy változik a szerkesztendő elem.
     */
    useEffect(() => {
        if (open) {
            if (currentItem) {
                setNewItem(currentItem);
            } else {
                setNewItem(DEFAULT_ITEM);
            }
        }
    }, [open, currentItem]);


    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogContent className="ConfirmDialog-content">
                <Box className="ConfirmDialog-inputs">
                    <TextField type="text" value={newItem?.name} onChange={(e) => { setNewItem({ ...newItem, name: (e.target as HTMLInputElement).value }) }} placeholder="Név" />
                    <CategorySelector value={newItem?.category} onChange={(category) => { setNewItem({ ...newItem, category }) }} />
                    
                </Box>
                <Box>
                    <QuantityInput quantity={newItem.quantity} unit={newItem.unit} onQuantityChange={(quantity) => setNewItem({ ...newItem, quantity })} onUnitChange={(unit) => setNewItem({ ...newItem, unit })} />
                </Box>
            </DialogContent>

            <DialogActions className="ConfirmDialog-actions">
                <ActionButton label='Mentés' icon={<CheckIcon />} onClick={() => onSave(newItem)} color='primary' disabled={false}> </ActionButton>
                <ActionButton label='Mégse' icon={<CloseIcon />} onClick={() => onCancel()} color='secondary' disabled={false}> </ActionButton>
            </DialogActions>
        </Dialog>
    );
};