import { Mail, Instagram, MessageCircle, ArrowRight, github,Linkdin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <main className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-6 py-20">

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-[120px]" />
      </div>


      <section className="relative max-w-5xl w-full">

        {/* Heading */}
        <div className="text-center mb-12">

          <h1 className="text-5xl md:text-6xl font-bold">
            Contact Our
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Support Team
            </span>
          </h1>

          <p className="mt-5 text-gray-400 text-lg max-w-2xl mx-auto">
            Have questions, suggestions, or technical issues?
            Our team is ready to help you improve your AI learning experience.
          </p>

        </div>
        {/* Vision Section */}
<div className="mb-16 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12">

  <div className="max-w-4xl mx-auto text-center">

    <h2 className="text-3xl md:text-4xl font-bold mb-6">
      Our Vision
    </h2>

    <p className="text-gray-300 leading-8 text-lg">
      Students often spend too much time switching between AI tools like
      <span className="text-blue-400 font-semibold"> Gemini </span>
      and
      <span className="text-green-400 font-semibold"> ChatGPT </span>
      to generate multiple-choice questions from their notes. This process is
      repetitive, time-consuming, and interrupts the learning experience.
    </p>

    <p className="text-gray-300 leading-8 text-lg mt-6">
      We built the <span className="font-semibold text-white">AI MCQ Generator</span>
      to solve this problem. Instead of copying content between different AI
      platforms, students can upload their learning materials and instantly
      generate high-quality MCQs with answers and explanations in one place.
    </p>

    <p className="text-gray-300 leading-8 text-lg mt-6">
      Our mission is to make exam preparation faster, smarter, and more
      efficient by combining Artificial Intelligence with a simple,
      student-friendly platform that saves time and improves learning.
    </p>

  </div>

</div>


        {/* Contact Card */}
        <div className="grid md:grid-cols-3 gap-6">
            


          {/* Instagram */}
          <a
            href="https://www.instagram.com/kdsingh9140"
            target="_blank"
            rel="noreferrer"
            className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-pink-500/50 transition"
          >

            <Instagram
              className="text-pink-400 mb-5 group-hover:scale-110 transition"
              size={40}
            />

            <h2 className="text-xl font-semibold">
              Instagram
            </h2>

            <p className="text-gray-400 mt-3">
              Follow us for updates and announcements.
            </p>

            <div className="flex items-center gap-2 text-pink-400 mt-5">
              Visit Profile
              <ArrowRight size={18}/>
            </div>

          </a>


{/* Email */}
<a
  href="mailto:supportmcqs@gmail.com"
  className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-blue-500/50 transition"
>
  <Mail
    className="text-blue-400 mb-5 group-hover:scale-110 transition"
    size={40}
  />

  <h2 className="text-xl font-semibold">
    Email Support
  </h2>

  <p className="text-gray-400 mt-3">
    Need technical assistance or have questions? Our support team is here to help.
  </p>

  <div className="flex items-center gap-2 text-blue-400 mt-5 font-medium">
    supportmcqs@gmail.com
    <ArrowRight size={18} />
  </div>
</a>


         {/* Community */}
<a
  href="https://chat.whatsapp.com/GqywH4gM6XJCO5hjSRyJDN"
  target="_blank"
  rel="noreferrer"
  className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-green-500/50 transition"
>
  <MessageCircle
    className="text-green-400 mb-5 group-hover:scale-110 transition"
    size={40}
  />

  <h2 className="text-xl font-semibold">
    WhatsApp Community
  </h2>

  <p className="text-gray-400 mt-3">
    Join our community to share feedback, ask questions, receive updates, and
    connect with other AI MCQ Generator users.
  </p>

  <div className="flex items-center gap-2 text-green-400 mt-5 font-medium">
    Join Community
    <ArrowRight size={18} />
  </div>
</a>


        </div>


        {/* Back Home Button */}
        <div className="text-center mt-12">

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-semibold hover:opacity-90 transition"
          >
            Back To Home
            <ArrowRight size={20}/>
          </Link>

        </div>


      </section>

    </main>
  );
}