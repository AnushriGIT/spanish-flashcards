import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
	{ key: 'animals', label: 'Animals' },
	{ key: 'food', label: 'Food' },
	{ key: 'verbs', label: 'Verbs' }
];

export default function QuizCategorySelectionPage(): JSX.Element {
	return (
		<div>
			<h2>Quiz Category Selection</h2>
			<p>Choose a category and quiz type. Full quiz flow will be added in Phase 4.</p>
			<ul className="category-list">
				{categories.map(c => (
					<li key={c.key}>
						<span className="btn btn-disabled" role="button" aria-disabled="true">
							{c.label}
						</span>
					</li>
				))}
			</ul>
			<Link to="/" className="link">Back Home</Link>
		</div>
	);
}


