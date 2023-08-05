import { Route } from 'wouter'
import Home from './Home'
import Product from './Product'

function App(): JSX.Element {
  return (
    <div className="bg-[url(/texture.svg)] min-h-[100dvh] flex justify-center items-center antialiased">
      <div
        className="max-w-[1000px] w-full h-[90dvh] flex flex-col p-2 overflow-y-scroll gap-2 text-neutral-200 relative"
        style={{
          // i am ashamed of doing that
          overflowY: 'scroll',
          scrollbarWidth: 'thin',
          scrollbarColor: '#c7c7c7 transparent'
        }}
      >
        <div className="text-xl uppercase">Afiliados</div>
        <Route path="/" component={Home} />
        <Route path="/product/:name" component={Product} />
        <div className="text-sm mt-auto">This is a challenge by Coodesh</div>
      </div>
    </div>
  )
}

export default App
