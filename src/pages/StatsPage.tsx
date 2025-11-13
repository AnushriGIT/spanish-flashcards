import React from 'react';
import { Link } from 'react-router-dom';
import { useStats } from '../state/StatsContext';

export default function StatsPage(): JSX.Element {
	const { getStats, resetAll } = useStats();
	const stats = getStats();

	const totals = Object.values(stats).reduce(
		(acc, s) => {
			acc.studied += s.studied;
			acc.correct += s.correct;
			acc.wrong += s.wrong;
			return acc;
		},
		{ studied: 0, correct: 0, wrong: 0 }
	);
	const accuracy = totals.studied > 0 ? Math.round((totals.correct / totals.studied) * 100) : 0;

	return (
		<div>
			<h2>Statistics</h2>
			<div style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
				<div style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 8, background: '#fff' }}>
					<div style={{ fontWeight: 700, marginBottom: 4 }}>Overall</div>
					<div>Total studied: {totals.studied}</div>
					<div>Correct: {totals.correct}</div>
					<div>Incorrect: {totals.wrong}</div>
					<div>Accuracy: {accuracy}%</div>
				</div>
				<div style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 8, background: '#fff' }}>
					<div style={{ fontWeight: 700, marginBottom: 8 }}>By Category</div>
					<div style={{ display: 'grid', gap: 8 }}>
						{(['animals', 'food', 'verbs'] as const).map(cat => {
							const s = stats[cat];
							const acc = s.studied > 0 ? Math.round((s.correct / s.studied) * 100) : 0;
							const label = cat[0].toUpperCase() + cat.slice(1);
							return (
								<div key={cat} style={{ padding: 10, border: '1px solid #f1f5f9', borderRadius: 8, background: '#fafafa' }}>
									<div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
									<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
										<div>Studied: {s.studied}</div>
										<div>Accuracy: {acc}%</div>
										<div>Correct: {s.correct}</div>
										<div>Incorrect: {s.wrong}</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div>
					<button className="btn btn-red" type="button" onClick={resetAll}>Reset All Stats</button>
				</div>
			</div>
			<Link to="/" className="link">Back Home</Link>
		</div>
	);
}


