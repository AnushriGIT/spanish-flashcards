import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { flashcards, Flashcard as FlashcardType } from '../data/flashcards';
import { useStats } from '../state/StatsContext';

export default function FillBlankQuizPage(): JSX.Element {
	const params = useParams();
	const category = (params.category ?? '') as FlashcardType['category'] | '';
	const stats = useStats();

	const cards = React.useMemo(
		() => flashcards.filter(c => c.category === category),
		[category]
	);

	const [index, setIndex] = React.useState(0);
	const [answer, setAnswer] = React.useState('');
	const [checked, setChecked] = React.useState(false);
	const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);

	React.useEffect(() => {
		setIndex(0);
		setAnswer('');
		setChecked(false);
		setIsCorrect(null);
	}, [category]);

	if (!category) {
		return (
			<div>
				<h2>Quiz — Fill in the Blank</h2>
				<p>Missing category.</p>
				<Link to="/quiz" className="link">Back to Quiz Selection</Link>
			</div>
		);
	}

	if (cards.length === 0) {
		return (
			<div>
				<h2>Quiz — Fill in the Blank</h2>
				<p>No questions available for this category.</p>
				<Link to="/quiz" className="link">Back to Quiz Selection</Link>
			</div>
		);
	}

	const isDone = index >= cards.length;
	const current = cards[index];

	function check(): void {
		if (checked) return;
		const normalized = answer.toLowerCase().trim();
		const correct = current.english.toLowerCase().trim();
		const ok = normalized === correct;
		setIsCorrect(ok);
		stats.recordAnswer(category, ok);
		setChecked(true);
	}

	function next(): void {
		setIndex(i => i + 1);
		setAnswer('');
		setChecked(false);
		setIsCorrect(null);
	}

	function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
		if (e.key === 'Enter') {
			if (!checked) check();
			else next();
		}
	}

	return (
		<div>
			<h2>Quiz — Fill in the Blank ({category[0].toUpperCase() + category.slice(1)})</h2>
			{!isDone ? (
				<>
					<p>Type the English translation:</p>
					<div style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>{current.spanish}</div>

					<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
						<input
							type="text"
							value={answer}
							onChange={e => setAnswer(e.target.value)}
							onKeyDown={onKeyDown}
							placeholder="Type the English word"
							style={{
								flex: '1 1 auto',
								padding: '10px 12px',
								borderRadius: 8,
								border: '1px solid #e5e7eb',
								fontSize: 16
							}}
						/>
						{!checked ? (
							<button className="btn btn-green" type="button" onClick={check} disabled={answer.trim() === ''}>
								Check
							</button>
						) : (
							<button className="btn btn-orange" type="button" onClick={next}>
								Next
							</button>
						)}
					</div>

					{checked && (
						<div style={{ marginTop: 12 }}>
							{isCorrect ? (
								<div style={{ color: '#16a34a', fontWeight: 600 }}>Correct!</div>
							) : (
								<div style={{ color: '#dc2626', fontWeight: 600 }}>
									Wrong — the answer was: {current.english}
								</div>
							)}
						</div>
					)}

					<p style={{ marginTop: 8 }}>
						Question {index + 1} of {cards.length}
					</p>

					<div style={{ marginTop: 16 }}>
						<Link to="/quiz" className="link">Back to Quiz Selection</Link>
					</div>
				</>
			) : (
				<>
					<p>Quiz complete.</p>
					<div style={{ display: 'flex', gap: 8 }}>
						<Link to="/quiz" className="btn btn-green">Try Another Quiz</Link>
						<Link to={`/study/${category}`} className="btn btn-orange">Study This Category</Link>
					</div>
				</>
			)}
		</div>
	);
}


