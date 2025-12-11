import { render } from 'react';
import { Layout } from './components/layout/Layout';
import {ShoppingListProvider} from './context/ShoppingListContext';
import { ShoppingList } from './components/shopping_list/ShoppingList';
import { FeedbackToast } from './components/common/FeedbackToast';
import './style.css';

/**
 * Az alkalmazás gyökere.
 * Feladata az alkalmazás-szintű konfigurációk (Context Providerek) 
 * és a fő elrendezés (Layout) inicializálása.
 */
export function App() {

	return<ShoppingListProvider>
        <Layout>
            <ShoppingList/>
        </Layout>
        <FeedbackToast />
    </ShoppingListProvider>
}

/**
 * Az alkalmazás belépési pontja.
 */
render(<App />, document.getElementById('app'));
