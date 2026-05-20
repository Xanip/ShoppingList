import React from 'react';
import { Button } from '@mui/material';
import './ActionButton.css';

/**
 * Az ActionButton komponens tulajdonságai.
 */
interface ActionButtonProps {
  label?: string;
  icon: React.ReactNode;
  onClick: () => void;
  color?: 'primary' | 'secondary' | 'error';
  disabled?: boolean;
}

/**
 * Újrafelhasználható, stílusozott gomb komponens.
 * * Két megjelenési módot támogat:
 * 1. **Normál gomb:** Ha van label, akkor szöveg + ikon (széles).
 * 2. **Ikon gomb:** Ha nincs label, akkor csak az ikon jelenik meg (négyzet alakú).
 * * A stílusokat az ActionButton.css fájlból és a className-ekből nyeri.
 * * @param props - A gomb beállításai (szöveg, ikon, szín, stb.)
 */
export const ActionButton: React.FC<ActionButtonProps> = ({ 
  label, icon, onClick, color = 'primary', disabled = false 
}) => {
  const iconButton = !label;
  const actionButton = `ActionButton ${iconButton ? 'icon-only' : ''}`;

  return (
    <Button
      className={actionButton}
      variant="contained"
      color={color}
      onClick={onClick}
      disabled={disabled}

      startIcon={!iconButton ? icon : undefined}
    >
      {iconButton ? icon : label}
    </Button>
  );
};