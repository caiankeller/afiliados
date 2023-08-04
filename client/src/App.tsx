import { Route } from "wouter";
import Home from "./Home";
import Product from "./Product";

import "./index.css";

function App() {
  return (
    <div className="bg-[url(/texture.svg)] bg-repeat min-h-[100dvh] flex justify-center items-center antialiased overflow-x-clip uppercase">
      <div className="max-w-[1000px] w-full h-full flex flex-col p-2 gap-2 text-slate-200">
        <div className="text-2xl tracking-wide select-none ">Afiliados</div>
        <Route path="/" component={Home} />
        <Route path="/product/:name" component={Product} />
        <div className="text-sm mt-auto">This is a challenge by Coodesh</div>
      </div>
    </div>
  );
}

export default App;
