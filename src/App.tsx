import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function App(): JSX.Element {
	return (
		<div className="app">
			<header className="header">
				<Link to="/" className="brand">Spanish Flashcards</Link>
			</header>
			<main className="main">
				<Outlet />
			</main>
		</div>
	);
}


