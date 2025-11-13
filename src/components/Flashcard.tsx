import React from 'react';

type FlashcardProps = {
	spanish: string;
	english: string;
	onFlipChange?: (flipped: boolean) => void;
};

export default function Flashcard(props: FlashcardProps): JSX.Element {
	const { spanish, english, onFlipChange } = props;
	const [flipped, setFlipped] = React.useState(false);

	function handleToggle(): void {
		setFlipped(prev => {
			const next = !prev;
			onFlipChange?.(next);
			return next;
		});
	}

	return (
		<div className="flashcard" onClick={handleToggle} role="button" aria-pressed={flipped}>
			<div className={`card-inner${flipped ? ' is-flipped' : ''}`}>
				<div className="card-face card-front">
					<span className="card-text">{spanish}</span>
				</div>
				<div className="card-face card-back">
					<span className="card-text">{english}</span>
				</div>
			</div>
		</div>
	);
}


