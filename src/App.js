import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import DragDrop from './components/DragDrop';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Documentation from './components/Documentation';
import Flows from './components/Flows';

function App() {

    return (
        <DndProvider backend={HTML5Backend}>
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
        </DndProvider>
    );
}

export default App;
