import { AppBar, Toolbar, Typography, Chip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { DashboardControls } from '../dashboard/DashboardControls';
import { useShoppingList } from '../../context/ShoppingListContext';
import './Header.css';

/**
 * Az alkalmazás fejléce.
 * * Megjeleníti az alkalmazás címét és a bevásárlókosár ikont.
 * * Egy dinamikus Chip (számláló) segítségével mutatja a jelenleg listázott elemek számát.
 * * Magában foglalja a vezérlőpultot (DashboardControls) is a könnyű elérés érdekében.
 */
export function Header() {
    const { filteredItems } = useShoppingList();

    return <AppBar className="Header" position="static">
        <Toolbar className='Header-text'>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                Bevásárló Lista
                <Chip
                    icon={<ShoppingCartIcon />}
                    label={`${filteredItems.length} db`}
                    color="primary"
                    variant="filled"
                    className='Header-Chip'
                />
            </Typography>
        </Toolbar>

        <DashboardControls> </DashboardControls>
    </AppBar>
}