import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Flashcard from '../components/Flashcard';
import type { Flashcard as FlashcardType } from '../data/flashcards';
import { useWrongCards } from '../state/WrongCardsContext';

export default function RedoStudySessionPage(): JSX.Element {
	const params = useParams();
	const category = (params.category ?? '') as FlashcardType['category'] | '';
	const wrongCtx = useWrongCards();
	const cards = wrongCtx.getWrongCards(category);

	const [currentIndex, setCurrentIndex] = React.useState(0);
	const [isFlipped, setIsFlipped] = React.useState(false);

	React.useEffect(() => {
		setCurrentIndex(0);
		setIsFlipped(false);
	}, [category]);

	if (!category) {
		return (
			<div>
				<h2>Redo Study</h2>
				<p>Missing category.</p>
				<Link to="/study" className="link">Back to Categories</Link>
			</div>
		);
	}

	if (cards.length === 0) {
		return (
			<div>
				<h2>Redo Study — {category[0].toUpperCase() + category.slice(1)}</h2>
				<p>No wrong cards saved for redo.</p>
				<div style={{ display: 'flex', gap: 8 }}>
					<Link to={`/study/${category}`} className="btn btn-green">Start Study Again</Link>
					<Link to="/study" className="btn btn-orange">Choose Another Category</Link>
				</div>
			</div>
		);
	}

	const isDone = currentIndex >= cards.length;
	const current = cards[currentIndex];

	function goNext(): void {
		setCurrentIndex(i => i + 1);
		setIsFlipped(false);
	}

	return (
		<div>
			<h2>Redo Study — {category[0].toUpperCase() + category.slice(1)}</h2>
			{!isDone ? (
				<>
					<p>Review only the cards marked wrong in the previous session.</p>
					<div style={{ maxWidth: 420 }}>
						<Flashcard
							key={currentIndex}
							spanish={current.spanish}
							english={current.english}
							onFlipChange={setIsFlipped}
						/>
					</div>
					{isFlipped && (
						<div style={{ marginTop: 12 }}>
							<button className="btn btn-green" type="button" onClick={goNext}>
								Next
							</button>
						</div>
					)}
					<p style={{ marginTop: 8 }}>
						Card {currentIndex + 1} of {cards.length}
					</p>
					<div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
						<button className="btn btn-red" type="button" onClick={() => wrongCtx.resetWrongCards(category)}>
							Reset Wrong List
						</button>
						<Link to={`/study/${category}`} className="btn btn-orange">Back to Study</Link>
					</div>
				</>
			) : (
				<>
					<p>Redo complete.</p>
					<div style={{ display: 'flex', gap: 8 }}>
						<Link to={`/study/${category}`} className="btn btn-green">Start Study Again</Link>
						<Link to="/study" className="btn btn-orange">Choose Another Category</Link>
						<button className="btn btn-red" type="button" onClick={() => wrongCtx.resetWrongCards(category)}>
							Clear Wrong List
						</button>
					</div>
				</>
			)}
		</div>
	);
}


