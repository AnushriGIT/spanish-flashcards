import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './styles.css';
import HomePage from './pages/HomePage';
import StudyCategorySelectionPage from './pages/StudyCategorySelectionPage';
import QuizCategorySelectionPage from './pages/QuizCategorySelectionPage';
import StatsPage from './pages/StatsPage';
import StudySessionPage from './pages/StudySessionPage';
import { WrongCardsProvider } from './state/WrongCardsContext';
import RedoStudySessionPage from './pages/RedoStudySessionPage';
import MultipleChoiceQuizPage from './pages/MultipleChoiceQuizPage';
import FillBlankQuizPage from './pages/FillBlankQuizPage';
import { StatsProvider } from './state/StatsContext';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: 'study', element: <StudyCategorySelectionPage /> },
			{ path: 'study/:category', element: <StudySessionPage /> },
			{ path: 'study/:category/redo', element: <RedoStudySessionPage /> },
			{ path: 'quiz', element: <QuizCategorySelectionPage /> },
			{ path: 'quiz/mc/:category', element: <MultipleChoiceQuizPage /> },
			{ path: 'quiz/fib/:category', element: <FillBlankQuizPage /> },
			{ path: 'stats', element: <StatsPage /> }
		]
	}
]);

const rootEl = document.getElementById('root');
if (!rootEl) {
	throw new Error('Root element not found');
}
createRoot(rootEl).render(
	<StatsProvider>
		<WrongCardsProvider>
			<RouterProvider router={router} />
		</WrongCardsProvider>
	</StatsProvider>
);


