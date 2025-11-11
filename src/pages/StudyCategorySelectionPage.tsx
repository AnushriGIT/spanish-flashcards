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
			<p>Pick a category to study. Full study flow will be added in Phase 2.</p>
			<ul className="category-list">
				{categories.map(c => (
					<li key={c.key}>
						<span className="btn btn-disabled" role="button" aria-disabled="true">
							{c.label}
						</span>
					</li>
				))}
			</ul>
			<p className="note">Navigation works to this page from Home as required in Phase 1.</p>
			<Link to="/" className="link">Back Home</Link>
		</div>
	);
}


