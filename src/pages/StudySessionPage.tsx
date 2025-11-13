import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Flashcard from '../components/Flashcard';
import { flashcards, Flashcard as FlashcardType } from '../data/flashcards';
import { useWrongCards } from '../state/WrongCardsContext';
import { useStats } from '../state/StatsContext';

export default function StudySessionPage(): JSX.Element {
	const params = useParams();
	const category = (params.category ?? '') as FlashcardType['category'] | '';
	const navigate = useNavigate();
	const wrongCtx = useWrongCards();
	const stats = useStats();

	const cards = React.useMemo(
		() => flashcards.filter(c => c.category === category),
		[category]
	);

	const [currentIndex, setCurrentIndex] = React.useState(0);
	const [isFlipped, setIsFlipped] = React.useState(false);
	const [wrongCards, setWrongCards] = React.useState<FlashcardType[]>([]);

	React.useEffect(() => {
		// Reset session when category changes
		setCurrentIndex(0);
		setIsFlipped(false);
		setWrongCards([]);
	}, [category]);

	if (!category || cards.length === 0) {
		return (
			<div>
				<h2>Study</h2>
				<p>No cards found for this category.</p>
				<Link to="/study" className="link">Back to Categories</Link>
			</div>
		);
	}

	const isDone = currentIndex >= cards.length;
	const current = cards[currentIndex];

	function goNext(): void {
		setCurrentIndex(i => i + 1);
		setIsFlipped(false);
	}

	function markRight(): void {
		stats.recordAnswer(category, true);
		goNext();
	}

	function markWrong(): void {
		setWrongCards(prev => [...prev, current]);
		stats.recordAnswer(category, false);
		goNext();
	}

	return (
		<div>
			<h2>Study — {category[0].toUpperCase() + category.slice(1)}</h2>
			{!isDone ? (
				<>
					<p>Click the card to flip between Spanish and English.</p>
					<div style={{ maxWidth: 420 }}>
						<Flashcard
							key={currentIndex}
							spanish={current.spanish}
							english={current.english}
							onFlipChange={setIsFlipped}
						/>
					</div>
					{isFlipped && (
						<div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
							<button className="btn btn-green" type="button" onClick={markRight}>
								✅ Right
							</button>
							<button className="btn btn-red" type="button" onClick={markWrong}>
								❌ Wrong
							</button>
						</div>
					)}
					<p style={{ marginTop: 8 }}>
						Card {currentIndex + 1} of {cards.length}
					</p>
					<div style={{ marginTop: 16 }}>
						<Link to="/study" className="link">Change Category</Link>
					</div>
				</>
			) : (
				<>
					<p>All cards reviewed.</p>
					<p>Marked wrong: {wrongCards.length}</p>
					<div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
						{wrongCards.length > 0 && (
							<button
								type="button"
								className="btn btn-green"
								onClick={() => {
									wrongCtx.setWrongCards(category, wrongCards);
									navigate(`/study/${category}/redo`);
								}}
							>
								Redo Wrong Cards
							</button>
						)}
						<button
							type="button"
							className="btn btn-red"
							onClick={() => {
								wrongCtx.resetWrongCards(category);
							}}
						>
							Reset Wrong List
						</button>
					</div>
					<div style={{ marginTop: 12 }}>
						<Link to="/study" className="btn btn-orange">Back to Categories</Link>
					</div>
				</>
			)}
		</div>
	);
}


