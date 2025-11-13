import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { flashcards, Flashcard as FlashcardType } from '../data/flashcards';
import { useStats } from '../state/StatsContext';

type McCard = FlashcardType & { quiz: { type: 'multiple-choice'; options: string[] } };

export default function MultipleChoiceQuizPage(): JSX.Element {
	const params = useParams();
	const category = (params.category ?? '') as FlashcardType['category'] | '';
	const stats = useStats();

	const cards: McCard[] = React.useMemo(
		() =>
			flashcards.filter(
				(c): c is McCard => c.category === category && c.quiz.type === 'multiple-choice'
			),
		[category]
	);

	const [index, setIndex] = React.useState(0);
	const [selected, setSelected] = React.useState<string | null>(null);
	const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);

	React.useEffect(() => {
		setIndex(0);
		setSelected(null);
		setIsCorrect(null);
	}, [category]);

	if (!category) {
		return (
			<div>
				<h2>Quiz — Multiple Choice</h2>
				<p>Missing category.</p>
				<Link to="/quiz" className="link">Back to Quiz Selection</Link>
			</div>
		);
	}

	if (cards.length === 0) {
		return (
			<div>
				<h2>Quiz — Multiple Choice</h2>
				<p>No multiple choice questions available for this category.</p>
				<Link to="/quiz" className="link">Back to Quiz Selection</Link>
			</div>
		);
	}

	const isDone = index >= cards.length;
	const current = cards[index];

	function choose(option: string): void {
		if (selected !== null) return; // prevent changes after selection
		setSelected(option);
		const correct = option.toLowerCase().trim() === current.english.toLowerCase().trim();
		setIsCorrect(correct);
		stats.recordAnswer(category, correct);
	}

	function next(): void {
		setIndex(i => i + 1);
		setSelected(null);
		setIsCorrect(null);
	}

	return (
		<div>
			<h2>Quiz — Multiple Choice ({category[0].toUpperCase() + category.slice(1)})</h2>
			{!isDone ? (
				<>
					<p>Translate:</p>
					<div style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>{current.spanish}</div>

					<div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
						{current.quiz.options.map(opt => {
							const picked = selected === opt;
							const correct = opt.toLowerCase().trim() === current.english.toLowerCase().trim();
							const showFeedback = selected !== null;
							const className =
								showFeedback && picked
									? correct
										? 'btn btn-green'
										: 'btn btn-red'
									: 'btn';
							return (
								<button
									key={opt}
									type="button"
									className={className}
									onClick={() => choose(opt)}
									disabled={selected !== null}
								>
									{opt}
								</button>
							);
						})}
					</div>

					{selected !== null && (
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

					<div style={{ marginTop: 12 }}>
						{selected !== null && (
							<button className="btn btn-orange" type="button" onClick={next}>
								Next
							</button>
						)}
					</div>

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


