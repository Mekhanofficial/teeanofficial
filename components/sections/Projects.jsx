import Image from 'next/image';
import Link from 'next/link';

const Projects = () => {
  const items = [
    { label: 'Creative Writer', imagePath: '/images/pro3.jpg', link: '/blog' },
    { label: 'Radio Host', imagePath: '/images/pro1.jpg' },
    { label: 'Media Personality', imagePath: '/images/pro2.jpg' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
      {items.map((item, index) => {
        const content = (
          <div
            key={index}
            className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.02] bg-white"
          >
            {/* Image with consistent height and zoom effect */}
            <div className="relative h-[300px] w-full overflow-hidden">
              <Image
                src={item.imagePath}
                alt={item.label}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300" />

            {/* Label Badge */}
            <div className="absolute top-4 left-4 bg-white text-black px-4 py-1 text-sm font-semibold rounded-full shadow-md">
              {item.label}
            </div>

            {/* Optional hover text or icon */}
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition duration-300 text-white text-xs font-medium">
              Explore Project →
            </div>
          </div>
        );

        return item.link ? (
          <Link key={index} href={item.link}>
            {content}
          </Link>
        ) : (
          content
        );
      })}
    </div>
  );
};

export default Projects;
