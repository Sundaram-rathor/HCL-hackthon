"use client";
import React from "react";

type Props = {
	title: string;
	description: string;
	tag?: string;
};

export default function HealthCard({ title, description, tag }: Props) {
	// simple avatar letter from title
	const avatar = title ? title.charAt(0).toUpperCase() : "H";

	return (
		<article
			className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1"
			role="article"
		>
			<div className="flex items-start gap-4">
				<div className="flex-none w-12 h-12 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
					{avatar}
				</div>

				<div className="flex-1 min-w-0">
					<h3 className="text-lg font-semibold text-gray-900 truncate">{title}</h3>
					<p className="mt-2 text-sm text-gray-600 max-h-16 overflow-hidden">
						{description}
					</p>

					<div className="mt-4 flex items-center justify-between">
						{tag ? (
							<span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-100">
								{tag}
							</span>
						) : (
							<span className="text-xs px-2 py-1 rounded-full bg-gray-50 text-gray-700 border border-gray-100">
								Health
							</span>
						)}

						<button
							type="button"
							className="text-sm text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-200 rounded"
							aria-label={`Read more about ${title}`}
						>
							Read more →
						</button>
					</div>
				</div>
			</div>
		</article>
	);
}
