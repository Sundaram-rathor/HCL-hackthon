"use client";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4 py-12">
			<main className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 md:p-12">
				<header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
					

					
				</header>

				<section className=" grid gap-8  items-center ">
					<div>
						<h2 className="text-2xl md:text-3xl font-bold text-gray-900">Get started</h2>
						<p className="mt-3 text-gray-600">
							Select whether you are logging in as a patient or a doctor. Each role will open the
							login flow tailored to that user type.
						</p>

						<div className="mt-6 grid gap-3 sm:grid-cols-2">
							<Link
								href="/auth/patient/login"
								className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium shadow hover:scale-[1.01] transition"
							>
								<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
									<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
									<path d="M4 20v-1a4 4 0 014-4h8a4 4 0 014 4v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
								</svg>
								<span>Login as Patient</span>
							</Link>

							<Link
								href="/auth/doctor/login"
								className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow hover:scale-[1.01] transition"
							>
								<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
									<path d="M12 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
									<path d="M6 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
									<path d="M4 20h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
								</svg>
								<span>Login as Doctor</span>
							</Link>
						</div>

						<p className="mt-4 text-sm text-gray-500">
							If you already have an account use the sign in link above. New users can create an account.
						</p>
					</div>

					
				</section>

				
			</main>
		</div>
	);
}
