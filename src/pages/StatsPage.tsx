import React from 'react';
import { Link } from 'react-router-dom';

export default function StatsPage(): JSX.Element {
	return (
		<div>
			<h2>Statistics</h2>
			<p>Stats tracking will be implemented in Phase 5.</p>
			<Link to="/" className="link">Back Home</Link>
		</div>
	);
}


