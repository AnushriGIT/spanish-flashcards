import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
	{ key: 'animals', label: 'Animals' },
	{ key: 'food', label: 'Food' },
	{ key: 'verbs', label: 'Verbs' }
];

export default function QuizCategorySelectionPage(): JSX.Element {
	const [quizType, setQuizType] = React.useState<'mc' | 'fib'>('mc');

	return (
		<div>
			<h2>Quiz Selection</h2>
			<p>Choose a quiz type and category.</p>

			<div style={{ display: 'flex', gap: 8, margin: '12px 0' }}>
				<button
					type="button"
					className={`btn ${quizType === 'mc' ? 'btn-green' : ''}`}
					onClick={() => setQuizType('mc')}
				>
					Multiple Choice
				</button>
				<button
					type="button"
					className={`btn ${quizType === 'fib' ? 'btn-orange' : ''}`}
					onClick={() => setQuizType('fib')}
				>
					Fill in the Blank
				</button>
			</div>

			<ul className="category-list">
				{categories.map(c => (
					<li key={c.key}>
						{quizType === 'mc' ? (
							<Link className="btn btn-green" to={`/quiz/mc/${c.key}`}>
								{c.label}
							</Link>
						) : (
							<Link className="btn btn-orange" to={`/quiz/fib/${c.key}`}>
								{c.label}
							</Link>
						)}
					</li>
				))}
			</ul>
			<Link to="/" className="link">Back Home</Link>
		</div>
	);
}


