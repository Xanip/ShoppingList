import { ShoppingItem } from '../../types/ShoppingItem';
import { Box } from '@mui/material';
import { ActionButton } from '../common/ActionButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ItemFormModal } from '../forms/ItemFormModal';
import { useState } from 'preact/hooks';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { useShoppingList, playSoundEffect } from '../../context/ShoppingListContext';

/**
 * A ShoppingItemActions komponens tulajdonságai.
 */
export type ShoppingListItemProps = {
    item: ShoppingItem;
}

/**
 * A listaelemhez tartozó műveleti gombok (Szerkesztés, Törlés) tárolója.
 * * Felelős a szerkesztő és törlő modális ablakok megjelenítéséért és a műveletek indításáért.
 * * @param props - A komponens beállításai (a manipulálandó elem)
 */
export function ShoppingItemActions({ item }: ShoppingListItemProps) {
    const [isOpenItemForm, setIsOpenItemForm] = useState(false);
    const [isOpenDeleteAll, setIsOpenDeleteAll] = useState(false);
    const { changeItem, deleteItem } = useShoppingList();

    return <Box key={item.id} className="ShoppingListItem-actions-container">
        <Box className="ShoppingListItem-actions">
            <ActionButton icon={<EditIcon />} onClick={() => { setIsOpenItemForm(true); }} />
        </Box>
        <Box className="ShoppingListItem-actions">
            <ActionButton icon={<DeleteIcon />} onClick={() => { setIsOpenDeleteAll(true); }} />
        </Box>

        <ConfirmDialog
            open={isOpenDeleteAll}
            text={`Biztosan törölni szeretné a ${item.name}?`}
            onContinue={() => {playSoundEffect('delete'); deleteItem(item.id); setIsOpenDeleteAll(false); }}
            onCancel={() => setIsOpenDeleteAll(false)}
        />

        <ItemFormModal
            open={isOpenItemForm}
            currentItem={item}
            onSave={(newItem) => { changeItem(item, newItem); setIsOpenItemForm(false); }}
            onCancel={() => setIsOpenItemForm(false)}
        />
    </Box>


}