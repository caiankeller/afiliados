import { useEffect, useState } from 'react'
import { Danger, Notification as NotificationIconly } from 'react-iconly'

export type TType = 'error' | 'success'

function Notification({ message, type }: { message?: string; type?: TType }): JSX.Element {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 10 * 1000) // 10 times 1000 milliseconds, so, 10 seconds

    return (): void => clearTimeout(timer)
  }, [isVisible])

  return (
    <div
      data-visible={isVisible}
      className={`${
        type === 'error'
          ? 'bg-rose-500 underline underline-offset-2 shadow-rose-500'
          : 'bg-green-500 text-neutral-900 shadow-green-500'
      } rounded w-[calc(100%_-_1rem)] p-2 shadow-sm data-[visible=true]:bottom-0 text-sm text-justify duration-500 absolute -bottom-10 max-w-[1000px] mx-auto flex font-bold items-center gap-1`}
    >
      {type === 'error' ? (
        <Danger set="bold" size="small" />
      ) : (
        <NotificationIconly set="bold" size="small" />
      )}
      {message}
    </div>
  )
}

export default Notification
