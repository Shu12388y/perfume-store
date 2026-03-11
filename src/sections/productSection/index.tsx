'use client'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '@/store'
import ProductCard from '@/components/productCard/productCard'
import { get_products } from '@/services/product.services'

interface Variant {
  variant: {
    price: string
  }
}

interface Product {
  id: string
  key: string
  name: string
  images: []
  variants: Variant[]
  category: string
}

function ProductCardSection() {
  const { data, error, loading } = useSelector((state: RootState) => state.product)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(get_products()).unwrap()
  }, [])

  if (error) {
    return <>Something went Wrong</>
  }

  if (loading) {
    return <> Loading...</>
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-20 md:py-28">
      <h2
        className="font-display text-4xl md:text-5xl text-foreground"
        style={{ letterSpacing: '-0.03em' }}
      >
        Our Products
      </h2>
      <div className="grid grid-cols-4 items-center justify-center gap-10 mt-5">
        {data?.slice(0, 5)?.map((product: Product, index: number) => {
          return (
            <ProductCard
              id={product?.id}
              key={product?.id}
              name={product?.name}
              image={product?.images}
              price={product?.variants[0]?.variant?.price}
              category={product?.category}
              index={index}
            />
          )
        })}
      </div>
    </section>
  )
}

export default ProductCardSection
