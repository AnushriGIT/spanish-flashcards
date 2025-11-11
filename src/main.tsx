import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './styles.css';
import HomePage from './pages/HomePage';
import StudyCategorySelectionPage from './pages/StudyCategorySelectionPage';
import QuizCategorySelectionPage from './pages/QuizCategorySelectionPage';
import StatsPage from './pages/StatsPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: 'study', element: <StudyCategorySelectionPage /> },
			{ path: 'quiz', element: <QuizCategorySelectionPage /> },
			{ path: 'stats', element: <StatsPage /> }
		]
	}
]);

const rootEl = document.getElementById('root');
if (!rootEl) {
	throw new Error('Root element not found');
}
createRoot(rootEl).render(<RouterProvider router={router} />);


