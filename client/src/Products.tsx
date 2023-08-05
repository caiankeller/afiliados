import { useEffect, useState } from 'react'
import { Link } from 'wouter'
import Loading from './Loading'

function Products({ shouldReload }: { shouldReload: string }): JSX.Element {
  const [products, setProducts] = useState<string[]>([])
  const [error, setError] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products`, {
      method: 'GET'
    })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response.ok === false) return setError(response.message)
        setProducts(response)
      })
      .catch(() => {
        return setError("Couldn't load products.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [shouldReload])

  return (
    <>
      <h2 className="font-bold uppercase">Products</h2>
      <div
        data-error={error && products.length === 0 && true}
        data-empty={!error && products.length === 0}
        className="outline outline-1 outline-neutral-200 text-neutral-900 font-bold p-2 flex flex-col gap-2 rounded data-[error=true]:bg-rose-500 data-[empty=true]:bg-neutral-200"
      >
        {products.length > 0 ? (
          products.map((name, index) => {
            return <Product name={name} key={index} />
          })
        ) : isLoading ? (
          <span className="text-sm">
            Loading <Loading />
          </span>
        ) : error ? (
          <span className="font-bold uppercase text-sm">{error}</span>
        ) : (
          <span className="text-sm">
            No products has been loaded yet
            <Loading />
          </span>
        )}
      </div>
    </>
  )
}

function Product({ name }: { name: string }): JSX.Element {
  return (
    <Link
      href={`/product/${encodeURIComponent(name)}`}
      className="rounded w-full p-2 bg-neutral-200 hover:invert hover:outline outline-1 hover:outline-black hover:mix-blend-difference duration-200 hover:cursor-pointer text-sm shadow-green-500 hover:text-black px-3"
    >
      {name}
    </Link>
  )
}

export default Products
