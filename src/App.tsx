import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Board from './pages/Board';
import Layout from './components/layouts/layout/Layout';
import ModalManager from './components/utils/ModalManager';
import { Provider } from 'react-redux';
import store from './store/index';
import { useState } from 'react';

// tags

function App() {
	return (
		<div className='overflow-hidden'>
			<Provider store={store}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path={'/board/*'} element={<Layout />}>
						<Route path=':boardId' element={<Board />} />
					</Route>
				</Routes>
				<ModalManager />
			</Provider>
		</div>
	);
}

export default App;
