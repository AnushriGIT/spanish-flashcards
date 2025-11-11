import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage(): JSX.Element {
	return (
		<div className="home">
			<h1>Welcome to Spanish Flashcards</h1>
			<div className="nav-buttons">
				<Link className="btn btn-green" to="/study">Study Mode</Link>
				<Link className="btn btn-orange" to="/quiz">Quiz Mode</Link>
				<Link className="btn btn-red" to="/stats">Stats Page</Link>
			</div>
		</div>
	);
}


