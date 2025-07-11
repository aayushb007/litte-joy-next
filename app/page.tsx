"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Search, ShoppingBag, Star, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const { state, dispatch } = useCart()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const featuredProducts = [
    {
      id: 1,
      name: "Organic Cotton Onesie Set",
      price: 45,
      originalPrice: 60,
      image: "/images/baby-onesie-set.png",
      category: "clothing",
      rating: 4.8,
      isNew: true,
    },
    {
      id: 2,
      name: "Wooden Stacking Rings",
      price: 28,
      image: "/images/wooden-stacking-rings.png",
      category: "toys",
      rating: 4.9,
      isNew: false,
    },
    {
      id: 3,
      name: "Bamboo Fiber Sleep Set",
      price: 52,
      originalPrice: 68,
      image: "/images/bamboo-sleep-set.png",
      category: "clothing",
      rating: 4.7,
      isNew: true,
    },
    {
      id: 4,
      name: "Sensory Play Blocks",
      price: 35,
      image: "/images/sensory-blocks.png",
      category: "toys",
      rating: 4.6,
      isNew: false,
    },
  ]

  const addToCart = (product: any) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
      },
    })
    dispatch({ type: "OPEN_CART" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-x-hidden transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-pink-100 dark:border-gray-700 transition-all duration-300">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="group-hover:translate-x-1 transition-transform duration-300">
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Little Joy
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1 hidden sm:block">Baby Care</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {[
                { href: "/clothing", label: "Clothing" },
                { href: "/toys", label: "Toys" },
                { href: "/about", label: "About" },
              ].map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 font-medium group text-sm xl:text-base"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>

            {/* Search, Theme Toggle and Cart */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Desktop Search */}
              <div className="hidden md:flex items-center">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4 group-focus-within:text-pink-500 transition-colors duration-200" />
                  <Input
                    placeholder="Search products..."
                    className="pl-10 w-48 lg:w-56 xl:w-64 border-pink-200 dark:border-gray-600 focus:border-pink-400 dark:focus:border-pink-400 focus:ring-pink-200 dark:focus:ring-pink-400 focus:ring-2 transition-all duration-300 hover:shadow-md text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>

              {/* Mobile Search Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-pink-50 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 w-8 h-8 sm:w-10 sm:h-10"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-pink-50 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 group w-8 h-8 sm:w-10 sm:h-10"
                onClick={() => dispatch({ type: "TOGGLE_CART" })}
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-200" />
                {state.totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center p-0 bg-pink-500 hover:bg-pink-600 animate-bounce shadow-lg text-xs">
                    {state.totalItems}
                  </Badge>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-pink-50 dark:hover:bg-gray-800 transition-all duration-300 w-8 h-8 sm:w-10 sm:h-10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="relative w-4 h-4 sm:w-5 sm:h-5">
                  <span
                    className={`absolute block h-0.5 w-4 sm:w-5 bg-gray-600 dark:bg-gray-300 transform transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"}`}
                  />
                  <span
                    className={`absolute block h-0.5 w-4 sm:w-5 bg-gray-600 dark:bg-gray-300 transform transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
                  />
                  <span
                    className={`absolute block h-0.5 w-4 sm:w-5 bg-gray-600 dark:bg-gray-300 transform transition-all duration-300 ${isMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"}`}
                  />
                </div>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-500 ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="py-4 border-t border-pink-100 dark:border-gray-700">
              <nav className="flex flex-col space-y-3">
                {[
                  { href: "/clothing", label: "Clothing" },
                  { href: "/toys", label: "Toys" },
                  { href: "#", label: "Collections" },
                  { href: "/about", label: "About" },
                ].map((item, index) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 font-medium hover:translate-x-2 hover:bg-pink-50 dark:hover:bg-gray-800 p-3 rounded-lg text-base"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              {/* Mobile Search */}
              <div className="mt-4 md:hidden">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                  <Input
                    placeholder="Search products..."
                    className="pl-10 w-full border-pink-200 dark:border-gray-600 focus:border-pink-400 dark:focus:border-pink-400 focus:ring-pink-200 dark:focus:ring-pink-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-pink-200/30 to-purple-200/30 dark:from-pink-500/20 dark:to-purple-500/20 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-blue-200/30 to-pink-200/30 dark:from-blue-500/20 dark:to-pink-500/20 rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-12 sm:py-16 md:py-20 lg:py-24 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div
              className={`space-y-6 sm:space-y-8 text-center lg:text-left transform transition-all duration-1000 ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
            >
              <div className="space-y-4">
                <Badge className="bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 hover:bg-pink-200 dark:hover:bg-pink-900/70 border-pink-200 dark:border-pink-700 animate-in slide-in-from-left duration-700 hover:scale-105 transition-transform inline-flex items-center text-xs sm:text-sm">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Premium Baby Care Collection
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient bg-300% animate-pulse">
                    Little Joys,
                  </span>
                  <br />
                  <span className="text-gray-800 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300">
                    Big Smiles
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto lg:mx-0 leading-relaxed">
                  Discover our curated collection of premium organic clothing and educational toys, designed with love
                  for your little one's comfort and development.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 group w-full sm:w-auto"
                >
                  Shop Collection
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-pink-300 dark:border-pink-600 text-pink-700 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all duration-300 bg-transparent hover:scale-105 hover:shadow-lg group w-full sm:w-auto"
                >
                  View Lookbook
                  <Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform duration-300" />
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8 pt-4">
                {[
                  { number: "10K+", label: "Happy Parents" },
                  { number: "4.9★", label: "Customer Rating" },
                  { number: "100%", label: "Organic Materials" },
                ].map((stat, index) => (
                  <div
                    key={stat.label}
                    className="text-center group hover:scale-110 transition-transform duration-300 cursor-default"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`relative transform transition-all duration-1000 delay-300 ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
            >
              <div className="relative group max-w-md mx-auto lg:max-w-none">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-purple-200 dark:from-pink-500/30 dark:to-purple-500/30 rounded-3xl transform rotate-6 scale-105 group-hover:rotate-12 transition-transform duration-500"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl hover:shadow-3xl transition-shadow duration-500 group-hover:scale-105 transform">
                  <Image
                    src="/images/happy-baby-hero.png"
                    alt="Happy baby in organic clothing"
                    width={500}
                    height={500}
                    className="rounded-2xl object-cover group-hover:scale-105 transition-transform duration-500 w-full h-auto"
                  />
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-pink-400 rounded-full p-2 sm:p-3 animate-bounce delay-1000 hover:scale-125 transition-transform duration-900 cursor-pointer shadow-lg">
                <Star className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-purple-400 rounded-full p-2 sm:p-3 animate-bounce delay-1500 hover:scale-125 transition-transform duration-800 cursor-pointer shadow-lg">
                <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              {/* <div className="absolute top-1/2 -left-4 sm:-left-8 bg-green-400 rounded-full p-1.5 sm:p-2 animate-pulse delay-2000 hover:scale-125 transition-transform duration-300 cursor-pointer shadow-lg">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300">
              Featured Products
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
              Handpicked essentials that combine comfort, safety, and style for your precious little one
            </p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 animate-in fade-in duration-700 cursor-pointer border border-gray-100 dark:border-gray-700"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  {product.isNew && (
                    <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 bg-green-500 hover:bg-green-600 text-white animate-pulse shadow-lg text-xs">
                      New
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 group/heart w-8 h-8 sm:w-10 sm:h-10"
                  >
                    <Heart className="w-3 h-3 sm:w-4 sm:h-4 group-hover/heart:text-red-500 group-hover/heart:fill-red-500 transition-all duration-300" />
                  </Button>

                  <div className="relative overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-125 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant="secondary"
                      className="text-xs capitalize hover:scale-105 transition-transform duration-200 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    >
                      {product.category}
                    </Badge>
                    <div className="flex items-center space-x-1 group/rating">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400 group-hover/rating:scale-125 transition-transform duration-200" />
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 group-hover/rating:text-yellow-600 dark:group-hover/rating:text-yellow-400 transition-colors duration-200">
                        {product.rating}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300 line-clamp-2 text-sm sm:text-base">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    <Button
                      size="sm"
                      onClick={() => addToCart(product)}
                      className="bg-pink-500 hover:bg-pink-600 text-white transform hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg group/btn text-xs sm:text-sm px-3 sm:px-4"
                    >
                      <span className="group-hover/btn:scale-110 transition-transform duration-200">Add</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-pink-300 dark:border-pink-600 text-pink-700 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all duration-300 bg-transparent hover:scale-105 hover:shadow-lg group w-full sm:w-auto"
            >
              View All Products
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
              Everything your baby needs, organized just for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 group-hover:text-pink-700 dark:group-hover:text-pink-300 transition-colors duration-300">
                  Premium Clothing
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300 text-sm sm:text-base">
                  Organic cotton onesies, sleepwear, and everyday essentials
                </p>
                <Button
                  className="bg-pink-500 hover:bg-pink-600 text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl group/btn w-full sm:w-auto"
                  asChild
                >
                  <Link href="/clothing">
                    Shop Clothing
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>
              <div className="absolute -right-4 sm:-right-8 -bottom-4 sm:-bottom-8 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-pink-300 dark:bg-pink-600/50 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-100 to-purple-200 dark:from-blue-900/30 dark:to-purple-800/30 p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">
                  Educational Toys
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300 text-sm sm:text-base">
                  Safe, engaging toys that promote learning and development
                </p>
                <Button
                  className="bg-purple-500 hover:bg-purple-600 text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl group/btn w-full sm:w-auto"
                  asChild
                >
                  <Link href="/toys">
                    Shop Toys
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>
              <div className="absolute -right-4 sm:-right-8 -bottom-4 sm:-bottom-8 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-purple-300 dark:bg-purple-600/50 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-600 dark:to-purple-700 rounded-3xl p-6 sm:p-8 md:p-12 text-center text-white relative overflow-hidden group hover:shadow-2xl transition-shadow duration-500">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-5 sm:top-10 left-5 sm:left-10 w-12 sm:w-20 h-12 sm:h-20 bg-white rounded-full animate-pulse"></div>
              <div className="absolute bottom-5 sm:bottom-10 right-5 sm:right-10 w-8 sm:w-16 h-8 sm:h-16 bg-white rounded-full animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/4 w-6 sm:w-12 h-6 sm:h-12 bg-white rounded-full animate-bounce delay-500"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 group-hover:scale-105 transition-transform duration-300">
                Stay Updated with Little Joy
              </h2>
              <p className="text-pink-100 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
                Get exclusive access to new arrivals, parenting tips, and special offers delivered to your inbox
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  placeholder="Enter your email"
                  className="bg-white/20 border-white/30 text-white placeholder:text-pink-200 focus:bg-white/30 focus:border-white/50 transition-all duration-300 hover:bg-white/25 flex-1"
                />
                <Button className="bg-white text-pink-600 hover:bg-pink-50 font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-8 sm:py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"></div>
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="group sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4 group-hover:scale-105 transition-transform duration-300">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Little Joy</h3>
                  <p className="text-xs text-gray-400">Baby Care</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                Premium baby care products designed with love and crafted for comfort.
              </p>
            </div>

            {[
              {
                title: "Shop",
                links: ["Clothing", "Toys", "Collections", "Sale"],
              },
              {
                title: "Support",
                links: ["Contact Us", "Size Guide", "Returns", "FAQ"],
              },
              {
                title: "Company",
                links: ["About Us", "Sustainability", "Privacy Policy", "Terms of Service"],
              },
            ].map((section, index) => (
              <div key={section.title} className="group">
                <h4 className="font-semibold mb-4 group-hover:text-pink-400 transition-colors duration-300 text-sm sm:text-base">
                  {section.title}
                </h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block text-xs sm:text-sm"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 dark:border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-400">
            <p className="hover:text-gray-300 transition-colors duration-300">
              &copy; 2024 Little Joy Baby Care. All rights reserved. Made with ❤️ for little ones.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
