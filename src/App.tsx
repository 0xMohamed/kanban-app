import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Board from './pages/Board';
import Layout from './components/layouts/layout/Layout';

function App() {
	return (
		<div className='overflow-hidden'>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path={'/board/*'} element={<Layout />}>
					<Route path=':boardId' element={<Board />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
