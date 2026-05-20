import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { Header } from './Header';
import './Layout.css';

/**
 * A Layout komponens tulajdonságai.
 */
export type LayoutProps = {
    children: ReactNode;
}

/**
 * Az alkalmazás fő elrendezését (Layout) biztosító keret komponens.
 * * Ez a komponens fogja össze az oldal állandó elemeit (pl. Header) és a változó tartalmat.
 * * A layoutDisplay CSS osztály felelős a központi elrendezésért és a háttérszínért.
 * * @param props - A komponens beállításai (gyermek elemek)
 */
export function Layout({ children}: LayoutProps) {
    return <Box className="layoutDisplay">
        <Header />
        {children}
    </Box>
}