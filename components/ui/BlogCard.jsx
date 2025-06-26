import Image from 'next/image';
import Link from 'next/link';

// Remove this if you're not using TypeScript:
// interface BlogCardProps { ... }

const BlogCard = ({ title, category, date, image, slug }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 bg-black text-white p-6 rounded-xl shadow-lg items-center">
      {/* Blog Image */}
      <div className="w-full md:w-[300px] h-[200px] relative rounded-xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>

      {/* Text Content */}
      <div className="flex-1 space-y-2">
        <span className="uppercase text-xs tracking-wider bg-gray-800 px-3 py-1 rounded-full text-white inline-block">
          {category}
        </span>
        <p className="text-sm text-gray-400">Posted on {date}</p>
        <h3 className="text-xl font-semibold">{title}</h3>

        <Link
  href={`/blog/${slug}`}
  className="inline-block mt-2 bg-lime-400 hover:bg-lime-500 text-black px-4 py-2 rounded-full text-sm transition-all"
>
  Read more →
</Link>

      </div>
    </div>
  );
};

export default BlogCard;
