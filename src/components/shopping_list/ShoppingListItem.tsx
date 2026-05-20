import { ShoppingItem } from '../../types/ShoppingItem';
import { ShoppingItemActions } from './ListItemActions';
import { Box, Typography } from '@mui/material';
import './ShoppingListItem.css';
import { CategoryIcon } from '../common/CategoryIcon';

/**
 * A ShoppingListItem komponens tulajdonságai.
 */
export type ShoppingListItemProps = {
    item: ShoppingItem;
}

/**
 * Egyetlen sort jelenít meg a bevásárlólistában.
 * * Grid elrendezést használ (a CSS fájl alapján), hogy illeszkedjen a fejléchez.
 * * Megjeleníti a nevet, mennyiséget, kategóriát (ikonnal) és a műveleti gombokat.
 * * @param props - A komponens beállításai
 */
export function ShoppingItemInList({ item }: ShoppingListItemProps) {

    return <Box className="ShoppingListItem" key={item.id}>
        <Typography>{item.name}</Typography>
        <Typography>{item.quantity + " " + item.unit}</Typography>
        <Box><Typography>{<CategoryIcon category={item.category} />}</Typography>
            <Typography>{item.category}</Typography>
        </Box>
        <ShoppingItemActions item={item} />
    </Box>

}

