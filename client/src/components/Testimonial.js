import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';



const Testimonial = () => {

    //fake data............
    const feedbackData = [
        {
            _id: "1",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            name: "Ayesha Rahman",
            designation: "Software Engineer",
            comment: "Great experience! The team was professional and cared about our needs.",
            rating: 4.5
        },
        {
            _id: "2",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            name: "Raihan Ahmed",
            designation: "UI/UX Designer",
            comment: "Very helpful and smooth process from start to finish. Highly recommend!",
            rating: 5
        },
        {
            _id: "3",
            image: "https://randomuser.me/api/portraits/women/68.jpg",
            name: "Nasima Jahan",
            designation: "Project Manager",
            comment: "Impressed with the professionalism and attention to detail. Will return again.",
            rating: 4
        },
        {
            _id: "4",
            image: "https://randomuser.me/api/portraits/men/75.jpg",
            name: "Tanvir Hasan",
            designation: "Frontend Developer",
            comment: "Excellent service and timely response. I appreciate the dedication.",
            rating: 4.8
        },
        {
            _id: "5",
            image: "https://randomuser.me/api/portraits/women/55.jpg",
            name: "Sumaiya Islam",
            designation: "Digital Marketer",
            comment: "I felt valued and heard throughout the entire process. Thank you!",
            rating: 5
        },
        {
            _id: "6",
            image: "https://randomuser.me/api/portraits/women/56.jpg",
            name: "Rifa Tasnim",
            designation: "Full Stack Developer",
            comment: "Exhibited strong full-stack expertise with seamless and timely delivery.",
            rating: 5
        }
    ];

    return (
        <section className="">
            <div className="container mx-auto ">
                {/* Title & Short description.......... */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center">
                    What Our Clients Say!
                </h2>
                <p className="text-center text-base md:text-lg text-gray-300 mt-2 mb-12">
                    Insights from professionals who have partnered with us.
                </p>

                {/* Slider............. */}
                <Swiper
                    spaceBetween={30}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },

                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {feedbackData.map((feedback) => (
                        <SwiperSlide key={feedback._id}>
                            <div className="p-4 md:p-5 flex flex-col items-center bg-white/5 backdrop-blur-md rounded-xl shadow-lg transform hover:scale-x-105 transition duration-300 ">
                                <img
                                    src={feedback.image}
                                    alt={feedback.name}
                                    className="w-24 h-24 rounded-full border-2 border-cyan-800 object-cover mb-2"
                                />
                                <h3 className="text-lg text-white font-semibold mb-1">{feedback.name}</h3>
                                <p className="text-sm text-gray-400 mb-5">{feedback.designation}</p>
                                <div className="mb-2">
                                    <Rating style={{ maxWidth: 120 }} value={feedback.rating} readOnly />
                                </div>
                                <p className="text-gray-100 text-center text-xs min-h-12 flex flex-grow">{feedback.comment}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </section>
    );
};

export default Testimonial;