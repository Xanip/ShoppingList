import { Box } from '@mui/material';
import { ActionButton } from '../common/ActionButton';
import { FilterBar } from './FilterBar';
import { useState } from 'react';
import './DashBoardControls.css';
import { useShoppingList, playSoundEffect } from '../../context/ShoppingListContext';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { ItemFormModal } from '../forms/ItemFormModal';


/**
 * A vezérlőpult komponens (Dashboard).
 * * Ez a komponens fogja össze a lista feletti irányító elemeket:
 * - Új elem hozzáadása gomb
 * - Kategória szűrő (FilterBar)
 * - Teljes lista törlése gomb
 * * Felelős a modális ablakok (Új elem űrlap, Törlés megerősítés) állapotának kezeléséért és a hanghatások lejátszásáért.
 */
export const DashboardControls: React.FC = () => {
    const { filter, setFilter, addItem, clearList } = useShoppingList();
    const [ isOpenDeleteAll, setIsOpenDeleteAll ] = useState( false );
    const [ isOpenItemForm, setIsOpenItemForm ] = useState( false );

    return (
        <Box className="DashboardControls-row">
            <ActionButton label="Elem hozzáadása" icon="" onClick={() => { setIsOpenItemForm(true) }} color="primary" disabled={false} />
            <FilterBar category={ filter } onChange={(newCategory) => { setFilter(newCategory) }} />

            <ActionButton label="Lista törlése" icon="" onClick={() => setIsOpenDeleteAll(true)} color="secondary" disabled={false} />

            <ConfirmDialog 
                open={isOpenDeleteAll} 
                text='Biztosan törölni szeretné?' 
                onContinue={ () => { playSoundEffect('delete'); clearList(); setIsOpenDeleteAll(false); } } 
                onCancel={ () => setIsOpenDeleteAll(false) } 
            />

            <ItemFormModal
                open={isOpenItemForm}
                onSave={ (newItem) => { playSoundEffect('add'); addItem(newItem); setIsOpenItemForm(false); } }
                onCancel={ () => setIsOpenItemForm(false) }
            />
            
        </Box>
    );
}