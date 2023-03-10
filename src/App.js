import './css/App.css';
import './css/homePage.css'
import './css/Documentation.css'
import './css/Flows.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import DragDrop from './Pages/DragDrop';
import Header from './Pages/Header';
import HomePage from './Pages/HomePage';
import Documentation from './Pages/Documentation';
import Flows from './Pages/Flows';
import {AnimatePresence} from "framer-motion";

function App() {

    return (
        <DndProvider backend={HTML5Backend}>
            <AnimatePresence>
                <div className="App">
                    <BrowserRouter>
                        <Header/>
                        <Routes>
                            <Route path="dragDrop" element={<DragDrop/>}/>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="documentation" element={<Documentation/>}/>
                            <Route path="flows" element={<Flows/>}/>
                        </Routes>
                    </BrowserRouter>
                </div>
            </AnimatePresence>
        </DndProvider>
    );
}

export default App;
