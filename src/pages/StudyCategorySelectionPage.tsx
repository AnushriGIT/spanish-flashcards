import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
	{ key: 'animals', label: 'Animals' },
	{ key: 'food', label: 'Food' },
	{ key: 'verbs', label: 'Verbs' }
];

export default function StudyCategorySelectionPage(): JSX.Element {
	return (
		<div>
			<h2>Category Selection (Study)</h2>
			<p>Pick a category to start a study session.</p>
			<ul className="category-list">
				{categories.map(c => (
					<li key={c.key}>
						<Link className="btn btn-green" to={`/study/${c.key}`}>
							{c.label}
						</Link>
					</li>
				))}
			</ul>
			<Link to="/" className="link">Back Home</Link>
		</div>
	);
}


