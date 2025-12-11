import React from 'react';
import {ShoppingItemType} from '../../types/ShoppingItem';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DevicesIcon from '@mui/icons-material/Devices';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

/**
 * A CategoryIcon komponens beállításait leíró interfész.
 */
interface ActionButtonProps {
    category: ShoppingItemType;
    size?: 'small' | 'medium' | 'large';
}

/**
 * Kategória Ikon megjelenítő komponens.
 * * Egy adott ShoppingItemType alapján kiválasztja és megjeleníti 
 * a hozzá szemantikailag illeszkedő Material UI ikont.
 * * Ha a kategória nem ismert, alapértelmezetten egy "Egyéb" ikont mutat.
 * * @param props - A komponens tulajdonságai (kategória és méret)
 * @returns A megfelelő JSX Ikon elem
 */
export const CategoryIcon: React.FC<ActionButtonProps> = ({ category, size = 'medium' }) => {
    switch (category) {
        case 'Élelmiszer':
            return <RestaurantIcon fontSize={size}/>;
        case 'Műszaki':
            return <DevicesIcon fontSize={size}/>;
        case 'Ruházat':
            return <CheckroomIcon fontSize={size}   />;
        case 'Vegyi áru':
            return <CleaningServicesIcon  fontSize={size}/>;
        case 'Egyéb':
        default:
            return <HelpOutlineIcon  fontSize={size}/>;
    }
};

