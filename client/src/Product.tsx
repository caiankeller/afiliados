import { useEffect, useRef, useState } from 'react'
import { Link } from 'wouter'
import Loading from './Loading'

interface ITypeReference {
  type: string
  description: string
}

interface ITransaction {
  type: string
  date: string
  priceTag: number
  typeReference: ITypeReference
}

interface ISeller {
  name: string
  total: number
  transactions: ITransaction[]
}

interface TProduct {
  name: string
  sellers: ISeller[]
}

function Product({ params }: { params: { name: string } }): JSX.Element {
  const name = decodeURI(params.name)
  const [product, setProduct] = useState<TProduct | undefined>()
  const [totalSales, setTotalSales] = useState<number>(0)
  const [error, setError] = useState<string | undefined>()

  const [isLoading, setIsLoading] = useState(true)

  const isFirstRender = useRef(true) // little trick to prevent useeffect from running twice

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (typeof product === 'undefined') return

    let sales = 0
    for (const seller of product.sellers) {
      sales += seller.total
    }
    setTotalSales(sales)
  }, [product])

  const parseDate = (dateString: string): string => {
    // parsing the strange date to a readable one
    const options: Intl.DateTimeFormatOptions = {
      dayPeriod: 'short',
      day: 'numeric',
      weekday: 'short'
    }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/product/${name}`, {
      method: 'GET'
    })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response.ok === false) return setError(response.message)
        setError(response.message)
        setProduct(response)
      })
      .catch(() => {
        return setError("Couldn't connect to the server, please try again later.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [params])

  return (
    <>
      <div className="bg-neutral-200 p-2 rounded">
        <div className="flex flex-col justify-between gap-2">
          <div className="flex justify-between">
            <span className="text-neutral-900 font-bold">{name}</span>
            <div className="text-neutral-900 text-sm flex items-center flex-wrap justify-end gap-1">
              total by product{' '}
              <span className="p-0 px-2 bg-green-500 rounded font-bold flex-grow-0">
                {(totalSales / 100).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 text-right text-sm">
            <Link
              href="/"
              className="px-4 py-1 bg-rose-500 rounded flex gap-2 items-center text-xs uppercase text-neutral-900 hover:outline outline-1 outline-black hover:duration-200"
            >
              Return home
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="h-32 mt-6 w-full flex justify-center items-center bg-[url(/texture.svg)] rounded">
            Loading product <Loading />
          </div>
        ) : error ? (
          <div className="p-2 bg-rose-500 mt-2 rounded text-neutral-900 text-sm">
            <span className="">{error}</span>
          </div>
        ) : (
          product && (
            <div className="mt-4">
              <h4 className="text-neutral-900 text-sm font-bold uppercase">
                Affiliates ({product.sellers.length})
              </h4>
              <hr className="border-black"></hr>
              <div className="flex gap-1 flex-col">
                {product.sellers.map((seller) => {
                  return (
                    <div
                      key={seller.name}
                      className="p-2 py-3 text-sm bg-[url(/texture.svg)] rounded mt-2"
                    >
                      <div className="flex justify-between items-center gap-1">
                        <h5 className="text-sm">
                          <strong>{seller.name}</strong> ({seller.transactions.length} transactions)
                        </h5>
                        <div className="text-slate text-sm text-right">
                          total by seller{' '}
                          <span className="p-0 px-2 text-neutral-900 bg-green-500 rounded font-bold">
                            {(seller.total / 100).toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="bg-neutral-200 p-2 gap-1 rounded text-neutral-900 mt-3">
                        {seller.transactions.map((transaction, index) => {
                          return (
                            <div key={index} className="flex justify-between odd:bg-stone-300">
                              <div className="w-1/6 font-bold">
                                {(transaction.priceTag / 100).toLocaleString('pt-BR', {
                                  style: 'currency',
                                  currency: 'BRL'
                                })}
                              </div>
                              <div className="ml-auto mx-2 font-bold">
                                {transaction.typeReference.description}
                              </div>
                              <div className="w-1/3 text-right hidden md:block">
                                {parseDate(transaction.date)}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        )}
      </div>
    </>
  )
}

export default Product
