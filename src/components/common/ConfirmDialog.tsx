import { Dialog, DialogContent, DialogActions, Typography } from '@mui/material';

import './ConfirmDialog.css';
import { ActionButton } from './ActionButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

/**
 * A megerősítő ablak (ConfirmDialog) tulajdonságait leíró interfész.
 */
interface ConfirmDialogProps {
    open: boolean;
    text: string;
    onContinue: () => void;
    onCancel: () => void;
}

/**
 * Modális megerősítő ablak komponens.
 * * Általános célú felugró ablak, amely egy kérdést tesz fel a felhasználónak,
 * és két választási lehetőséget kínál (Igen/Nem).
 * * Elsősorban műveletek (pl. törlés) előtti biztonsági kérdésre szolgál.
 * * @param props - A komponens beállításai (láthatóság, szöveg, eseménykezelők)
 */
export function ConfirmDialog( { open, text, onContinue, onCancel }: ConfirmDialogProps ) {
  return (
    <Dialog open={open} onClose={onCancel}>
        <DialogContent className="ConfirmDialog-content">
            <Typography className="ConfirmDialog-text">
                 { text } 
            </Typography>
        </DialogContent>

        <DialogActions className="ConfirmDialog-actions">
            <ActionButton label='Igen' icon={<CheckIcon />} onClick={() => onContinue()} color='primary' disabled={false}> </ActionButton>
            <ActionButton label='Nem' icon={<CloseIcon />} onClick={() => onCancel()} color='secondary' disabled={false}> </ActionButton>
        </DialogActions>
    </Dialog>
  );
};