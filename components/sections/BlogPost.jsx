import BlogCard from '@/components/ui/BlogCard';

const blogPosts = [
  {
    title: 'Create a Landing Page That Performs Great',
    category: 'Help',
    date: 'Aug 25',
    image: '/images/pro1.jpg',
    slug: 'landing-page-performance',
  },
  {
    title: 'Starting and Growing a Career in Web Design',
    category: 'Branding',
    date: 'Aug 25',
    image: '/images/pro2.jpg',
    slug: 'career-in-web-design',
  },
  {
    title: 'How Can Designers Prepare for the Future?',
    category: 'Design',
    date: 'Aug 25',
    image: '/images/pro3.jpg',
    slug: 'designers-future-prep',
  },
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-black py-12 px-4 md:px-12 space-y-10">
      {blogPosts.map((post, idx) => (
        <BlogCard key={idx} {...post} />
      ))}
    </div>
  );
};

export default BlogPage;
