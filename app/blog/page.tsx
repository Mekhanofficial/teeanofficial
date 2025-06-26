import BlogCard from '@/components/ui/BlogCard';
import Layout from '@/components/layout/Layout';

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
    <Layout>
      <div className="min-h-screen bg-black pt-24 pb-12 px-4 md:px-12 space-y-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
          Blog Posts
        </h1>
        <div className="max-w-4xl mx-auto">
          {blogPosts.map((post, idx) => (
            <BlogCard key={idx} {...post} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;