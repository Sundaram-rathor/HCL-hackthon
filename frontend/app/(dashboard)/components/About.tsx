"use client";

const About: React.FC = () => {
  return (
    <section className="w-full max-w-4xl" id="memorial">
      {/* Heading */}
      <h1 className="text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-blue-950 text-3xl md:text-5xl font-serif mb-8">
        About Doctor
      </h1>

      {/* Paragraphs */}
      <div className="space-y-6 text-base leading-relaxed text-gray-800">
        <p>
          Sachin, Sundaram, Nitin Tiwari and yash goyal are Team Member of Soul.
        </p>
      </div>
    </section>
  );
};

export default About;
