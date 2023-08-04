import { useEffect, useState } from "react";
import { Link } from "wouter";
import Loading from "./Loading";

function Products({ shouldReload }: { shouldReload: string | undefined }) {
  const [products, setProducts] = useState<string[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.ok === false) return setError(response.message);
        setProducts(response);
      })
      .catch(() => {
        return setError("Couldn't load the products.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [shouldReload]);

  return (
    <>
      <h2 className="text-lg font-bold">Products</h2>
      <div
        data-error={error && products.length === 0 && true}
        className="outline outline-1 outline-neutral-200 text-neutral-900 font-bold p-2 text-xs flex flex-col gap-2 rounded-lg data-[error=true]:bg-rose-500"
      >
        {products.length > 0 ? (
          products.map((name, index) => {
            return <Product name={name} key={index} />;
          })
        ) : isLoading ? (
          <>
            Loading <Loading />
          </>
        ) : error ? (
          <span>{error}</span>
        ) : (
          <span className="">
            No products' has been loaded yet
            <Loading />
          </span>
        )}
      </div>
    </>
  );
}

function Product({ name }: { name: string }) {
  return (
    <Link
      href={`/product/${encodeURIComponent(name)}`}
      className="rounded w-full p-2 hover:bg-indigo-500 bg-neutral-200 hover:mix-blend-difference hover:text-neutral-200 hover:outline outline-black outline-1 duration-200 hover:cursor-pointer text-sm hover:shadow-lg shadow-green-500"
    >
      {name}
    </Link>
  );
}

export default Products;
