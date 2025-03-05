import { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Company() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out',
        });
    }, []);

    const teamMembers = [
        { 
            name: "John Doe", 
            role: "CEO", 
            image: "/images/team1.jpg" 
        },
        { 
            name: "Jane Smith", 
            role: "CTO", 
            image: "/images/team2.jpg" 
        },
        { 
            name: "Alex Johnson", 
            role: "HR Manager", 
            image: "/images/team3.jpg" 
        }
    ];

    const testimonials = [
        {
            quote: "JobLink helped me find a job that suits my abilities!",
            author: "Sarah"
        },
        {
            quote: "Great platform for inclusive job opportunities!",
            author: "Michael"
        }
    ];

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Hero Section */}
                <section 
                    className="relative bg-gradient-to-br from-[#22243b] to-[#2c3049] text-white overflow-hidden"
                    data-aos="fade-up"
                >
                    <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6 text-center md:text-left z-10">
                            <div className="flex items-center justify-center md:justify-start space-x-3">
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                                    JobLink
                                </h1>
                            </div>
                            <p className="text-xl md:text-2xl text-gray-300 max-w-xl mx-auto md:mx-0">
                                Connecting people with opportunities for a better future.
                            </p>
                            <div className="flex justify-center md:justify-start space-x-4">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                                    Find Jobs
                                </button>
                                <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                                    Post a Job
                                </button>
                            </div>
                        </div>
                        
                        <div className="hidden md:flex justify-center items-center relative">
                            <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-3xl -top-12 right-0"></div>
                            <img 
                                src="/src/assets/6.png" 
                                alt="JobLink Illustration" 
                                className="relative z-10 max-w-full h-auto transform hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>
                </section>
                
                {/* About Us */}
                <section 
                    className="mt-16 text-center"
                    data-aos="fade-up"
                >
                    <h2 className="text-3xl font-bold">About Us</h2>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        JobLink is dedicated to helping individuals, including those with disabilities, find meaningful employment through innovative and inclusive job matching.
                    </p>
                </section>
                
                {/* Our Team */}
                <section 
                    className="mt-16"
                    data-aos="fade-up"
                >
                    <h2 className="text-3xl font-bold text-center">Meet Our Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                        {teamMembers.map((member, index) => (
                            <div 
                                key={member.name} 
                                className="bg-white p-6 rounded-lg shadow-md text-center transition-all hover:shadow-xl"
                                data-aos="zoom-in"
                                data-aos-delay={index * 100}
                            >
                                <img 
                                    src={member.image} 
                                    alt={member.name} 
                                    className="mx-auto w-24 h-24 rounded-full object-cover" 
                                />
                                <h3 className="mt-4 font-semibold">{member.name}</h3>
                                <p className="text-sm text-gray-500">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Careers */}
                <section 
                    className="mt-16 text-center bg-blue-50 py-16 rounded-lg"
                    data-aos="fade-up"
                >
                    <h2 className="text-3xl font-bold text-blue-900">Join Our Team</h2>
                    <p className="mt-4 text-gray-700 max-w-xl mx-auto">
                        Explore exciting job opportunities and build your future with us. We're committed to creating an inclusive workplace.
                    </p>
                    <button className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                        See Open Positions
                    </button>
                </section>
                
                {/* Testimonials */}
                <section 
                    className="mt-16"
                    data-aos="fade-up"
                >
                    <h2 className="text-3xl font-bold text-center">What People Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {testimonials.map((testimonial, index) => (
                            <div 
                                key={testimonial.author} 
                                className="bg-white p-6 rounded-lg shadow-md"
                                data-aos="flip-left"
                                data-aos-delay={index * 100}
                            >
                                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                                <h4 className="mt-4 font-semibold text-right">- {testimonial.author}</h4>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Contact Us */}
                <section 
                    className="mt-16 text-center bg-gradient-to-br from-blue-100 to-blue-200 p-10 rounded-lg"
                    data-aos="zoom-in"
                >
                    <h2 className="text-3xl font-bold text-blue-900">Get in Touch</h2>
                    <p className="mt-4 text-gray-700">Have questions? We're here to help!</p>
                    <div className="mt-6 space-y-2">
                        <p className="text-gray-800 font-semibold">Email: support@joblink.com</p>
                        <p className="text-gray-800 font-semibold">Phone: +62 812-3456-7890</p>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}