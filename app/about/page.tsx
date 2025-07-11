"use client"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Award, Leaf, Shield, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/contexts/cart-context"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"

export default function AboutPage() {
  const { state, dispatch } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "/images/team-sarah.png",
      bio: "Mother of two, passionate about creating safe, beautiful products for babies",
    },
    {
      name: "Michael Chen",
      role: "Head of Design",
      image: "/images/team-michael.png",
      bio: "Award-winning designer specializing in child-safe product development",
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Child Development Advisor",
      image: "/images/team-emily.png",
      bio: "Pediatric specialist ensuring all products support healthy development",
    },
  ]

  const values = [
    {
      icon: <Leaf className="w-8 h-8 text-green-600 dark:text-green-400" />,
      title: "Sustainability",
      description: "We use only organic, eco-friendly materials that are safe for babies and kind to the planet.",
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: "Safety First",
      description: "Every product undergoes rigorous testing to meet and exceed international safety standards.",
    },
    {
      icon: <Heart className="w-8 h-8 text-pink-600 dark:text-pink-400" />,
      title: "Made with Love",
      description: "Each item is crafted with care, attention to detail, and genuine love for little ones.",
    },
    {
      icon: <Award className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
      title: "Quality Excellence",
      description: "We never compromise on quality, ensuring products that last and bring joy for years.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-pink-100 dark:border-gray-700 transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Little Joy
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Baby Care</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/clothing"
                className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-200 font-medium"
              >
                Clothing
              </Link>
              <Link
                href="/toys"
                className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-200 font-medium"
              >
                Toys
              </Link>
              <Link
                href="/about"
                className="text-pink-600 dark:text-pink-400 font-semibold border-b-2 border-pink-600 dark:border-pink-400 pb-1"
              >
                About
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-pink-50 dark:hover:bg-gray-800 transition-colors duration-200"
                onClick={() => dispatch({ type: "TOGGLE_CART" })}
              >
                <ShoppingBag className="w-5 h-5" />
                {state.totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 bg-pink-500 hover:bg-pink-600">
                    {state.totalItems}
                  </Badge>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-pink-50 dark:hover:bg-gray-800 transition-all duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="relative w-5 h-5">
                  <span
                    className={`absolute block h-0.5 w-5 bg-gray-600 dark:bg-gray-300 transform transition-all duration-300 ${
                      isMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"
                    }`}
                  />
                  <span
                    className={`absolute block h-0.5 w-5 bg-gray-600 dark:bg-gray-300 transform transition-all duration-300 ${
                      isMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute block h-0.5 w-5 bg-gray-600 dark:bg-gray-300 transform transition-all duration-300 ${
                      isMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"
                    }`}
                  />
                </div>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ${
              isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="py-4 border-t border-pink-100 dark:border-gray-700">
              <nav className="flex flex-col space-y-3">
                <Link
                  href="/clothing"
                  className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 font-medium hover:translate-x-2 hover:bg-pink-50 dark:hover:bg-gray-800 p-3 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Clothing
                </Link>
                <Link
                  href="/toys"
                  className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 font-medium hover:translate-x-2 hover:bg-pink-50 dark:hover:bg-gray-800 p-3 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Toys
                </Link>
                <Link
                  href="/about"
                  className="text-pink-600 dark:text-pink-400 font-semibold hover:translate-x-2 hover:bg-pink-50 dark:hover:bg-gray-800 p-3 rounded-lg transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in slide-in-from-left duration-700">
              <div className="space-y-4">
                <Badge className="bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 hover:bg-pink-200 dark:hover:bg-pink-900/70 border-pink-200 dark:border-pink-700">
                  ✨ Our Story
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Creating Joy,
                  </span>
                  <br />
                  <span className="text-gray-800 dark:text-gray-100">One Baby at a Time</span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Little Joy Baby Care was born from a simple belief: every baby deserves the softest, safest, and most
                  beautiful products to accompany their precious early moments. As parents ourselves, we understand the
                  importance of quality, safety, and sustainability.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Founded in 2020 by a team of passionate parents and child development experts, we've made it our
                  mission to curate and create products that not only meet the highest standards of safety and quality
                  but also bring joy to both babies and their families.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Every product in our collection is carefully selected or designed with love, tested rigorously for
                  safety, and made from the finest organic and sustainable materials available.
                </p>
              </div>
            </div>

            <div className="relative animate-in slide-in-from-right duration-700 delay-200">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-purple-200 dark:from-pink-500/30 dark:to-purple-500/30 rounded-3xl transform rotate-6 scale-105"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700">
                  <Image
                    src="/images/little-joy-story.png"
                    alt="Little Joy Baby Care story"
                    width={500}
                    height={500}
                    className="rounded-2xl object-cover"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Our Values</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              These core principles guide everything we do, from product selection to customer service
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in duration-700 border border-gray-100 dark:border-gray-600"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md border border-gray-100 dark:border-gray-600">
                  {value.icon}
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">{value.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The passionate people behind Little Joy, dedicated to creating the best for your little ones
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className="text-center bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in duration-700 border border-gray-100 dark:border-gray-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="rounded-full object-cover w-full h-full"
                    unoptimized
                  />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-lg mb-2">{member.name}</h3>
                <p className="text-pink-600 dark:text-pink-400 font-medium mb-4">{member.role}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-600 dark:to-purple-700">
        <div className="container mx-auto px-4">
          <div className="text-center text-white mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-pink-100 dark:text-pink-200 max-w-2xl mx-auto">
              Numbers that reflect our commitment to quality and customer satisfaction
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div className="animate-in fade-in duration-700">
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-pink-100 dark:text-pink-200">Happy Families</div>
            </div>
            <div className="animate-in fade-in duration-700 delay-100">
              <div className="text-4xl font-bold mb-2">4.9★</div>
              <div className="text-pink-100 dark:text-pink-200">Average Rating</div>
            </div>
            <div className="animate-in fade-in duration-700 delay-200">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-pink-100 dark:text-pink-200">Organic Materials</div>
            </div>
            <div className="animate-in fade-in duration-700 delay-300">
              <div className="text-4xl font-bold mb-2">3</div>
              <div className="text-pink-100 dark:text-pink-200">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Get in Touch</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Email Us</h3>
                  <p className="text-gray-600 dark:text-gray-300">hello@littlejoybaby.com</p>
                  <p className="text-gray-600 dark:text-gray-300">support@littlejoybaby.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Call Us</h3>
                  <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Mon-Fri 9AM-6PM EST</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Visit Us</h3>
                  <p className="text-gray-600 dark:text-gray-300">123 Baby Care Lane</p>
                  <p className="text-gray-600 dark:text-gray-300">San Francisco, CA 94102</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Name"
                    className="border-gray-300 dark:border-gray-600 focus:border-pink-400 dark:focus:border-pink-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                  <Input
                    placeholder="Your Email"
                    type="email"
                    className="border-gray-300 dark:border-gray-600 focus:border-pink-400 dark:focus:border-pink-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <Input
                  placeholder="Subject"
                  className="border-gray-300 dark:border-gray-600 focus:border-pink-400 dark:focus:border-pink-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <Textarea
                  placeholder="Your Message"
                  rows={4}
                  className="border-gray-300 dark:border-gray-600 focus:border-pink-400 dark:focus:border-pink-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
