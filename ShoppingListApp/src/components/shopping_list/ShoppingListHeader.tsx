import { Box, Typography } from '@mui/material';
import './ShoppingListHeader.css';

/**
 * A bevásárlólista fejléce.
 * * Fix oszlopneveket jelenít meg a lista tetején.
 * * A CSS Grid elrendezése (szélességek) megegyezik a ShoppingListItem elrendezésével,
 * így az oszlopok pontosan egymás alá kerülnek.
 */
export const ShoppingListHeader: React.FC = () => {

    return (
        <Box className="ShoppingListHeader">
                <Typography variant="h4" sx={{ }}>
                    Név
                </Typography>
                <Typography variant="h4" sx={{  }}>
                    Darabszám
                </Typography>
                <Typography variant="h4" sx={{ }}>
                    Típus
                </Typography>
                <Typography variant="h4" sx={{ }}>
                    Akciók
                </Typography>
        </Box>
    );
}