"use client"

import { X, Plus, Minus, ShoppingBag, Trash2, Heart } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"

export function CartSidebar() {
  const { state, dispatch } = useCart()

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const closeCart = () => {
    dispatch({ type: "CLOSE_CART" })
  }

  if (!state.isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-300 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-sm sm:max-w-md bg-white dark:bg-gray-900 z-50 shadow-2xl animate-in slide-in-from-right duration-500 border-l border-gray-200 dark:border-gray-700">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-pink-100 dark:bg-pink-900/50 rounded-full">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600 dark:text-pink-400" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">Shopping Cart</h2>
                {state.totalItems > 0 && (
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {state.totalItems} item{state.totalItems !== 1 ? "s" : ""}
                  </p>
                )}
              </div>
              {state.totalItems > 0 && (
                <Badge className="bg-pink-500 hover:bg-pink-600 animate-pulse text-xs">{state.totalItems}</Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeCart}
              className="hover:bg-pink-100 dark:hover:bg-pink-900/50 hover:scale-110 transition-all duration-200 w-8 h-8 sm:w-10 sm:h-10"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
            {state.items.length === 0 ? (
              <div className="text-center py-8 sm:py-12 animate-in fade-in duration-500">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 dark:text-gray-600" />
                </div>
                <h3 className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
                  Add some beautiful items to get started!
                </p>
                <Button
                  onClick={closeCart}
                  className="bg-pink-500 hover:bg-pink-600 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {state.items.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-pink-50 dark:from-gray-800 dark:to-pink-900/20 rounded-xl hover:from-pink-50 hover:to-purple-50 dark:hover:from-pink-900/20 dark:hover:to-purple-900/20 transition-all duration-300 transform hover:scale-102 animate-in slide-in-from-right duration-300 border border-gray-100 dark:border-gray-700"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 group">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="rounded-lg object-cover w-full h-full group-hover:scale-110 transition-transform duration-300 shadow-md"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-800 dark:text-gray-100 truncate hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-200 text-sm sm:text-base">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 capitalize">{item.category}</p>
                      {(item.size || item.color) && (
                        <div className="flex items-center space-x-1 sm:space-x-2 mt-1">
                          {item.size && (
                            <Badge
                              variant="outline"
                              className="text-xs hover:scale-105 transition-transform duration-200 border-gray-300 dark:border-gray-600"
                            >
                              {item.size}
                            </Badge>
                          )}
                          {item.color && (
                            <Badge
                              variant="outline"
                              className="text-xs hover:scale-105 transition-transform duration-200 border-gray-300 dark:border-gray-600"
                            >
                              {item.color}
                            </Badge>
                          )}
                        </div>
                      )}
                      <div className="flex items-center space-x-2 mt-1 sm:mt-2">
                        <span className="font-semibold text-gray-800 dark:text-gray-100 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-200 text-sm sm:text-base">
                          ${item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 hover:scale-110 transition-all duration-200 group"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform duration-200" />
                      </Button>

                      <div className="flex items-center space-x-1 sm:space-x-2 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm border border-gray-200 dark:border-gray-600">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 sm:w-8 sm:h-8 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:scale-110 transition-all duration-200"
                        >
                          <Minus className="w-2 h-2 sm:w-3 sm:h-3" />
                        </Button>
                        <span className="w-6 sm:w-8 text-center font-medium text-gray-800 dark:text-gray-100 text-sm">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 sm:w-8 sm:h-8 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:scale-110 transition-all duration-200"
                        >
                          <Plus className="w-2 h-2 sm:w-3 sm:h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Clear Cart Button */}
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="w-full text-red-600 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 bg-transparent hover:scale-105 transition-all duration-300 group text-sm"
                >
                  <Trash2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  Clear Cart
                </Button>
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 sm:p-6 space-y-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
              <div className="flex items-center justify-between text-base sm:text-lg font-semibold">
                <span className="text-gray-800 dark:text-gray-100">Total:</span>
                <span className="text-pink-600 dark:text-pink-400 text-lg sm:text-xl animate-pulse">
                  ${state.totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="space-y-2">
                <Button
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                  size="lg"
                >
                  Checkout
                </Button>
                <Button
                  variant="outline"
                  onClick={closeCart}
                  className="w-full border-pink-200 dark:border-pink-600 text-pink-700 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 bg-transparent hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                >
                  Continue Shopping
                </Button>
              </div>

              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
                  <Heart className="w-3 h-3 mr-1 text-pink-500" />
                  Free shipping on orders over $75
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
