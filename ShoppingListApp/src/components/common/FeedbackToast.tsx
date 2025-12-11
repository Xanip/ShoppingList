import { Snackbar, Alert } from '@mui/material';
import { useShoppingList } from '../../context/ShoppingListContext';


/**
 * Globális visszajelző komponens.
 * * A ShoppingListContext-ből nyeri az állapotát (megjelenjen-e, mi az üzenet, milyen színű).
 */
export function FeedbackToast() {
    const { toastOpen, toastMessage, toastSeverity, hideToast } = useShoppingList();
    
    return (
        <Snackbar
            open={toastOpen}
            autoHideDuration={3000} 
            onClose={hideToast}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} 
        >
            <Alert 
                onClose={hideToast} 
                severity={toastSeverity} 
                variant="filled"
                sx={{ width: '100%' }}
            >
                {toastMessage}
            </Alert>
        </Snackbar>
    );
}