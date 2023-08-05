import { useState } from 'react'
import FileUpload from './FileUpload'
import Products from './Products'

function Files(): JSX.Element {
  const [reload, setReload] = useState<string>('')
  const shouldReloadProducts = (): void => {
    setReload((+new Date()).toString(36))
  }

  return (
    <>
      <FileUpload shouldReloadProducts={shouldReloadProducts} />
      <hr className="border-neutral-200" />
      <Products shouldReload={reload} />
    </>
  )
}

export default Files
