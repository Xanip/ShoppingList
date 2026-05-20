import { useShoppingList } from '../../context/ShoppingListContext';
import { Box, Paper, Typography } from '@mui/material';
import { ShoppingListHeader } from './ShoppingListHeader';
import { ShoppingItemInList } from './ShoppingListItem';

/**
 * A szűrt bevásárlólista megjelenítéséért felelős fő komponens.
 * * A ShoppingListContext-ből kéri le az aktuális (filteredItems) adatokat.
 * * Ha a lista üres, tájékoztató üzenetet jelenít meg.
 */
export const ShoppingList: React.FC = () => {
    const { filteredItems } = useShoppingList();

    // Ha nincs megjeleníthető elem, ne a fejlécet, hanem üzenetet mutassunk
    if (filteredItems.length === 0) {
        return (
            <Paper sx={{ p: 4, textAlign: 'center', color: 'text.secondary', mt: 2 }}>
                <Typography>Nincs megjeleníthető elem a listában.</Typography>
            </Paper>
        );
    }

    return (
        <Paper>
            <ShoppingListHeader />
            <Box>
                {filteredItems.map(unit => (
                    <ShoppingItemInList item={unit} />
                ))}
            </Box>
        </Paper>

    );
}