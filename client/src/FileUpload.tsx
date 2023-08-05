import { useRef, useState } from 'react'
import { Scan, Send } from 'react-iconly'
import Notification, { TType } from './Notification'

function FileUpload({ shouldReloadProducts }: { shouldReloadProducts: () => void }): JSX.Element {
  const inputFileType = import.meta.env.VITE_INPUT_FILE_TYPE // file type to be accepting, you can change it in the .env
  const url = 'http://localhost:1707'

  const file = useRef<HTMLInputElement>(null)
  const [filename, setFilename] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState<{
    message: string
    type: TType
  } | null>(null)

  const sendFile = (): void => {
    if (!file.current?.files || file.current.files.length === 0)
      return setNotification({
        message: 'Please, select a file',
        type: 'error'
      })

    setIsLoading(true)

    const selectedFile = file.current.files[0]

    const formData = new FormData()
    formData.append('file', selectedFile)

    fetch(`${url}/upload`, {
      method: 'POST',
      body: formData
    })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response.ok === false)
          return setNotification({
            message: response.message,
            type: 'error'
          })
        return setNotification({
          message: `Upload successful, ${response.successfulInserts} passed, ${response.duplicated} duplicated (rejected).`,
          type: 'success'
        })
      })
      .catch(() => {
        return setNotification({
          message: 'Error while uploading, please try again later.',
          type: 'error'
        })
      })
      .finally(() => {
        setFilename('')
        setIsLoading(false)
        shouldReloadProducts()
        file.current && (file.current.value = '') // reset the form input value to clear the selection
      })
  }

  const fileChecker = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target?.files) return
    const file = e.target.files[0]
    const { name } = file

    const extension = name.split('.').pop()
    const filename = name.slice(0, name.lastIndexOf('.'))

    if (extension !== inputFileType) {
      return setNotification({
        message: `Please make sure to be uploading a ${inputFileType} file type`,
        type: 'error'
      })
    }

    setFilename(filename)
  }

  return (
    <>
      <div className="flex items-stretch gap-2">
        <label
          htmlFor="file"
          onClick={(): void => setNotification(null)}
          className="select-none text-sm cursor-pointer overflow-hidden md:overflow-visible whitespace-nowrap disabled:bg-gray-200
            overflow-ellipsis hover:invert duration-100 hover:outline outline-1 hover:outline-black bg-neutral-200 text-neutral-900
            hover:mix-blend-difference flex-grow p-1 px-3 md:p-2 rounded font-semibold"
        >
          <input // it is unecessary the use of <form>, i am controlling the submit with javascript,
            id="file" // i see a lot of people getting it wrong, "ah, semantic html blablabla" ok boomer
            type="file" // that's just a joke
            className="hidden"
            ref={file}
            onChange={(e): void => fileChecker(e)}
            accept={`.${inputFileType}`}
            disabled={isLoading}
          />
          {filename ? `${filename}.${inputFileType}` : 'Click and select your file'}
        </label>
        <button
          disabled={isLoading ? true : filename ? false : true}
          className="p-1 px-4 disabled:mix-blend-normal disabled:hover:mix-blend-difference mix-blend-difference bg-green-400 rounded flex gap-2 items-center font-bold text-sm disabled:bg-neutral-200 overflow-clip
          text-neutral-900 hover:invert hover:bg-neutral-200 hover:outline outline-1 outline-black disabled:cursor-not-allowed [&_svg]:hover:duration-300 [&_svg]:disabled:translate-x-0 [&_svg]:disabled:translate-y-[.5] [&_svg]:translate-y-[.5] [&_svg]:hover:ease-out [&_svg]:hover:translate-x-1 [&_svg]:hover:-translate-y-7 [&_svg]:hover:-rotate-45 hover:animate-pulse"
          onClick={sendFile}
        >
          {isLoading ? (
            <>
              Loading <Scan set="bold" size="small" />
            </>
          ) : (
            <>
              Send <Send set="bold" size="small" />
            </>
          )}
        </button>
      </div>
      {notification?.message && (
        <Notification type={notification?.type} message={notification?.message} />
      )}
    </>
  )
}

export default FileUpload
