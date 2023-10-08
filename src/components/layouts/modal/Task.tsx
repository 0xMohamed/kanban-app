export default function Task() {
	const tags = [
		{ title: 'design', color: 'purple' },
		{ title: 'research', color: 'orange' },
		{ title: 'content', color: 'cyan' },
		{ title: 'strategy', color: 'red' },
		{ title: 'planning', color: 'green' },
	];

	const selectedTag = 'strategy';

	return (
		<div>
			<div className='flex flex-col'>
				<h3>Tags</h3>
				<div className='flex gap-x-2'>
					{tags.map((tag) => {
						return (
							<span
								key={tag.title}
								style={{ backgroundColor: tag.color }}
								className={`cursor-pointer rounded px-1.5 py-1 text-xs capitalize ${
									selectedTag === tag.title ? 'outline outline-2 outline-black' : ''
								}`}
							>
								{tag.title}
							</span>
						);
					})}
				</div>
			</div>
		</div>
	);
}
