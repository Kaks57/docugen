
import React from "react";

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  image?: string;
}

const Testimonial = ({ content, author, role, image }: TestimonialProps) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
          {image ? (
            <img src={image} alt={author} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold">
              {author.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h4 className="font-medium">{author}</h4>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </div>
      <p className="text-gray-600 italic">"{content}"</p>
    </div>
  );
};

export default Testimonial;
