function Card({ title, points }) {
  return (
    <div className="w-full h-full flex gap-x-6 p-5 rounded-xl bg-white pointer-events-none">
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl ml-4 font-semibold mb-3">
          {title}
        </h1>

        <ul className="list-disc text-xl font-medium ml-6 space-y-1 text-[#7251B5]">
          {points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Card;
